<template>
  <div class="text-slice">
    <div class="text-slice-inner">
      <h2>{{$cms.textField(data.text_title)}}</h2>
      <p>{{$cms.textField(data.text_body)}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Menu",
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
.text-slice-inner {
  @include above($tablet) {
    max-width: 50%;
  }
  margin: auto;
}
h2 {
  font-family: $suisse;
}
</style>
