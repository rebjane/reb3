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
  data() {
    return {
      keyShift: false,
      keyCmd: false,
      keyC: false,
      keyOption: false,
      keyJ: false,
    };
  },
  methods: {
    noRightClick() {
      window.addEventListener("contextmenu", (event) => event.preventDefault());
      window.addEventListener("keydown", (e) => {
        // console.log(e.which);
        switch (e.which) {
          case 16: {
            this.keyShift = true;
            break;
          }
          case 18: {
            this.keyOption = true;
            break;
          }
          case 91: {
            this.keyCmd = true;
            break;
          }
          case 67: {
            this.keyC = true;
            break;
          }
          case 74: {
            this.keyJ = true;
            break;
          }
        }

        if (
          (this.keyShift && this.keyCmd && this.keyC) ||
          (this.keyOption && this.keyCmd && this.keyJ) ||
          (this.keyOption && this.keyCmd && this.keyC)
        ) {
          e.preventDefault();
        }
      });
      window.addEventListener("keyup", (e) => {
        switch (e.which) {
          case 16: {
            this.keyShift = false;
            break;
          }
          case 18: {
            this.keyOption = false;
            break;
          }
          case 91: {
            this.keyCmd = false;
            break;
          }
          case 67: {
            this.keyC = false;
            break;
          }
          case 74: {
            this.keyJ = false;
            break;
          }
        }
      });
    },
  },
  mounted() {
    // this.noRightClick();
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
