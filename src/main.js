import Vue from "vue";
import Index from "./Index.vue";
import { prismicData } from "./prismic.js";
import store from "./store.js";
import routes from "./router.js";
import { smtp } from "./smtp.js";
Vue.config.productionTip = false;

prismicData.fetchData().then(() => {
  Vue.prototype.$smtp = smtp;

  new Vue({
    el: "#app",
    router: routes,
    prismicData,
    smtp,
    store,
    render: (h) => h(Index),
  });
});
