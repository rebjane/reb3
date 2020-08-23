<template>
  <div class="work-page page">
    <div class="desc" v-if="desc">{{desc}}</div>
    <!-- <SlidingText v-if="desc" :text="desc" /> -->
    <div class="grid" ref="grid">
      <div :ref="`item-${i}`" class="grid-item" v-for="(item, i) in work" :key="i">
        <!-- <a :href="item.uid">  work on this later-->
        <!-- {{item.uid}} -->
        <img :src="item.data.feature_image.url || item.data.anim_link.url" />
        <!-- </a> -->
      </div>
    </div>
  </div>
</template>

<script>
// import SlidingText from "./SlidingText.vue";
export default {
  name: "WorkPage",
  components: {
    // SlidingText,
  },
  props: {
    data: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      currentSlug: window.location.pathname.substring(1) || null,
      work: null,
      row1: 0,
      row2: 0,
      row3: 0,
      desc: null,
    };
  },
  beforeDestroy() {},
  computed: {
    // ...mapState(["signatureLoaded", "loadPct", "loaded", "navOpen"])
  },
  methods: {
    loadWork() {
      this.work = this.$work.filter(
        (x) => x.data.type_of_work === this.currentSlug
      );
    },
    gridPositioning() {
      for (let i = 0; i < this.work.length; i++) {
        // console.log(this.$refs[`item-${i}`][0].style);
        if (i % 3 === 0) {
          this.$refs[`item-${i}`][0].style = `top: ${this.row1}px; opacity: 1;`;
          this.row1 += this.$refs[`item-${i}`][0].offsetHeight - 5;
        }
        if (i % 3 === 1) {
          this.$refs[`item-${i}`][0].style = `top: ${this.row2}px; opacity: 1;`;
          this.row2 += this.$refs[`item-${i}`][0].offsetHeight - 5;
        }
        if (i % 3 === 2) {
          this.$refs[`item-${i}`][0].style = `top: ${this.row3}px; opacity: 1;`;
          this.row3 += this.$refs[`item-${i}`][0].offsetHeight - 5;
        }
      }
      var highest = Math.max.apply(Math, [this.row1, this.row2, this.row3]);
      this.$refs.grid.style = `max-height: ${highest}px; height: ${highest}px; `;
    },
  },
  mounted() {
    //filer the "$this.work by th "type_of_work" matching slug
    this.loadWork();
    this.$nextTick(() => {
      setTimeout(() => {
        this.gridPositioning();
      }, 100);
    });

    window.addEventListener("resize", () => {
      setTimeout(() => {
        this.row1 = 0;
        this.row2 = 0;
        this.row3 = 0;
        this.gridPositioning();
      }, 400);
    });
    // window.addEventListener("mouseup", () => {
    //   this.row1 = 0;
    //   this.row2 = 0;
    //   this.row3 = 0;
    //   this.gridPositioning();
    // });

    this.desc = this.$cms.textField(
      this.$menu.filter(
        (x) =>
          this.$cms.textField(x.link_name).toLowerCase() === this.currentSlug
      )[0].description
    );
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles.scss";

.grid {
  position: relative;
  height: 100%;
  text-align: center;
  max-height: 0;
  transition: max-height 0.5s ease;
  @include below($tablet) {
    height: 100% !important;
    max-height: 100% !important;
  }
}
.grid-item {
  top: 0;
  width: 100%;
  opacity: 0;
  @include above($tablet) {
    width: 33%;

    transition: all 0.5s ease;
    position: absolute;
    &:nth-child(3n + 2) {
      left: 33%;
    }
    &:nth-child(3n + 3) {
      left: 66%;
    }
  }
  img {
    width: 100%;
  }
}
.desc {
  font-weight: bold;
  padding-bottom: 50px;
  font-size: 30px;
  font-family: $suisse;
  text-transform: capitalize;
}
</style>
