import Vue from "vue";
import Router from "vue-router";
// import WaitPayResult from "@/views/waitPayResult";
// import PayAmount from "@/views/payAmount";
import NotFount from "@/views/error/404";
import Pay from "@/views/pay";
Vue.use(Router);
export default new Router({
  mode: "history",
  // base: process.env.NODE_ENV === "production" ? process.env.VUE_APP_SRC : "/",
  base: "./",
  routes: [
    {
      path: "/",
      name: "Pay",
      component: Pay,
      props: (route) => ({
        query: [route.query.merId, route.query.termId],
      }),
    },
    // {
    //   path: "/payAmount",
    //   name: "PayAmount",
    //   component: PayAmount,
    //   props: (route) => ({
    //     query: [route.query.merId, route.query.termId],
    //   }),
    // },
    // {
    //   path: "/waitPayResult",
    //   name: "WaitPayResult",
    //   component: WaitPayResult,
    //   props: (route) => ({
    //     query: [route.query.merId, route.query.termId, route.query.orderId],
    //   }),
    // },
    {
      path: "*",
      name: "404",
      component: NotFount,
    },
  ],
});
