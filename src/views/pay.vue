<template>
  <div id="app">
    <img class="qm-logo" :src="logo" />
      <md-field >
        <md-input-item
          ref="input10"
          v-model="moneyVal"
          :class="'qm-input-large-text'"
          type="money"
          readonly
          :size="size"
          is-formative
          align="center"
          precision="2"
          clearable
          brief="应付金额(元)"
        >
        </md-input-item>
      <md-detail-item title="【缴费商户】" content="北京东城区财政局"  />
      <md-detail-item title="【账单金额】" content="600.00元" />
      <md-detail-item title="【滞纳金】" content="86.00元" />
      <md-detail-item title="【缴费项目】" content="日常缴费" />
      <md-detail-item title="【通知书号码】" content="202011102389789" />
      <md-detail-item title="【执收单位编号】" content="BJYADATXWL" />
      <md-detail-item title="【客户姓名】" content="*北平" />
      <md-detail-item solid title="【附言】" content="" >
        <div style="text-align:right">账单金额/滞纳金/手续费仅供参考 支付金额以应付金额为准</div>
      </md-detail-item>
        <div class="footer-slot" slot="footer">温馨提示:账单金额/滞纳金/手续费仅供参考,支付金额以应付金额为准。</div>
    </md-field>
    <md-action-bar class="qm-action-bar-bg" :actions="actionBarData">
    </md-action-bar>
    <md-dialog
      title="确认金额"
      :closable="true"
      v-model="basicDialog.open"
      :btns="basicDialog.btns"
    >
      确定提交支付￥{{ moneyVal }}元吗，点击确认则跳转第三方支付系统
    </md-dialog>
    <div class="md-example-child">
      <md-popup :mask-closable="false" v-model="isloadingShow">
        <div class="md-example-popup md-example-popup-center">
          <div
            class="md-example-child md-example-child-md-activity-indicator md-example-child-md-activity-indicator-1"
          >
            <div class="activity-indicator-container">
              <md-activity-indicator
                class="md-activity-indicator-css"
                type="spinner"
                :size="30"
                :text-size="20"
                vertical
                color="light"
                >加载中...</md-activity-indicator
              >
            </div>
          </div>
        </div>
      </md-popup>
    </div>
  </div>
</template>
<script>
import {
  Dialog,
  FieldItem,
  Field,
  InputItem,
  CheckBox,
  ActionBar,
  Tag,
  Icon,
  ActivityIndicator,
  Popup,
  PopupTitleBar,
  Toast,
  DetailItem
} from "mand-mobile";
import "@/assets/styl/payAmount.styl";
import logo from "@/assets/images/logo-vertial.png";
// import QmSelector from "@/components/form/QmSelector";
import axios from "axios";
import formNote from "@/assets/plugins/formNote.json";
export default {
  name: "app",
  data() {
    return {
      moneyVal: "",
      //初始化备注表单的内容
      remarkList: {
        remark1: null,
        remark2: null,
        remark3: null,
      },
      isloadingShow: false,
      logo,
      formData: [],
      actionBarData: [
        {
          text: "缴费",
          onClick: this.showBasicDialog,
        },
      ],
      basicDialog: {
        open: false,
        btns: [
          {
            text: "取消",
            handler: this.onBasicCancel,
          },
          {
            text: "确认",
            handler: this.onBasicConfirm,
          },
        ],
      },
    };
  },
  computed: {
    //当输入的金额数字长度大于9时，将字体大小切换成小的
    size() {
      return this.moneyVal.length > 12 ? "normal" : "large";
    },
  },
  components: {
    [FieldItem.name]: FieldItem,
    [Field.name]: Field,
    [InputItem.name]: InputItem,
    [CheckBox.name]: CheckBox,
    [ActionBar.name]: ActionBar,
    [Tag.name]: Tag,
    [Icon.name]: Icon,
    [ActivityIndicator.name]: ActivityIndicator,
    [Popup.name]: Popup,
    [PopupTitleBar.name]: PopupTitleBar,
    [Dialog.name]: Dialog,
    [DetailItem.name]: DetailItem,
  },
  async created() {
    //获取static中的form表单的数据，备注一，备注二，备注三
    // await axios
    //   .get("/static/formNote.json")
    //   .then((res) => {
    //     let result = res.data;
    //     if (result.status === "0") {

    //     } else {
    //       console.log("获取数据失败", result.msg);
    //     }
    //   })
    //   .catch((err) => {
    //     //关闭loading
    //     Toast.info("请求表单失败，请重试");
    //     console.log(err);
    //   });
    this.formData = formNote.formList;
    for (let i = 0; i < this.formData.length; i++) {
      //判断url路径是否有备注名字的参数，如果有参数的名字这些值
      let tmpRemark = this.$route.query["remark" + (i + 1)];
      if (tmpRemark) {
        this.formData[i].label = tmpRemark;
        this.formData[i].placeholder = "请输入" + tmpRemark;
      }
    }
    this.formData.forEach((item) => {
      item.name;
    });

    this.moneyVal="888888888.88"
  },
  methods: {
    //显示确认支付的弹出框
    showBasicDialog() {
      this.basicDialog.open = true;
    },
    //确认提交金额去支付页面
    onBasicConfirm() {
      //关闭确认去支付的对话框
      this.onBasicCancel();
      //调用loading
      this.isloadingShow = true;
      //根据填写和设置的值给备注表单进行赋值
      if (this.formData.length > 0) {
        this.formData.forEach((item, index) => {
          let obj = document.getElementsByName(item.name)[0];
          if (item.type === "select") {
            this.remarkList["remark" + (index + 1)] = this.$refs[
              item.name
            ][0].selectorValue;
          } else if (item.type === "input") {
            this.remarkList["remark" + (index + 1)] = obj.value;
          }
        });
      }
      //调用接口
      this.fetchRequestPayAmount();
    },
    //提交支付金额备注等信息去支付页面
    async fetchRequestPayAmount() {
      let appSrc =
        process.env.NODE_ENV === "production" ? process.env.VUE_APP_SRC : "/";
      axios
        .post(appSrc + "tran/applyqrcode", {
          merId: this.$route.query.merId,
          termId: this.$route.query.termId,
          tranAmt: this.moneyVal,
          ...this.remarkList,
        })
        .then((res) => {
          //关闭loading
          this.isloadingShow = false;
          let responseResult = res.data;
          if (responseResult.code === "000000") {
            // Toast.info("请求成功，正在跳转支付页面");
            // Toast.info(responseResult.msg);
            // setTimeout(() => {
            window.location = responseResult.qrCode;
            // }, 1000);
          } else {
            Toast.info(responseResult.msg || "提交支付失败");
          }
        })
        .catch((err) => {
          //关闭loading
          this.isloadingShow = false;
          Toast.info("请求支付失败，请重试");
          console.log(err);
        });
    },
    onBasicCancel() {
      this.basicDialog.open = false;
    },
  },
};
</script>
<style  lang="stylus">
.footer-slot
  padding 16px 0 0
  color #858B9C
  width 100%
  font-size 22px
  line-height 1.5
  border-top solid 1px #E1E4EB
  box-sizing border-box
  text-align left
</style>