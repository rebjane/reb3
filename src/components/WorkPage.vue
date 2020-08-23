<template>
  <div class="work-page page">
    <div class="workpreview-page" v-if="work && work.length">
      <div class="desc" v-if="desc">{{desc}}</div>
      <!-- <SlidingText v-if="desc" :text="desc" /> -->
      <div class="grid" ref="grid">
        <div :ref="`item-${i}`" class="grid-item" v-for="(item, i) in work" :key="i">
          <!-- <a :href="item.uid"> -->
          <Logo class="logo" :fill="'white'" />
          <img :src="item.data.feature_image.url || item.data.anim_link.url" />
          <!-- </a> -->
        </div>
      </div>
    </div>
    <div v-else-if="specificwork" class="workspecific-page">
      <!-- {{specificwork.data.title}} -->
      <div class="title">
        <h1>{{$cms.textField(specificwork.data.title)}}</h1>
      </div>
      <div class="feature-image" v-if="specificwork.data.feature_image.url">
        <img :src="specificwork.data.feature_image.url" />
      </div>

      <transition v-for="(item, i) in specificwork.data.body" :key="i">
        <!-- <div> -->
        <!-- <p>{{item}}</p> -->
        <component :is="item.slice_type" :data="item.items[0]" />
        <!-- </div> -->
      </transition>
    </div>
    <div v-else>404. Nothing here sorry :(</div>
  </div>
</template>

<script>
// import SlidingText from "./SlidingText.vue";
import TextSlice from "./TextSlice.vue";
import Logo from "../Logo.vue";
export default {
  name: "WorkPage",
  components: {
    // SlidingText,
    TextSlice,
    Logo,
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
      specificwork: null,
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
      // console.log(this.work);
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

    if (this.work && this.work.length) {
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
    } else {
      this.specificwork = this.$work.filter(
        (x) => x.uid === this.currentSlug
      )[0];
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles.scss";

.feature-image {
  @include above($tablet) {
    width: 50%;
    img {
      width: 100%;
    }
  }
  margin: auto;
}

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
  position: relative;
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
h1 {
  font-family: "Suisse Works";
  font-size: 50px;
  margin-top: 0;
}
.logo {
  position: absolute;
  left: 10%;
  top: 10%;
  transform: translate3d(-50%, -50%, 0);
  width: 10%;
  mix-blend-mode: difference;
  z-index: 1;
}
</style>
