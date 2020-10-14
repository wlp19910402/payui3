<template>
  <main class="view" role="main">
    <div class="qm-model-center">
      <div
        :class="'qm-pay-result ' + resultList.icon"
        :style="{ borderColor: resultList.color }"
        v-if="requestResultStatus !== PAY_RESULT_STATUS.PAY_WAIT"
      ></div>
      <div
        v-if="requestResultStatus === PAY_RESULT_STATUS.PAY_WAIT"
        class="qm-wait-loading-box my-3"
      >
        <div class="qm-wait-minutes"></div>
        <div class="qm-wait-seconds"></div>
      </div>
      <p class="qm-pay-result-title">
        {{ resultList.title }}
      </p>
      <p class="qm-pay-result-sub-title">{{ resultList.msg }}</p>
    </div>
  </main>
</template>

<script>
import { Button, ResultPage, Icon } from "mand-mobile";
import axios from "axios";
const PAY_RESULT_STATUS = {
  PAY_WAIT: "2",
  PAY_SUCCESS: "1",
  PAY_FAIL: "0",
  PAY_RESULT_ERROR: "3",
};
export default {
  name: "WaitPayResult",
  data: () => ({
    requestResultStatus: PAY_RESULT_STATUS.PAY_WAIT,
    PAY_RESULT_STATUS,
    msg: "",
  }),
  components: {
    [Button.name]: Button,
    [ResultPage.name]: ResultPage,
    [Icon.name]: Icon,
  },
  computed: {
    resultList() {
      return this.requestResultStatus === PAY_RESULT_STATUS.PAY_SUCCESS
        ? {
            title: "支付成功",
            msg: "订单支付成功",
            color: "green",
            icon: "qm-succuss-result",
          }
        : this.requestResultStatus === PAY_RESULT_STATUS.PAY_FAIL
        ? {
            title: "支付失败",
            msg: "订单支付失败",
            color: "#b50029",
            icon: "qm-err-result",
          }
        : this.requestResultStatus === PAY_RESULT_STATUS.PAY_WAIT
        ? {
            title: "等待支付结果",
            msg: "正在查询支付结果",
          }
        : {
            title: "获取支付结果失败",
            msg: "获取支付结果失败，请稍后从订单详情中查看",
            color: "#b50029",
            icon: "qm-err-result",
          };
    },
  },
  created() {
    this.fetchRequestPayResult();
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {}, 4000);
    });
  },
  methods: {
    //提交支付金额备注等信息去支付页面
    async fetchRequestPayResult() {
      // let appSrc =
      //   process.env.NODE_ENV === "production" ? process.env.VUE_APP_SRC : "/";
      axios
        .post("tran/paymentquery", {
          merId: this.$route.query.merId,
          termId: this.$route.query.termId,
          oldLocalOrderNo: this.$route.query.oldLocalOrderNo,
          qrCode: this.$route.query.qrCode || null,
        })
        .then((res) => {
          //关闭loading
          this.isloadingShow = false;
          let responseResult = res.data;
          if (responseResult.code === "000000") {
            this.requestResultStatus = PAY_RESULT_STATUS.PAY_SUCCESS;
            this.msg = this.resultList.msg;
          } else {
            this.requestResultStatus = PAY_RESULT_STATUS.PAY_FAIL;
            this.msg = responseResult.msg || this.resultList.msg;
          }
        })
        .catch((err) => {
          //关闭loading
          this.requestResultStatus = PAY_RESULT_STATUS.PAY_RESULT_ERROR;
          this.isloadingShow = false;
          this.msg = this.resultList.msg;
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
body {
  background: #ffffff;
}
.qm-model-center {
  width: 100%;
  position: absolute;
  left: 0;
  top: 20%;
  text-align: center;
  width: 100%;
}
.qm-pay-result {
  margin: 0 auto;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 50%;
  border: 0.14rem solid #ee8f51;
  position: relative;
}
.qm-pay-result .md-icon {
  font-size: 1.2rem !important;
  line-height: 1.6rem;
  text-align: center;
  color: #ee8f51;
}
.qm-err-result {
  transform: rotate(-45deg);
}
.qm-err-result::before {
  content: "";
  width: 0.14rem;
  height: 1rem;
  position: absolute;
  border-radius: 0.3rem;
  /* top: 0.3rem; */
  margin-left: -0.57rem;
  margin-top: 0.8rem;
  background: #b50029;
  transform: rotate(-90deg);
  transform-origin: top center;
}
.qm-err-result::after {
  content: "";
  width: 0.14rem;
  height: 1rem;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 0.3rem;
  background: #b50029;
  transform-origin: center center;
}
.qm-succuss-result::before {
  content: "";
  width: 0.14rem;
  height: 0.6rem;
  position: absolute;
  border-radius: 0.3rem;
  /* top: 0.3rem; */
  margin-left: -0.57rem;
  margin-top: 0.8rem;
  background: green;
  transform: rotate(-45deg);
  transform-origin: top center;
}
.qm-succuss-result::after {
  content: "";
  width: 0.14rem;
  height: 1rem;
  position: absolute;
  left: 0.58rem;
  margin-top: 0.24rem;
  transform: rotate(45deg);
  border-radius: 0.3rem;
  background: green;
  transform-origin: bottom center;
}
.qm-wait-loading-box {
  margin: 0 auto;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 50%;
  border: 0.14rem solid #ee8f51;
  position: relative;
}
.qm-wait-loading-box::before {
  content: "";
  width: 0.14rem;
  height: 0.14rem;
  position: absolute;
  border-radius: 50%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #ee8f51;
}
.qm-wait-loading-box .qm-wait-minutes {
  position: absolute;
  left: 50%;
  margin-left: -0.08rem;
  width: 0.14rem;
  height: 0.6rem;
  top: 50%;
  margin-top: -0.6rem;
  background: #ee8f51;
  border-radius: 0.1rem;
  animation: rotateAni 30s infinite linear;
  transform-origin: center bottom;
}
.qm-wait-loading-box .qm-wait-seconds {
  position: absolute;
  left: 50%;
  margin-left: -0.08rem;
  width: 0.14rem;
  height: 0.7rem;
  top: 50%;
  margin-top: -0.7rem;
  background: #ee8f51;
  border-radius: 0.1rem;
  animation: rotateAni 2s infinite linear;
  transform-origin: center bottom;
}

@keyframes rotateAni {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.qm-pay-result-title {
  font-size: 0.4rem;
  margin-top: 0.4rem;
  color: #333333;
  padding: 0 0.2rem;
}
.qm-pay-result-sub-title {
  font-size: 0.3rem;
  margin-top: 0.1rem;
  color: #999999;
  padding: 0 0.2rem;
}
</style>
