import Vue from "vue";

import App from "./app/App.vue";
import router from "./app/app.router";

import { http } from "./http";
import VueAxios from "vue-axios";

import "carbon-components/css/carbon-components.css";
import CarbonComponentsVue from "@carbon/vue/src/index";

import i18n from "./i18n";

import wb from "./workbox";

Vue.config.productionTip = false;

Vue.use(VueAxios, http);
Vue.use(CarbonComponentsVue);

Vue.prototype.$workbox = wb;

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount("#app");
