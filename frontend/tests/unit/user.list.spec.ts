import { shallowMount, mount, Wrapper } from "@vue/test-utils";
import UserListComponent from "@/app/components/user-list/user.list";
import options from "../mount-options";
import mockAxios from "jest-mock-axios";
import flushPromises from "flush-promises";

jest.mock("axios");

describe("user.list.vue", () => {
  let wrapper: Wrapper<UserListComponent>;
  let serviceAPI: string = process.env.VUE_APP_ROOT_API;

  beforeEach(done => {
    wrapper = mount(UserListComponent, options);
    wrapper.vm.$nextTick(() => {
      expect(wrapper.isVueInstance()).toBeTruthy();

      mockAxios.mockResponseFor(
        { url: `${serviceAPI}/users` },
        {
          data: [
            {
              firstname: "Jhonny",
              address: {
                country: "PE",
                city: "Lima",
                street: "Av. A. Bertello 781",
                postalcode: "15123"
              },
              id: 1,
              birthDate: "1986-07-23",
              email: "jhmorales0786@gmail.com",
              lastname: "Morales"
            },
            {
              firstname: "Anali",
              address: {
                country: "PE",
                city: "Lima",
                street: "Av. A. Bertello 781",
                postalcode: "15123"
              },
              id: 2,
              birthDate: "1983-07-20",
              email: "anali2020@gmail.com",
              lastname: "Moreno"
            }
          ]
        }
      );

      done();
    });
  });

  it("Las columnas se muestran correctamente en el idioma por defecto.", () => {
    let columns = wrapper.findAll(".bx--data-table th").wrappers;
    expect(columns[1].text()).toEqual(options.i18n.t("info.user.firstname"));
    expect(columns[2].text()).toEqual(options.i18n.t("info.user.lastname"));
    expect(columns[3].text()).toEqual(options.i18n.t("info.user.email"));
    expect(columns[4].text()).toEqual(options.i18n.t("info.user.birthdate"));
    expect(columns[5].text()).toEqual(options.i18n.t("info.user.address"));
  });

  it("La acción 'Filter' filtra contenido en la «lista de usuarios».", async () => {
    wrapper.find(".bx--search-magnifier").trigger("click");

    let filterValue = "jh";

    let search = wrapper.find("[data-search] input[type=text]");
    search.trigger("input", {
      key: filterValue
    });

    wrapper.vm.filterValue = filterValue;
    expect(wrapper.vm.filteredData.length).toBe(1);
  });

  it("La acción 'Sort' order el contenido de la «lista de usuarios».", async () => {
    let sort = wrapper.find(
      ".bx--data-table th > .bx--table-sort:first-of-type"
    );

    // orden por defecto
    expect(wrapper.vm.internalData[0][0]).toEqual("Jhonny");

    sort.trigger("click");

    // orden ascendente
    expect(wrapper.vm.internalData[0][0]).toEqual("Anali");

    sort.trigger("click");

    // orden descendente
    expect(wrapper.vm.internalData[0][0]).toEqual("Jhonny");

    sort.trigger("click");

    // orden por defecto
    expect(wrapper.vm.internalData[0][0]).toEqual("Jhonny");
  });

  it("La acción 'Agregar' redirecciona a la «vista de usuario».", async () => {
    expect(options.router.currentRoute.fullPath).toEqual("/");

    let addnew = wrapper.find(".bx--toolbar-content > button");
    addnew.trigger("click");

    await wrapper.vm.$nextTick();

    expect(options.router.currentRoute.fullPath).toEqual("/user");
  });

  it("La acción 'Eliminar' muestra la «ventana de confirmación».", () => {
    // selecciona el primer registro de la lista de usuarios
    wrapper
      .find(".bx--table-column-checkbox input[type=checkbox]:first-of-type")
      .trigger("click");

    let remove = wrapper.find(".bx--action-list button:first-of-type");
    remove.trigger("click");

    expect(wrapper.find("[data-modal].is-visible").exists()).toBeTruthy();
  });

  it("La acción 'Confirmar' de la «ventana de confirmación» elimina el usuario seleccionado.", async () => {
    // selecciona el primer registro de la lista de usuarios
    wrapper
      .find(".bx--table-column-checkbox input[type=checkbox]:first-of-type")
      .trigger("click");

    let remove = wrapper.find(".bx--action-list button:first-of-type");
    remove.trigger("click");

    let confirmar = wrapper.find(".bx--modal-container button.bx--btn--danger");
    confirmar.trigger("click");

    wrapper.vm.rowSelects.forEach(index =>
      mockAxios.mockResponseFor({
        url: `${serviceAPI}/users/${wrapper.vm.users[index].id}`
      })
    );

    await flushPromises();

    expect(wrapper.vm.refillDataTable).toBe(true);

    await flushPromises();
  });

  it("La acción 'Editar' redirecciona a la «vista de usuario» con el usuario seleccionado.", async () => {
    options.router.push("/");

    await wrapper.vm.$nextTick();

    expect(options.router.currentRoute.fullPath).toEqual("/");

    // selecciona el primer registro de la lista de usuarios
    wrapper
      .find(".bx--table-column-checkbox input[type=checkbox]:first-of-type")
      .trigger("click");

    let editar = wrapper.find(".bx--action-list button:nth-of-type(2)");
    editar.trigger("click");

    await wrapper.vm.$nextTick();

    let userId = wrapper.vm.users[wrapper.vm.rowSelects[0]].id;
    expect(options.router.currentRoute.fullPath).toEqual(`/user/${userId}`);
  });

  afterEach(() => {
    mockAxios.reset();
  });
});
