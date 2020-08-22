import Vue from "vue";
import Index from "./Index.vue";
import { prismicData } from "./prismic.js";
import store from "./store.js";
import routes from "./router.js";

Vue.config.productionTip = false;

prismicData.fetchData().then(() => {
  new Vue({
    el: "#app",
    router: routes,
    prismicData,
    store,
    render: (h) => h(Index),
  });
});
