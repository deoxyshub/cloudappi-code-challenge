import { shallowMount, mount, Wrapper } from "@vue/test-utils";
import User from "@/app/views/User.vue";
import UserEditComponent from "@/app/components/user-edit/user.edit";
import options from "../mount-options";
import mockAxios from "jest-mock-axios";
import flushPromises from "flush-promises";

jest.mock("axios");

describe("user.new.vue", () => {
  let wrapper: Wrapper<any>;
  let serviceAPI: string = process.env.VUE_APP_ROOT_API;

  options.router.push("/user");

  beforeEach(() => {
    wrapper = mount(User, options);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it("La acción 'Enviar' se restringe si los campos obligatorios no han sido completados.", async () => {
    let submit = wrapper.find(".bx--btn--primary");
    submit.trigger("click");

    let user = wrapper.find<UserEditComponent>(UserEditComponent).vm.user;
    
    expect(user.firstname).toBeUndefined();
    expect(user.lastname).toBeUndefined();
    expect(user.email).toBeUndefined();
    expect(user.birthDate).toBeUndefined();

    expect(options.router.currentRoute.fullPath).toEqual(`/user`);
  });

  it("La acción 'Enviar' graba la información del usuario y redirecciona a la «vista de inicio».", async () => {
    let user = wrapper.find<UserEditComponent>(UserEditComponent).vm.user;
    let inputs = wrapper.findAll(".bx--form-item input").wrappers;

    user.birthDate = "9999-12-31";
    user.address.country = "PE";

    inputs[0].setValue("JIDZGI");
    inputs[1].setValue("Morales");
    inputs[2].setValue("brothers@gmail.com");
    inputs[3].setValue(user.birthDate);
    inputs[4].setValue("Av. A. Bertello 781");
    inputs[5].setValue("Lima");
    inputs[6].setValue(user.address.country);
    inputs[7].setValue("15123");

    let submit = wrapper.find(".bx--btn--primary");
    submit.trigger("click");

    mockAxios.mockResponseFor({ url: `${serviceAPI}/users` });

    await flushPromises();

    expect(options.router.currentRoute.fullPath).toEqual(`/`);
  });

  afterEach(() => {
    mockAxios.reset();
  });
});
