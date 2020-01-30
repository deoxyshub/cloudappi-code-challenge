import { Component, Vue } from "vue-property-decorator";

@Component
export default class SWBannerComponent extends Vue {
  prompt: boolean = false;
  $workbox: any;

  created() {
    this.$workbox.addEventListener("waiting", () => {
      this.prompt = true;
    });
  }

  async onAccept() {
    this.prompt = false;
    await this.$workbox.messageSW({ type: "SKIP_WAITING" });
  }
}
