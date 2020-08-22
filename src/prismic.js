import Vue from "vue";
import prismic from "prismic-javascript";

var PrismicDOM = require("prismic-dom");
class Prismic {
  constructor() {
    this.api = "https://reb2.cdn.prismic.io/api/v2";
    // this.prismic = require("prismic-javascript");
  }
  async fetchData() {
    return new Promise((doneloading) => {
      prismic
        .getApi(this.api)
        .then((api) => {
          return api.query("", { pageSize: 100 });
        })
        .then((response) => {
          this.data = response.results;

          const loadMenu = new Promise((res) => {
            Vue.prototype.$menu = this.data.filter(
              (x) => x.type === "menu"
            )[0].data.menu_items;
            res(Vue.prototype.$menu);
          });

          const loadHP = new Promise((res) => {
            Vue.prototype.$home_page = this.data.filter(
              (x) => x.type === "home_page"
            )[0].data.body;

            res(Vue.prototype.$home_page);
          });
          const loadWork = new Promise((res) => {
            Vue.prototype.$work = this.data.filter((x) => x.type === "work");
            console.log(Vue.prototype.$work);

            res(Vue.prototype.$work);
          });
          const contactP = new Promise((res) => {
            Vue.prototype.$contact_page = this.data
              .filter((x) => x.type === "home_page")[0]
              .data.body.filter((x) => x.slice_type === "ContactSection");
            console.log(Vue.prototype.$contact_page[0]);

            res(Vue.prototype.$contact_page);
          });

          Promise.all([loadMenu, loadHP, loadWork, contactP]).then(() =>
            doneloading()
          );
        });
    });
  }
}
export const prismicData = new Prismic();

Vue.prototype.$cms = new (class CMSModule {
  text(field) {
    return PrismicDOM.RichText.asText(this.fields[field]);
  }

  textField(field) {
    return PrismicDOM.RichText.asText(field);
  }

  html(field) {
    return PrismicDOM.RichText.asHtml(this.fields[field]);
  }

  htmlField(field) {
    return PrismicDOM.RichText.asHtml(field);
  }
})();
