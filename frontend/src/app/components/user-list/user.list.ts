import { Component, Vue } from "vue-property-decorator";
import { User } from "../../models/User";
import { UserApi } from "../../api/api";

@Component
export default class UserListComponent extends Vue {
  private users: User[] = [];

  async mounted(): Promise<void> {
    this.users = await UserApi.getAllUsers();
    this.fillDataTable();
  }

  rowSelects: Array<any> = [];

  columns: Array<any> = [
    {
      label: "Firstname",
      sortable: true
    },
    {
      label: "Lastname",
      sortable: true
    },
    "Email",
    {
      label: "Birthdate",
      sortable: true
    },
    "Address"
  ];

  data: Array<Array<string>> = [["", "", "", "", ""]];

  showModal: boolean = false;

  onFilter(searchElement: string) {
    let text = searchElement.toLocaleLowerCase().trim();

    if (text) {
      let data = this.users
        .map(user => [
          user.firstname.toLocaleLowerCase(),
          user.lastname.toLocaleLowerCase(),
          user.email.toLocaleLowerCase(),
          user.birthDate.toLocaleLowerCase(),
          `${user.address.street}, ${user.address.city}, ${user.address.country}, ${user.address.postalcode}`.toLocaleLowerCase()
        ])
        .filter((row: Array<string>) => {
          return row.find(cell => cell.indexOf(text) > -1);
        });

      this.data = data;
    } else {
      this.fillDataTable();
    }
  }

  onSort(args: any) {
    args.order === "ascending" &&
      this.data.sort((a, b) => this.sortString(a[args.index], b[args.index]));

    args.order === "descending" &&
      this.data.sort((a, b) => this.sortString(b[args.index], a[args.index]));

    args.order === "none" && this.fillDataTable();
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
    this.showModal = true;
  }

  async actionDelete(): Promise<void> {
    let userIds = this.rowSelects.map(index => this.users[index].id);

    await UserApi.removeUsers(userIds);

    this.users = await UserApi.getAllUsers();
    this.fillDataTable();
    this.showModal = false;
  }

  modalClosed() {
    this.showModal = false;
  }

  private fillDataTable(): void {
    this.data = this.users.map(user => [
      user.firstname,
      user.lastname,
      user.email,
      user.birthDate,
      `${user.address.street}, ${user.address.city}, ${user.address.country}, ${user.address.postalcode}`
    ]);
  }

  private sortString(a: string, b: string): number {
    return a > b ? 1 : a < b ? -1 : 0;
  }
}
