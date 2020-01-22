import Vue from "vue";
import App from "./app/App.vue";
import "./registerServiceWorker";
import router from "./app/app.router";

import "carbon-components/css/carbon-components.css";
import CarbonComponentsVue from "@carbon/vue/src/index";

Vue.use(CarbonComponentsVue);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
