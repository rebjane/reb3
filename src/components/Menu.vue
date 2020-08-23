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
    <ul v-if="$menu" class="mobile-menu">
      <Hamburger class="hamburgermenu" @click.native="toggleMobileMenu" />
      <div class="dropdown" ref="dropdown">
        <li v-for="(item, i) in $menu" ref="menuitem" :key="i">
          <a
            :href="$cms.textField(item.link)"
            :target="item.target"
          >{{$cms.textField(item.link_name)}}</a>
        </li>
      </div>
    </ul>
  </div>
</template>

<script>
import Hamburger from "../Hamburger.vue";
export default {
  name: "Menu",
  components: {
    Hamburger,
  },
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
  methods: {
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
      console.log(
        this.$refs.menuitem[0].offsetHeight * this.$refs.menuitem.length
      );
      switch (this.mobileMenuOpen) {
        case true: {
          this.$refs.dropdown.style = `max-height: ${
            this.$refs.menuitem[0].offsetHeight * this.$refs.menuitem.length
          }px;`;

          break;
        }
        case false: {
          this.$refs.dropdown.style = "max-height: 0%;";

          break;
        }
      }
    },
  },
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

a {
  text-decoration: none;
  font-size: 12px;
  padding: 0 3em;
  text-transform: uppercase;
  @include below($tablet) {
    font-size: 20px;
  }
}
.desktop-menu {
  li {
    display: inline-block;
    margin: 0 10px;
  }
  border-bottom: 1px solid lightgrey;
  padding-bottom: 30px;
  @include below($tablet) {
    display: none;
  }
}
.mobile-menu {
  li {
    padding: 2em 0;
  }
  position: relative;
  @include above($tablet) {
    display: none;
  }
  border-bottom: 1px solid lightgrey;

  padding: 2em 0;
  .hamburgermenu {
    cursor: pointer;
    width: 3em;
    text-align: center;
    display: inline-block;
  }
  .dropdown {
    position: absolute;
    text-align: center;
    width: 100%;
    background: lightgrey;
    z-index: 2;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.5s ease;
  }
}
</style>
