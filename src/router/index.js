import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

let routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home")
  },
  {
    path: "/details",
    name: "Details",
    component: () => import("../views/Details")
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
