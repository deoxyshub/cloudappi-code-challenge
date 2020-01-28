import { Component, Vue } from "vue-property-decorator";

@Component
export default class LocalizationComponent extends Vue {
  activeLocale: string = "";

  mounted() {
    this.activeLocale =
      localStorage.getItem("{ accesstoken }-location") || this.$i18n.locale;
    this.$i18n.locale = this.activeLocale;
  }

  setLocale(locale: string) {
    this.activeLocale = locale;
    this.$i18n.locale = locale;
    localStorage.setItem("{ accesstoken }-location", locale);
  }
}
