<template>
  <div class="image-gallery">
    <div class="gallery">
      <transition v-for="(item, i) in data.items" :key="i">
        <div class="card" :style="`background-image: url(${item.image.url})`">
          <img :src="item.image.url" />
          <!-- <p>{{item}}</p> -->
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageOrVideo",
  components: {},
  props: {
    data: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {};
  },
  beforeDestroy() {},
  computed: {
    // ...mapState(["signatureLoaded", "loadPct", "loaded", "navOpen"])
  },
  methods: {},
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles.scss";
.gallery {
  .card {
    @include above($tablet) {
      display: inline-block;
      vertical-align: top;
      height: 70vh;
      //   max-width: 50%;
      &:nth-child(odd) {
        margin-right: 2em;
      }
    }
    @include below($tablet) {
      width: 100%;
    }

    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;

    img {
      opacity: 0;
      //   width: 100%;
      height: 70vh;
    }
  }
}
</style>
