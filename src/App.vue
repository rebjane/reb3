<template>
  <div id="app">
    <div class="logo-container">
      <Logo />
    </div>
    <Menu />

    <router-view />
  </div>
</template>

<script>
// import HomePage from "./components/HomePage.vue";
import Menu from "./components/Menu.vue";
import Logo from "./Logo.vue";

export default {
  name: "App",
  components: {
    // HomePage,
    Menu,
    Logo,
  },
};
</script>

<style lang="scss">
@import "./styles.scss";
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  // color: #2c3e50;
  padding: 0 5%;

  margin-top: 30px;
}
.logo {
  width: 60px;
  text-align: center;
  display: inline-block;
}
</style>
