import { Component, Prop, Vue } from "vue-property-decorator";
import { User } from "../../models/User";
import { UserApi } from "../../api/api";

@Component
export default class UserComponent extends Vue {
  notrailingslash: boolean = true;
  editMode: boolean = false;
  private user: User = { address: {} };

  calOptions: object = {
    dateFormat: "Y-m-d"
  };
  invalidMessage: string = "";

  async created(): Promise<void> {
    this.editMode = !!this.$route.params.userId;
  }

  async mounted(): Promise<void> {
    this.editMode &&
      (this.user = await UserApi.getUser(parseInt(this.$route.params.userId)));
  }

  countries = [
    { value: "ES", label: "Spain" },
    { value: "UK", label: "United Kingdom" },
    { value: "DE", label: "Germany" },
    { value: "US", label: "United States" },
    { value: "PE", label: "Peru" }
  ];

  async actionSave(): Promise<void> {
    if (this.editMode) await UserApi.updateUser(this.user);
    else await UserApi.createUser(this.user);

    this.$router.push({ name: "home" });
  }

  actionChange() {}
}
