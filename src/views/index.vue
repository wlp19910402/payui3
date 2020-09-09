<template>
  <main class="view" role="main">
    <h5>首页</h5>
    <md-button
      type="default"
      size="small"
      inline
      plain
      @click="$router.push('/payAmount?merId=827276616161&termId=27277882222')"
      >支付金额页面</md-button
    >
    <md-button
      type="default"
      size="small"
      inline
      plain
      @click="
        $router.push(
          '/waitPayResult?merId=827276616161&termId=27277882222&orderId=36278111'
        )
      "
      >等待支付结果</md-button
    >
  </main>
</template>
<script>
import { Button } from "mand-mobile";
export default {
  name: "Home",
  components: {
    [Button.name]: Button,
  },
  mounted() {
    console.log(process.env.baseUrl);
  },
  methods: {
    toPaAmount() {
      window.location =
        "http://localhost:8081/payAmount?merId=827276616161&termId=27277882222";
    },
  },
};
</script>