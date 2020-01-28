import { Component, Prop, Vue } from "vue-property-decorator";
import { User } from "../../models/User";
import { Address } from "../../models/Address";
import { UserApi } from "../../api/api";

@Component
export default class UserComponent extends Vue {
  editMode: boolean = false;
  throwValidation: boolean = false;

  user: User = { address: {} };

  beforeUpdate() {
    this.paintDatePicker();
    this.loadCountries();
  }

  created() {
    this.editMode = !!this.$route.params.userId;

    this.loadCountries();
  }

  async mounted(): Promise<void> {
    this.paintDatePicker();

    this.editMode &&
      (this.user = await UserApi.getUser(parseInt(this.$route.params.userId)));
  }

  countries = [];

  async actionSave(): Promise<void> {
    this.throwValidation = true;

    if (
      !this.user.firstname ||
      !this.user.lastname ||
      !this.user.email ||
      !this.user.birthDate
    )
      return;

    if (this.editMode) await UserApi.updateUser(this.user);
    else await UserApi.createUser(this.user);

    this.$router.push({ name: "home" });
  }

  actionChange() {}

  private loadCountries(): void {
    this.countries = [
      {
        value: Address.CountryEnum.ES,
        name: this.$i18n.t("info.country.spain"),
        label: this.$i18n.t("info.country.spain")
      },
      {
        value: Address.CountryEnum.UK,
        name: this.$i18n.t("info.country.unitedkingdom"),
        label: this.$i18n.t("info.country.unitedkingdom")
      },
      {
        value: Address.CountryEnum.DE,
        name: this.$i18n.t("info.country.germany"),
        label: this.$i18n.t("info.country.germany")
      },
      {
        value: Address.CountryEnum.US,
        name: this.$i18n.t("info.country.unitedstates"),
        label: this.$i18n.t("info.country.unitedstates")
      },
      {
        value: Address.CountryEnum.PE,
        name: this.$i18n.t("info.country.peru"),
        label: this.$i18n.t("info.country.peru")
      }
    ];
  }

  /* istanbul ignore next */
  private paintDatePicker(): void {
    let months: Array<any> = [
      this.$i18n.t("datepicker.month.january"),
      this.$i18n.t("datepicker.month.february"),
      this.$i18n.t("datepicker.month.march"),
      this.$i18n.t("datepicker.month.april"),
      this.$i18n.t("datepicker.month.may"),
      this.$i18n.t("datepicker.month.june"),
      this.$i18n.t("datepicker.month.july"),
      this.$i18n.t("datepicker.month.august"),
      this.$i18n.t("datepicker.month.september"),
      this.$i18n.t("datepicker.month.october"),
      this.$i18n.t("datepicker.month.november"),
      this.$i18n.t("datepicker.month.december")
    ];

    document
      .querySelectorAll(".flatpickr-monthDropdown-months > option")
      .forEach((month, index) => {
        month.textContent = months[index];
      });

    let weekdays: Array<any> = [
      this.$i18n.t("datepicker.weekday.sunday"),
      this.$i18n.t("datepicker.weekday.monday"),
      this.$i18n.t("datepicker.weekday.tuesday"),
      this.$i18n.t("datepicker.weekday.wednesday"),
      this.$i18n.t("datepicker.weekday.thursday"),
      this.$i18n.t("datepicker.weekday.friday"),
      this.$i18n.t("datepicker.weekday.saturday")
    ];

    document
      .querySelectorAll(".flatpickr-weekdaycontainer > span")
      .forEach((weekday, index) => {
        weekday.textContent = weekdays[index];
      });
  }
}
