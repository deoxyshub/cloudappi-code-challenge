<template>
  <main>
    <header>
      <nav>
        <a><img src="../assets/carbon-vue.svg" alt="@carbon/vue"/></a>
        <router-link to="/">{{ $t("header.menu.home") }}</router-link
        >|
        <router-link to="/about">{{ $t("header.menu.about") }}</router-link>
      </nav>
      <localization />
    </header>
    <section>
      <router-view />
      <sw-banner />
    </section>
    <footer role="contentinfo">
      <small>
        &copy; {{ $t("publish.owner.description") }} - &nbsp;
        <time :datetime="$t('publish.date.shortname')" pubdate>{{
          $t("publish.date.longname")
        }}</time>
      </small>
    </footer>
  </main>
</template>

<script>
import LocalizationComponent from "./components/localization/localization.vue";
import SWBannerComponent from "./components/sw-banner/sw.banner.vue";

export default {
  components: {
    ["localization"]: LocalizationComponent,
    ["sw-banner"]: SWBannerComponent
  }
};
</script>

<style scoped>
main,
main > header,
main > header > nav,
main > footer {
  display: flex !important;
}

main {
  color: #2c3e50;
  flex-flow: column nowrap;
}

main > header {
  background: #42b983;
  height: 5rem;
  min-height: 5rem;
}

main > header,
main > header > nav,
main > footer {
  flex-flow: row nowrap;
  align-items: center;
}

main > header > nav > a > img {
  height: 3.1241rem;
  width: 9.125rem;
}

main > header > nav > a {
  margin: 0 0.5rem;
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

main > header > nav > a:nth-of-type(2) {
  margin-left: 2rem;
}

main > header > nav > a.router-link-exact-active {
  color: #ffffff;
}

main > section {
  flex: auto;
  margin: 2rem 0;
}

main > footer {
  height: 3rem;
  min-height: 3rem;
  background: #000000;
  justify-content: flex-end;
  color: #ffffff;
}

main > * {
  padding: 0 5rem;
}

@media only screen and (max-width: 760px),
  (min-device-width: 768px) and (max-device-width: 1024px) {
  main > section {
    margin: 2rem 0.5rem;
  }

  main > * {
    padding: 0 0.5rem;
  }
}
</style>
