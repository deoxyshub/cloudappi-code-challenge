<template>
  <main id="app">
    <header>
      <nav>
        <img src="../assets/CarbonVue2.svg" alt="@carbon/vue" />
        <router-link to="/">Home</router-link>|
        <router-link to="/about">About</router-link>
      </nav>
    </header>
    <section><router-view /></section>
    <footer></footer>
  </main>
</template>

<style>
main {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex !important;
  flex-flow: column nowrap;
}

main > header {
  background: #42b983;
  height: 5rem;
  min-height: 5rem;
}

main > header > nav {
  margin-left: 10rem;
}

main > header,
main > header > nav {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}

main > header > nav > img {
  height: 3.1241rem;
  width: 9.125rem;
}

main > header > nav > a {
  margin: 0 0.5rem;
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

main > header > nav > a:first-of-type {
  margin-left: 2rem;
}

main > header > nav > a.router-link-exact-active {
  color: #ffffff;
}

main > section {
  flex: 1 auto;
  margin: 2rem 10rem;
}

main > footer {
  height: 3rem;
  min-height: 3rem;
  background: #000000;
}

main > header,
main > footer {
  flex: 0 1 auto;
}

</style>
