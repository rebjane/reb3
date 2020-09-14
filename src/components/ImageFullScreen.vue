<template>
  <div class="image-fullscreen">
    <!-- {{data.primary.image.url}} -->
    <div class="image" :style="`background-image: url(${data.primary.image.url})`">
      <img :src="data.primary.image.url" />
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

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.image-fullscreen {
  //   position: relative;
  height: 80vh;
  padding: 2em 0;
}
.image {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  height: 80vh;

  left: 0;
  img {
    opacity: 0;
    width: 100%;
  }
}
</style>
