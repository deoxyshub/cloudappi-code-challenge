import { shallowMount, Wrapper } from "@vue/test-utils";
import LocalizationComponent from "@/app/components/localization/localization";
import About from "@/app/views/About.vue";
import options from "../mount-options";

describe("localization.vue", () => {
  let wrapper: Wrapper<LocalizationComponent>;

  beforeEach(() => {
    wrapper = shallowMount(LocalizationComponent, options);

    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it("El elemento se traduce correctamente por el idioma inglés", () => {
    options.i18n.locale = "en";
    expect(wrapper.find('img[title="English"]').exists()).toBeTruthy();
  });

  it("El elemento se traduce correctamente por el idioma español", () => {
    options.i18n.locale = "es";
    expect(wrapper.find('img[title="Inglés"]').exists()).toBeTruthy();
  });

  it("El elemento traduce el contenido al ser seleccionado", () => {
    options.i18n.locale = "es";

    // selecciona el elemento de idioma inglés
    let button = wrapper.find("a[selected] + a");
    button.trigger("click");

    expect(
      wrapper.find('a[selected] > img[title="English"]').exists()
    ).toBeTruthy();
  });
});

describe("about.vue", () => {
  
  options.router.push("/about");

  it("La «vista de acerca de» es cargado.", () => {
    let wrapper = shallowMount(About, options);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
