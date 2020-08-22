<template>
  <div class="menu">
    <ul v-if="$menu" class="desktop-menu">
      <li v-for="(item, i) in $menu" :key="i">
        <a
          :href="$cms.textField(item.link)"
          :target="item.target"
        >{{$cms.textField(item.link_name)}}</a>
      </li>
    </ul>
    <ul v-if="$menu" class="mobile-menu">===</ul>
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
  text-decoration: none;
  font-size: 12px;
  padding: 0 3em;
  text-transform: uppercase;
}
.desktop-menu {
  @include below($tablet) {
    display: none;
  }
}
.mobile-menu {
  @include above($tablet) {
    display: none;
  }
}
</style>
