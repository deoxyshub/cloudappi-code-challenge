<template>
  <main id="app">
    <header>
      <nav>
        <a><img src="../assets/carbon-vue.svg" alt="@carbon/vue"/></a>
        <router-link to="/">{{ $t("header.menu.home") }}</router-link
        >|
        <router-link to="/about">{{ $t("header.menu.about") }}</router-link>
      </nav>
      <LocalizationComponent />
    </header>
    <section>
      <router-view />
    </section>
    <footer role="contentinfo">
      <small>
        &copy; {{ $t("publish.owner.description") }} - &nbsp;
        <time :datetime="$t('publish.date.shortname')" pubdate>{{ $t("publish.date.longname") }}</time>
      </small>
    </footer>
  </main>
</template>

<script>
import LocalizationComponent from "./components/localization/localization.vue";

export default {
  components: {
    LocalizationComponent
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex !important;
  flex-flow: column nowrap;
}

#app > header {
  background: #42b983;
  height: 5rem;
  min-height: 5rem;
}

#app > header,
#app > header > nav {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}

#app > header > nav > a > img {
  height: 3.1241rem;
  width: 9.125rem;
}

#app > header > nav > a {
  margin: 0 0.5rem;
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

#app > header > nav > a:nth-of-type(2) {
  margin-left: 2rem;
}

#app > header > nav > a.router-link-exact-active {
  color: #ffffff;
}

#app > section {
  flex: auto;
  margin: 2rem 0;
}

#app > footer {
  height: 3rem;
  min-height: 3rem;
  background: #000000;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-end;
  color: #ffffff;
}

#app > header,
#app > section,
#app > footer {
  padding: 0 5rem;
}

@media only screen and (max-width: 760px),
  (min-device-width: 768px) and (max-device-width: 1024px) {
  #app > section {
    margin: 2rem 0.5rem;
  }

  #app > header,
  #app > section,
  #app > footer {
    padding: 0 0.5rem;
  }
}
</style>
