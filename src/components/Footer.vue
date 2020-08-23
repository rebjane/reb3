<template>
  <div class="footer">
    <div class="footer-logo-container">
      <Logo />
    </div>
  </div>
</template>

<script>
import Logo from "../Logo.vue";

export default {
  name: "Menu",
  components: { Logo },
  props: {
    data: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      mobileMenuOpen: false,
    };
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
.footer {
  border-top: 1px solid lightgrey;
  position: relative;
  padding: 50px 0;
  margin-top: 2em;
  .logo {
    width: 60px;
    text-align: center;
    display: inline-block;
  }
}
</style>
