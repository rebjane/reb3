<template>
  <div class="menu">
    <ul v-if="$menu">
      <li v-for="(item, i) in $menu" :key="i">
        <a
          :href="$cms.textField(item.link)"
          :target="item.target"
        >{{$cms.textField(item.link_name)}}</a>
      </li>
    </ul>
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
<style scoped>
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
  font-size: 20px;
  text-transform: uppercase;
}
</style>
