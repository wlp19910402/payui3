<template>
  <main class="" role="main">
    <div class="md-result-page">
      <md-result-page
        type="lost"
        text="404"
        :img-url="notFountImg"
        sub-text="您要访问的页面已丢失"
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
import notFountImg from "@/assets/images/not-found.png";
export default {
  name: "NotFount",
  components: {
    [ResultPage.name]: ResultPage,
    [Button.name]: Button,
  },
  data: () => ({
    notFountImg,
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