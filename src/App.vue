<template>
  <div id="app">
    <div class="logo-container">
      <a href="/">
        <Logo />
      </a>
    </div>
    <Menu />

    <router-view />
    <Footer />
  </div>
</template>

<script>
// import HomePage from "./components/HomePage.vue";
import Menu from "./components/Menu.vue";
import Footer from "./components/Footer.vue";
import Logo from "./Logo.vue";

export default {
  name: "App",
  components: {
    // HomePage,
    Menu,
    Logo,
    Footer,
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
  @include below($tablet) {
    margin-top: 10px;
  }
}
.logo {
  width: 60px;
  text-align: center;
  display: inline-block;
}
.logo-container {
  @include below($tablet) {
    width: 50%;
    text-align: left;
    display: inline-block;
  }
}
</style>
