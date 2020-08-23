<template>
  <div class="hamburger">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 98 33">
      <rect class="cls-1" width="74" height="3" />
      <rect class="cls-1" x="24" y="30" width="74" height="3" />
    </svg>
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
<style  scoped>
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
</style>
