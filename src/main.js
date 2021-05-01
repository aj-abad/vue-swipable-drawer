import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
if (window.innerWidth > 500) {
  window.location.href = "https://google.com";
}
Vue.config.productionTip = false;

console.log(window.innerHeight);
new Vue({
  render: h => h(App),
  router,
  store
}).$mount("#app");
