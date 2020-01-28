import { createLocalVue } from "@vue/test-utils";
import VueI18n, { LocaleMessages } from "vue-i18n";

let localVue = createLocalVue();
localVue.use(VueI18n);

function loadLocaleMessages(): LocaleMessages {
  const locales = require.context(
    "../src/locales",
    true,
    /[A-Za-z0-9-_,\s]+\.json$/i
  );

  const messages: LocaleMessages = {};
  locales.keys().forEach((key: string) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    const locale = matched[1];
    messages[locale] = locales(key);
  });
  return messages;
}

import CarbonComponentsVue from "@carbon/vue/src";

localVue.use(CarbonComponentsVue);

import VueRouter from "vue-router";
import { routes } from "@/app/app.routes";

localVue.use(VueRouter);

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
});

export default {
  i18n: new VueI18n({
    locale: process.env.VUE_APP_I18N_LOCALE,
    fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE,
    messages: loadLocaleMessages()
  }),
  localVue,
  router
};
