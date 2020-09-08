<template>
  <main class="" role="main">
    <div class="md-result-page">
      <md-result-page
        type="lost"
        text="资源错误"
        :img-url="errorImg"
        sub-text="请稍后重试"
      >
      </md-result-page>
      <md-button
        type="default"
        size="small"
        inline
        plain
        @click="$router.go(-1)"
        >返回</md-button
      >
    </div>
  </main>
</template>

<script>
import { Button, ResultPage } from "mand-mobile";
import errorImg from "@/assets/images/resource-error.png";
export default {
  name: "NotFount",
  components: {
    [ResultPage.name]: ResultPage,
    [Button.name]: Button,
  },
  data: () => ({
    errorImg,
  }),
  methods: {
    btnHandler() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="stylus">
body {
  background: #FFF;
}

.md-result-page {
  transform: translate(0, 50%);
}

.md-result-image {
  width: 4rem;
}
</style>