import { shallowMount, mount, Wrapper } from "@vue/test-utils";
import User from "@/app/views/User.vue";
import options from "../mount-options";
import mockAxios from "jest-mock-axios";
import flushPromises from "flush-promises";

jest.mock("axios");

describe("user.edit.vue", () => {
  let wrapper: Wrapper<any>;
  let serviceAPI: string = process.env.VUE_APP_ROOT_API;
  let user = {
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
  };

  options.router.push("/user/1");

  beforeEach(async () => {
    wrapper = mount(User, options);

    mockAxios.mockResponseFor({ url: `${serviceAPI}/users/1` }, { data: user });

    await wrapper.vm.$nextTick();

    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it("Los datos del usuario se muestran cuando la vista carga en «modo edition».", () => {
    let inputs = wrapper.findAll(".bx--form-item input").wrappers;

    let elementValue = (input: Wrapper<Vue>) => {
      let element: any = input.element;
      return element.value;
    };

    expect(elementValue(inputs[0])).toEqual(user.firstname);
    expect(elementValue(inputs[1])).toEqual(user.lastname);
    expect(elementValue(inputs[2])).toEqual(user.email);
    expect(elementValue(inputs[3])).toEqual(user.birthDate);
    expect(elementValue(inputs[4])).toEqual(user.address.street);
    expect(elementValue(inputs[5])).toEqual(user.address.city);
    expect(elementValue(inputs[6])).toEqual("Perú"); // user.address.country
    expect(elementValue(inputs[7])).toEqual(user.address.postalcode);
  });

  it("La acción 'Enviar' graba la información del usuario y redirecciona a la «vista de inicio».", async () => {
    let submit = wrapper.find(".bx--btn--primary");
    submit.trigger("click");

    mockAxios.mockResponseFor({ url: `${serviceAPI}/users/1` });

    await flushPromises();

    expect(options.router.currentRoute.fullPath).toEqual(`/`);
  });

  afterEach(() => {
    mockAxios.reset();
    1;
  });
});
