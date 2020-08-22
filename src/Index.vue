<template>
  <div id="index">
    <!-- <HomePage /> -->
    <router-view />
  </div>
</template>

<script>
// import HomePage from "./components/HomePage.vue";
// import Menu from "./components/Menu.vue";

export default {
  name: "App",
  components: {
    // HomePage,
    // Menu,
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
  margin-top: 30px;
}
</style>
