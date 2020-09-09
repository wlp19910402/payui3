<template>
  <div id="app">
    <div
      class="md-example-child md-example-child-notice-bar md-example-child-notice-bar-6"
    >
      <md-notice-bar mode="closable" icon="volumn" scrollable>
        为了确保您的资金安全，请设置支付密码为了确保您的资金安全，请设置支付密码为了确保您的资金安全，请设置支付密码
      </md-notice-bar>
    </div>
    <img class="qm-logo" :src="logo" />
    <div class="md-example-child md-example-child-input-item-3 section">
      <md-field title="支付金额(元)">
        <md-input-item
          ref="input10"
          v-model="moneyVal"
          :class="'qm-input-large-text'"
          type="money"
          placeholder="0.00"
          :size="size"
          :is-amount="true"
          maxlength="12"
          is-formative
          align="center"
          @change="moneyFormate"
          @confirm="confirmMoney"
          is-virtual-keyboard
          precision="2"
          clearable
          brief="支付金额长度不能超过12位"
          :error="moneyErrorInfo"
        >
        </md-input-item>
      </md-field>
    </div>
    <md-field class="section" title="必填" v-if="formData.length > 0">
      <div v-for="item in formData" :key="item.id">
        <md-input-item
          v-if="item.type === 'input'"
          :title="item.label"
          :placeholder="item.placeholder"
          :id="item.id"
          :name="item.name"
          :value="item.value"
          left
        ></md-input-item>
        <div v-if="item.type === 'select'">
          <qm-selector :ref="item.name" :selectorData="item"></qm-selector>
        </div>
      </div>
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
  NoticeBar,
  ActivityIndicator,
  Popup,
  PopupTitleBar,
  Toast,
} from "mand-mobile";
import logo from "@/assets/images/logo-vertial.png";
import QmSelector from "@/components/form/QmSelector";
import axios from "axios";
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
          text: "确认支付",
          onClick: this.showBasicDialog,
          disabled: true,
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
  async created() {
    //获取static中的form表单的数据，备注一，备注二，备注三
    await axios.get("/static/formNote.json").then((res) => {
      let result = res.data;
      if (result.status === "0") {
        this.formData = result.formList;
      } else {
        console.log("获取数据失败", result.msg);
      }
    });
  },
  computed: {
    //当输入的金额数字长度大于9时，将字体大小切换成小的
    size() {
      return this.moneyVal.length > 9 ? "small" : "large";
    },
    //当输入金额的值大于10，则提示信息
    moneyErrorInfo() {
      return parseFloat(this.moneyVal) > 1000000000
        ? "支付金额不能超过10亿"
        : "";
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
    [NoticeBar.name]: NoticeBar,
    [ActivityIndicator.name]: ActivityIndicator,
    [Popup.name]: Popup,
    [PopupTitleBar.name]: PopupTitleBar,
    [Dialog.name]: Dialog,
    QmSelector,
  },
  methods: {
    //显示确认支付的弹出框
    showBasicDialog() {
      this.basicDialog.open = true;
    },
    confirmMoney(name, value) {
      console.log(name, value);
    },
    //输入金额的格式进行转换成标准的格式化。xxxxxxx.xx 小数点只支持到2位
    moneyFormate(name, value) {
      let money = value;
      //如果只输入了.,就默认指向0.
      if (value === ".") {
        money = "0.";
      }
      //控制金额小数点为两位
      let arrTmp = money.split(".");
      if (arrTmp.length === 2) {
        if (arrTmp[1].length > 2) {
          arrTmp[1] = arrTmp[1].slice(0, 2);
          money = arrTmp[0] + "." + arrTmp[1];
        }
      } else {
        //控制金额 000889格式，转换成标准的889
        money = parseFloat(money).toString();
      }
      //当dom变化后进行重新给金额赋值，反正没定义上
      this.$nextTick(() => {
        this.moneyVal = money;
        if (
          parseFloat(this.moneyVal) > 0 &&
          parseFloat(this.moneyVal) < 1000000000
        ) {
          this.actionBarData[0].disabled = false;
        } else {
          this.actionBarData[0].disabled = true;
        }
      });
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
      axios
        .post("/scenefront/tran/paymentquery", {
          merId: this.$route.query.merId,
          termId: this.$route.query.termId,
          tranAmt: this.moneyVal,
          ...this.remarkList,
        })
        .then((res) => {
          //关闭loading
          this.isloadingShow = false;
          let responseResult = res.data;
          if (responseResult.code === "success") {
            Toast.info("请求成功，正在跳转支付页面");
            // Toast.info(responseResult.msg);
            setTimeout(() => {
              window.location = responseResult.qrCode;
            }, 1000);
          } else {
            Toast.info("请求失败，请重试");
          }
        })
        .catch((err) => {
          //关闭loading
          this.isloadingShow = false;
          Toast.info("请求支付失败");
          console.log(err);
        });
    },
    onBasicCancel() {
      this.basicDialog.open = false;
    },
  },
};
</script>

<style lang="stylus" scope>
body {
  background: #f8f8f8 !important;
}

.qm-action-bar-bg {
  background: #f8f8f8;
}

#app {
  padding-bottom: 0.6rem;
}

.section {
  margin-bottom: 20px;
  background: #fff;
}

.action-bar .md-tag {
  margin-left: 5px;
}

.qm-logo {
  margin: 0.2rem 0;
  width: 2.4rem;
  height: auto;
}

.qm-input-large-text.md-input-item .md-input-item-control .md-input-item-fake {
  font-size: 0.48rem !important;
}

.md-example-child-md-activity-indicator-1 {
  display: flex;
  flex-direction: column;
  align-items: center;

  .md-activity-indicator {
    margin-bottom: 30px;
  }

  .activity-indicator-container {
    margin-bottom: 30px;
    padding: 0.4rem;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 4px;

    .md-activity-indicator-css {
      margin-bottom: 0;

      .md-activity-indicator-svg {
        width: 0.72rem !important;
        height: 0.72rem !important;
      }

      .md-activity-indicator-text {
        font-size: 0.3rem !important;
      }
    }
  }
}

textarea {
  padding-top: 0 !important;
}

.md-field-item.is-solid .md-field-item-title {
  text-align: left;
}
</style>
