<template>
  <div id="app">
    <div
      class="md-example-child md-example-child-notice-bar md-example-child-notice-bar-6"
    >
      <md-notice-bar mode="closable" icon="volumn" scrollable>
        为了确保您的资金安全，请设置支付密码为了确保您的资金安全，请设置支付密码为了确保您的资金安全，请设置支付密码
      </md-notice-bar>
    </div>
    <img class="qm-logo" :src="logo2" />
    <div class="md-example-child md-example-child-input-item-3 section">
      <md-field title="支付金额(元)">
        <md-input-item
          class="qm-input-large-text"
          type="money"
          v-model="value"
          placeholder="0.00"
          size="large"
          is-amount
          align="center"
          @change="moneyFormate"
          is-virtual-keyboard
          precision="2"
        >
        </md-input-item>
        <span class="qm-text-size-primary">支付金额不能超过10万</span>
      </md-field>
    </div>
    <md-field class="section" title="备注">
      <md-input-item
        title="备注一："
        placeholder="请输入备注一"
      ></md-input-item>
      <md-input-item
        title="备注二："
        placeholder="请输入备注二"
      ></md-input-item>
      <md-input-item
        title="备注三："
        placeholder="请输入备注三"
      ></md-input-item>
    </md-field>
    <md-action-bar :actions="actionBarData"> </md-action-bar>

    <md-dialog
      title="确认金额"
      :closable="true"
      v-model="basicDialog.open"
      :btns="basicDialog.btns"
    >
      确定提交支付￥{{ value }}元吗，点击确认则跳转第三方支付系统
    </md-dialog>
    <div
      class="md-example-child md-example-child-popup md-example-child-popup-0"
    >
      <!-- <md-button @click="showPopUp('center')">屏幕中弹出</md-button> -->

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
  Button,
  Field,
  InputItem,
  CheckBox,
  Agree,
  ActionBar,
  Tag,
  Icon,
  NoticeBar,
  ActivityIndicator,
  Popup,
  PopupTitleBar,
} from "mand-mobile";
import logo1 from "@/assets/images/logo.png";
import logo2 from "@/assets/images/logo-vertial.png";
import logo3 from "@/assets/images/logoIcon.png";
export default {
  name: "app",
  data() {
    return {
      type: "month",
      value: 0,
      isAgree: false,
      open: false,
      logo1,
      isPopupShow: {},
      logo2,
      logo3,
      actionBarData: [
        {
          text: "确认支付",
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
      agreeConf: {
        checked: true,
        name: "agree0",
        size: "md",
        disabled: false,
        introduction: "选中状态",
      },
    };
  },
  computed: {
    size() {
      return this.value.length > 10 ? "small" : "large";
    },
  },
  components: {
    [Button.name]: Button,
    [FieldItem.name]: FieldItem,
    [Field.name]: Field,
    [InputItem.name]: InputItem,
    [CheckBox.name]: CheckBox,
    [ActionBar.name]: ActionBar,
    [Tag.name]: Tag,
    [Agree.name]: Agree,
    [Icon.name]: Icon,
    [NoticeBar.name]: NoticeBar,
    [ActivityIndicator.name]: ActivityIndicator,
    [Popup.name]: Popup,
    [PopupTitleBar.name]: PopupTitleBar,
    [Dialog.name]: Dialog,
  },
  methods: {
    showBasicDialog() {
      this.basicDialog.open = true;
    },
    moneyFormate(name, value) {
      this.value = value;
      console.log(name, value);
    },
    showPopUp(type) {
      this.$set(this.isPopupShow, type, true);
    },
    onBasicConfirm() {
      this.showPopUp("center");
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

.qm-text-size-primary {
  font-size: 0.16rem;
  color: #999999;
  text-align: left;
  display: block;
  flex-direction: column;
  padding: 0 0.32rem;
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
        font-size: 0.2rem !important;
      }
    }
  }
}

.md-popup-mask {
  background-color: transparent !important;
}
</style>
