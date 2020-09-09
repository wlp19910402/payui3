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
          left
        ></md-input-item>
        <div v-if="item.type === 'select'">
          <qm-selector :selectorData="item"></qm-selector>
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
      <md-popup v-model="isPopupShow.center">
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
      isPopupShow: {},
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
    await axios.get("/static/formNote.json").then((res) => {
      console.log(res.data);
      let result = res.data;
      if (result.status === "0") {
        this.formData = result.formList;
      } else {
        console.log("获取数据失败", result.msg);
      }
    });
  },
  computed: {
    size() {
      return this.moneyVal.length > 9 ? "small" : "large";
    },
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
    showBasicDialog() {
      this.basicDialog.open = true;
    },
    confirmMoney(name, value) {
      console.log(name, value);
    },
    moneyFormate(name, value) {
      let money = value;
      if (value === ".") {
        money = "0.";
      }
      money = parseFloat(money).toString();
      let arrTmp = money.split(".");
      if (arrTmp.length === 2) {
        if (arrTmp[1].length > 2) {
          arrTmp[1] = arrTmp[1].slice(0, 2);
          money = arrTmp[0] + "." + arrTmp[1];
        }
      }
      this.$nextTick(() => {
        this.moneyVal = money;
        if (parseFloat(this.moneyVal) > 0&& parseFloat(this.moneyVal)<1000000000) {
          this.actionBarData[0].disabled = false;
        } else {
          this.actionBarData[0].disabled = true;
        }
      });
    },
    showPopUp(type) {
      this.$set(this.isPopupShow, type, true);
    },
    hidePopUp(type) {
      this.$set(this.isPopupShow, type, false);
    },
    onBasicConfirm() {
      this.showPopUp("center");
      axios
        .post("/scenefront/tran/paymentquery", {
          merId: this.$route.query.merId,
          termId: this.$route.query.termId,
          tranAmt: this.moneyVal,
        })
        .then((res) => {
          this.hidePopUp("center");
          let responseResult = res.data;
          if (responseResult.code === "success") {
            Toast.info("请求成功，正在跳转支付页面");
            setTimeout(() => {
              window.location.replace(responseResult.qrCode);
            }, 1000);
          } else {
            Toast.info("请求失败，请重试");
          }
        })
        .catch((err) => {
          Toast.info("请求支付失败");
          console.log(err);
        });
      this.basicDialog.open = false;
    },
    onBasicCancel() {
      this.basicDialog.open = false;
    },
  },
};
</script>

<style lang="stylus">
body {
  background: #f8f8f8;
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
  margin: 0.2rem auto;
  width: 2.4rem;
  height: auto;
  display: block;
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
