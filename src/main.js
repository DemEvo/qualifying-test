import Vue from "vue";
// import store from "@/store";

import { BootstrapVue } from 'bootstrap-vue';
import "@/components/styles/bootstrap/bootstrap.scss";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(BootstrapVue);


import "@/components/styles/app.scss";

import App from "@/App.vue";

Vue.config.productionTip = false;

new Vue({
  // store,
  render: h => h(App)
}).$mount("#app");
