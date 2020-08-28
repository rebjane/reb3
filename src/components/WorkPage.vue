<template>
  <div class="work-page page">
    <div class="workpreview-page" v-if="work && work.length">
      <div class="desc" v-if="desc">{{desc}}</div>
      <!-- <SlidingText v-if="desc" :text="desc" /> -->
      <div class="grid" ref="grid">
        <div :ref="`item-${i}`" class="grid-item" v-for="(item, i) in work" :key="i">
          <a :href="item.uid">
            <Logo class="logo" :fill="'white'" />
            <img draggable="false" :src="item.data.feature_image.url || item.data.anim_link.url" />
          </a>
        </div>
      </div>
    </div>
    <div v-else-if="specificwork" class="workspecific-page">
      <!-- {{specificwork.data.title}} -->
      <div class="top-content">
        <div class="title">
          <h1 v-if="specificwork.data.title">{{$cms.textField(specificwork.data.title)}}</h1>
          <p v-if="specificwork.data.description">{{$cms.textField(specificwork.data.description)}}</p>
        </div>
        <div class="feature-image" v-if="specificwork.data.feature_image.url">
          <div
            class="image"
            :style="`background-image: url(${specificwork.data.feature_image.url})`"
          >
            <img draggable="false" :src="specificwork.data.feature_image.url" />
          </div>
        </div>
      </div>

      <transition v-for="(item, i) in specificwork.data.body" :key="i">
        <!-- <div> -->
        <!-- <p>{{item}}</p> -->
        <component :is="item.slice_type" :data="item" />
        <!-- </div> -->
      </transition>
    </div>
    <div v-else>404. Nothing here sorry :(</div>
  </div>
</template>

<script>
// import SlidingText from "./SlidingText.vue";
import TextSlice from "./TextSlice.vue";
import ImageOrVideo from "./ImageOrVideo.vue";
import Logo from "../Logo.vue";
export default {
  name: "WorkPage",
  components: {
    // SlidingText,
    TextSlice,
    ImageOrVideo,
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
    reposition() {
      setTimeout(() => {
        this.row1 = 0;
        this.row2 = 0;
        this.row3 = 0;
        this.gridPositioning();
      }, 400);
    },
    gridPositioning() {
      var expectedImageWidth = (window.innerWidth * 0.9) / 3;
      for (let i = 0; i < this.work.length; i++) {
        // console.log(this.work[i].data.anim_link.height);

        // console.log(this.$refs[`item-${i}`][0].style);
        var height = this.work[i].data.feature_image.dimensions
          ? this.work[i].data.feature_image.dimensions.height
          : this.work[i].data.anim_link.height;
        var width = this.work[i].data.feature_image.dimensions
          ? this.work[i].data.feature_image.dimensions.width
          : this.work[i].data.anim_link.width;

        if (i % 3 === 0) {
          this.$refs[`item-${i}`][0].style = `top: ${this.row1}px; opacity: 1;`;
          // this.row1 += this.$refs[`item-${i}`][0].offsetHeight - 5;
          this.row1 += (height / width) * expectedImageWidth;
        }
        if (i % 3 === 1) {
          this.$refs[`item-${i}`][0].style = `top: ${this.row2}px; opacity: 1;`;
          // this.row2 += this.$refs[`item-${i}`][0].offsetHeight - 5;
          this.row2 += (height / width) * expectedImageWidth;
        }
        if (i % 3 === 2) {
          this.$refs[`item-${i}`][0].style = `top: ${this.row3}px; opacity: 1;`;
          // this.row3 += this.$refs[`item-${i}`][0].offsetHeight - 5;
          this.row3 += (height / width) * expectedImageWidth;
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
        this.$nextTick(() => {
          setTimeout(() => {
            this.gridPositioning();
          }, 100);
        });
      });

      window.addEventListener("resize", () => {
        this.reposition();
      });

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
.top-content {
  display: block;
}
.workspecific-page {
  @include above($tablet) {
    padding: 0 100px;
  }
}
.title {
  @include above($tablet) {
    vertical-align: middle;
    display: table-cell;
    width: 50%;
  }
}
.feature-image {
  @include above($tablet) {
    display: table-cell;
    width: 30%;
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
  @include below($tablet) {
    top: 0 !important;
  }
  @include above($tablet) {
    width: calc(100% / 3);

    transition: all 0.5s ease;
    position: absolute;
    &:nth-child(3n + 2) {
      left: calc(100% / 3);
    }
    &:nth-child(3n + 3) {
      left: calc((100% / 3) * 2);
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
  text-align: left;
}
p {
  padding-bottom: 20px;
  border-bottom: 1px solid lightgrey;
  text-align: left;
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
.image {
  background-size: contain;
  max-height: 80vh;
  background-repeat: no-repeat;
  background-position: center;
  img {
    opacity: 0;
    width: 100%;
  }
}
</style>
