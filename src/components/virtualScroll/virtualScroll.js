import "./virtualScroll.scss"; // Styles

import Measurable from "./mixins/measurable"; // Mixins

import Scroll from "./directives/scroll"; // Directives

import { convertToUnit, getSlot } from "./util/helpers"; // Utilities
export default Measurable.extend({
  name: "v-virtual-scroll",
  directives: {
    Scroll,
  },
  props: {
    bench: {
      type: [Number, String],
      default: 0,
    },
    itemHeight: {
      type: [Number, String],
      required: true,
    },
    itemWidth: {
      type: [Number, String],
      required: true,
    },
    items: {
      type: Array,
      default: () => [],
    },
    curIndex:{
      type: Number,
      default: 0,
    }
  },
  data: () => ({
    first: 0,
    last: 0,
    scrollTop: 0,
  }),
  computed: {
    __bench() {
      return parseInt(this.bench, 10);
    },

    __itemHeight() {
      return parseInt(this.itemHeight, 10);
    },

    __itemWidth() {
      return parseInt(this.itemWidth, 10);
    },
    firstToRender() {
      return Math.max(0, this.first - this.__bench);
    },
    lastToRender() {
      return Math.min(this.items.length, this.last + this.__bench);
    },
  },
  watch: {
    height: "onScroll",
    itemHeight: "onScroll",
    curIndex:"autoScroll",
  },
  mounted() {
    this.last = this.getLast(0);
    this.wheelInit();
  },

  methods: {
    autoScroll(){
      this.scrollTo(this.curIndex);
    },
    // 滑动到指定位置
    scrollTo(index){
      // debugger
      //  let leftOffset = index * this.__itemWidth + this.$el.offsetWidth/2;
      //  this.$el.scrollLeft = leftOffset;
    },  
    wheelInit() {
      // 添加滚轮滚动监听事件，一般是用下面的方法，上面的是火狐的写法
      const that = this
      this.$el.addEventListener("mousewheel", handler, false);
      // 滚动事件的出来函数
      function handler(event) {
        // 获取滚动方向
        const detail = event.wheelDelta || event.detail;
        // 定义滚动方向，其实也可以在赋值的时候写
        const moveForwardStep = 1;
        const moveBackStep = -1;
        // 定义滚动距离
        let step = 0;
        // 判断滚动方向,这里的100可以改，代表滚动幅度，也就是说滚动幅度是自定义的
        if (detail < 0) {
          step = moveForwardStep * 100;
        } else {
          step = moveBackStep * 100;
        }
        // 对需要滚动的元素进行滚动操作
        that.$el.scrollLeft += step;
      }
    },
    getChildren() {
      return this.items
        .slice(this.firstToRender, this.lastToRender)
        .map(this.genChild);
    },
    genChild(item, index) {
      index += this.firstToRender;
      const left = convertToUnit(index * this.__itemWidth);
      return this.$createElement(
        "div",
        {
          staticClass: "v-virtual-scroll__item",
          style: {
            left,
          },
          key: index,
        },
        getSlot(this, "default", {
          index,
          item,
        })
      );
    },
    getFirst() {
      return Math.floor(this.scrollLeft / this.__itemWidth);
    },
    getLast(first) {
      const width = parseInt(this.width || 0, 10) || this.$el.clientWidth;
      return first + Math.ceil(width / this.__itemWidth);
    },
    onScroll() {
      this.scrollLeft = this.$el.scrollLeft;
      this.first = this.getFirst();
      this.last = this.getLast(this.first);
    },
  },
  render(h) {
    const content = h(
      "div",
      {
        staticClass: "v-virtual-scroll__container",
        style: {
          width: convertToUnit(this.items.length * this.__itemWidth),
        },
      },
      this.getChildren()
    );
    return h(
      "div",
      {
        staticClass: "v-virtual-scroll",
        style: this.measurableStyles,
        directives: [
          {
            name: "scroll",
            modifiers: {
              self: true,
            },
            value: this.onScroll,
          },
        ],
        on: this.$listeners,
      },
      [content]
    );
  },
});
//# sourceMappingURL=VVirtualScroll.js.map
