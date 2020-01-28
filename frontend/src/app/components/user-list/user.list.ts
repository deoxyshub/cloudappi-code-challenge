import { Component, Vue, Watch } from "vue-property-decorator";
import { User } from "../../models/User";
import { UserApi } from "../../api/api";

@Component
export default class UserListComponent extends Vue {
  users: User[] = [];

  async mounted(): Promise<void> {
    this.users = await UserApi.getAllUsers();
    this.fillDataTable();
  }

  internalData: Array<Array<string>> = [["", "", "", "", ""]];
  filterValue: string = "";
  rowSelects: Array<any> = [];

  get filteredData() {
    if (this.filterValue) {
      const regex = new RegExp(this.filterValue, "i");
      return this.internalData.filter(
        item => item.join("|").search(regex) >= 0
      );
    } else {
      return this.internalData;
    }
  }

  onFilter(value: string) {
    this.filterValue = value;
  }

  onSort(sortBy: any) {
    let data: string[][] = JSON.parse(JSON.stringify(this.internalData));

    data.sort((a, b) => {
      let itemA = a[sortBy.index];
      let itemB = b[sortBy.index];

      if (sortBy.order === "descending") return itemB.localeCompare(itemA);

      if (sortBy.order === "ascending") return itemA.localeCompare(itemB);

      return 0;
    });

    data.forEach((item, index) => {
      this.internalData[index] = item;
    });
  }

  actionRowSelectChange() {}

  actionEdit() {
    let locations = this.rowSelects.map(index => ({
      name: "user",
      params: { userId: this.users[index].id.toString() }
    }));

    this.$router.push(locations.shift());

    locations.forEach(location => {
      let routeData = this.$router.resolve(location);
      window.open(routeData.href, "_blank");
    });
  }

  actionNew() {
    this.$router.push({ name: "user" });
  }

  confirmDeletion() {
    let modal: any = this.$refs.modal;
    modal.show();
  }

  async actionDelete(): Promise<void> {
    let userIds = this.rowSelects.map(index => this.users[index].id);

    await UserApi.removeUsers(userIds);
    this.refillDataTable = true;

    let modal: any = this.$refs.modal;
    modal.hide();
  }

  refillDataTable: boolean = false;

  /* istanbul ignore next */
  async actionHidden(): Promise<void> {
    if (this.refillDataTable) {
      this.users = await UserApi.getAllUsers();
      this.fillDataTable();
      this.refillDataTable = false;
    }
  }

  private fillDataTable(): void {
    this.internalData = this.users.map(user => [
      user.firstname,
      user.lastname,
      user.email,
      user.birthDate,
      [
        user.address.street,
        user.address.city,
        user.address.country,
        user.address.postalcode
      ]
        .filter(item => !!item)
        .join(", ")
    ]);
  }

  /* istanbul ignore next */
  private addColumnData(): void {

    // let columns = wrapper.findAll(".bx--data-table th").wrappers;
    // expect(columns[1].text()).toEqual(options.i18n.t("info.user.firstname"));
    // expect(columns[2].text()).toEqual(options.i18n.t("info.user.lastname"));
    // expect(columns[3].text()).toEqual(options.i18n.t("info.user.email"));
    // expect(columns[4].text()).toEqual(options.i18n.t("info.user.birthdate"));
    // expect(columns[5].text()).toEqual(options.i18n.t("info.user.address"));

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
  }
}
