<template>
  <div class="work-page page">
    <div class="desc" v-if="desc">{{desc}}</div>
    <!-- <SlidingText v-if="desc" :text="desc" /> -->
    <div class="grid">
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
          this.$refs[`item-${i}`][0].style = `top: ${this.row1}px`;
          this.row1 += this.$refs[`item-${i}`][0].offsetHeight - 5;
        }
        if (i % 3 === 1) {
          this.$refs[`item-${i}`][0].style = `top: ${this.row2}px`;
          this.row2 += this.$refs[`item-${i}`][0].offsetHeight - 5;
        }
        if (i % 3 === 2) {
          this.$refs[`item-${i}`][0].style = `top: ${this.row3}px`;
          this.row3 += this.$refs[`item-${i}`][0].offsetHeight - 5;
        }
      }
    },
  },
  mounted() {
    //filer the "$this.work by th "type_of_work" matching slug
    this.loadWork();
    setTimeout(() => {
      this.gridPositioning();
    }, 500);
    window.addEventListener("resize", () => {
      this.row1 = 0;
      this.row2 = 0;
      this.row3 = 0;
      this.gridPositioning();
    });

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
}
.grid-item {
  top: 0;
  width: 100%;
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
  padding-bottom: 50px;
  font-size: 30px;
  font-family: $suisse;
  text-transform: capitalize;
}
</style>
