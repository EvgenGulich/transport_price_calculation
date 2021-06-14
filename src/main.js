import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import storeIndex from "./store/index";
import "./assets/styles/index.scss";

const axiosInstance = axios.create({
  baseURL: "https://developers.ria.com/auto",
  proxyHeaders: false,
  credentials: false,
});
// Note: Vue automatically prefixes the directive name with 'v-'
Vue.component("Default", storeIndex);
Vue.use(VueAxios, axiosInstance);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
