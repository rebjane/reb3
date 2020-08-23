<template>
  <div
    :class="`sliding-text ${isBanner ? 'is_banner' : null}`"
    :style="`transform: rotate(${rotateVal}deg); width: ${isFullWidth ? '100vw' : '100%'};`"
  >
    <div class="viewport" ref="viewport" :style="`height: ${spanHeight}px;`">
      <h2
        class="h2_0"
        :id="`h2_0_${key}`"
        ref="h2_0"
        :style="`color: ${color}; font-size: ${fs}px; height: ${spanHeight}px;`"
      >
        <span :id="`span_${i}`" :ref="`span_${i}`">{{mainText}}</span>
      </h2>
      <h2
        :style="`color: ${color}; font-size: ${fs}px; height: ${spanHeight}px; left: ${totalSpansWidth + (qty * 20)}px;`"
        class="h2_1"
        :id="`h2_1_${key}`"
        ref="h2_1"
      >
        <span :id="`span_${i}`" :ref="`span_${i}`">{{mainText}}</span>
      </h2>
    </div>
  </div>
</template>

<script>
import { TimelineMax, gsap, Linear } from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin";
gsap.registerPlugin(CSSPlugin);

export default {
  watch: {
    data: {
      handler(e) {
        if (e) {
          this.color = e.items[0].color;
          this.key = e.items[0].key;
          this.mainText = this.$cms.textField(e.items[0].text);
          this.isFullWidth = e.items[0].is_full_width;
          this.isBanner = e.items[0].is_banner;
          // console.log(this.key);
        }
      },
      deep: true,
      immediate: true,
    },
  },
  name: "SlidingText",

  props: {
    data: {
      type: Object,
      default: null,
    },
    text: {
      type: String,
      default: "work",
    },
    fs: {
      type: Number,
      default: 20,
    },
    speed: {
      type: Number,
      default: 20,
    },
    rotate: {
      type: Number,
      default: 0,
    },
    uniquekey: {
      type: Number,
      default: 0,
    },
    col: {
      type: String,
      default: "black",
    },
  },
  data() {
    return {
      ww: window.innerWidth,
      hw: window.innerWidth / 2,
      spanWidth: 0,
      qty: 1,
      spanHeight: 0,
      i: 0,
      timelines: [],
      totalSpansWidth: 0,
      rotateVal: 0,
      color: this.col,
      key: this.uniquekey,
      mainText: this.text,
      isFullWidth: false,
      isBanner: false,
    };
  },
  methods: {
    getAmt() {
      this.spanWidth = this.$refs.span_0.getBoundingClientRect().width;
      this.spanHeight = this.$refs.span_0.getBoundingClientRect().height;
      this.viewportWidth = this.$refs.viewport.getBoundingClientRect().width;
      this.qty = Math.floor(this.ww / this.spanWidth) + 1;
      this.totalSpansWidth = this.spanWidth * this.qty;
      for (let i = 1; i < this.qty; i++) {
        this.$refs.h2_0.innerHTML += `<span id="span_${i}" style="position: absolute;left: ${
          i * this.spanWidth + i * 20
        }px;">${this.mainText} </span>`;
        this.$refs.h2_1.innerHTML += `<span id="span_${i}" style="position: absolute;left: ${
          i * this.spanWidth + i * 20
        }px;">${this.mainText} </span>`;
      }
      //   console.log(this.totalSpansWidth);
      for (let i = 0; i < 2; i++) {
        var el = document.getElementById(`h2_${i}_${this.key}`);
        this.slide(el, i);
      }
      //do rotation after all is calcualted, to prevent from messing up with it beforehand
      this.rotateVal = this.rotate;
    },
    slide(el, i) {
      this.timelines.push(new TimelineMax({ repeat: -1 }));
      this.timelines[i]
        .to(el, this.speed, {
          css: {
            x: -this.totalSpansWidth - this.qty * 20,
          },
          ease: Linear.easeNone,
        })
        .to(el, 0, {
          css: {
            x: 0,
          },
        });
    },
  },

  mounted() {
    this.getAmt();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles.scss";
.sliding-text {
  padding-top: 1em;
  // position: relative;
  z-index: 1;
  pointer-events: none;
}
.viewport {
  width: 100%;
  overflow: hidden;
  position: relative;

  margin-left: auto;
  margin-right: auto;
  // &:before {
  //   content: "";

  //   width: 200px;
  //   height: 100%;
  //   position: absolute;
  //   z-index: 1;
  //   left: 0;
  //   top: 0;
  //   background: rgb(22, 22, 22);
  //   background: linear-gradient(
  //     90deg,
  //     rgba(22, 22, 22, 1) 0%,
  //     rgba(22, 22, 22, 0.6208858543417367) 11%,
  //     rgba(22, 22, 22, 0) 18%
  //   );
  // }
  // &:after {
  //   content: "";

  //   width: 200px;
  //   height: 100%;
  //   position: absolute;
  //   z-index: 1;
  //   right: 0;
  //   top: 0;
  //   background: rgb(22, 22, 22);
  //   background: linear-gradient(
  //     270deg,
  //     rgba(22, 22, 22, 1) 0%,
  //     rgba(22, 22, 22, 0.6208858543417367) 11%,
  //     rgba(22, 22, 22, 0) 18%
  //   );
  // }
}
.is_banner {
  border-top: 1px solid $bg;
  border-bottom: 1px solid $bg;
  padding-bottom: 1em;
}
h2 {
  display: inline-block;
  margin: 0;
  overflow: visible;

  // color: white;
  // color: white;
  font-family: $acumin;
  font-style: italic;
  // font-weight: bold;
  text-align: center;
  width: 100%;
  position: absolute;
  white-space: nowrap;
  //   height: 72px;
  //   margin: 0;
  span {
    position: absolute;
    left: 0;
    display: inline-block;
  }
}
.h2_0 {
  left: 0;
}
</style>
