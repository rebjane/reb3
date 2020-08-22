<template>
  <div class="specific-work-page"></div>
</template>

<script>
export default {
  name: "WorkPage",
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

.grid {
  position: relative;
  height: 100%;
}
.grid-item {
  width: 33%;
  top: 0;
  @include above($tablet) {
    transition: all 1s ease;
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
</style>
