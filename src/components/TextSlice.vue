<template>
  <div class="text-slice">
    <div class="text-slice-inner">
      <h2 v-if="workdata && workdata.text_title">{{$cms.textField(workdata.text_title)}}</h2>
      <p v-if="workdata && workdata.text_body">{{$cms.textField(workdata.text_body)}}</p>
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
    return {
      workdata: null,
    };
  },
  beforeDestroy() {},
  computed: {
    // ...mapState(["signatureLoaded", "loadPct", "loaded", "navOpen"])
  },
  methods: {},
  mounted() {
    this.workdata = this.data.items[0];
    console.log(this.workdata);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles.scss";
.text-slice-inner {
  text-align: left;
  max-width: 600px;
  margin: auto;
  padding: 3em 0;
}
h2 {
  font-family: $suisse;
}
</style>
