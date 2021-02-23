/**
 * @name: 列表滚动组件
 * @param {type}
 */
<template>
  <div class="llgtfoo-list-scroll">
    <div
      class="llgtfoo-list-main"
      id="listMain"
      :style="contentStyle"
      ref="listMain"
      @mousewheel="mousewheel"
      @mouseenter="stop"
      @mouseleave="keep"
    >
      <slot name="main"></slot>
      <slot name="main"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListScroll',
  props: {
    data: {
      type: [Array, Object],
      default: () => [],
    },
    option: {
      type: Object,
    },
  },
  data() {
    return {
      singTimeOut: null,
      timeOut: null,
      scrollDistant: 0,
      scrollHeight: 0, //已滚动高度
      scrollTop: 0,
      containerHeight: '', //外层容器高度
      interval: 0, //间隔
      listLength: 0, //数量
      offsetHeight: 0, //每一项高度
      singleIndex: 1,
    }
  },
  computed: {
    contentStyle() {
      return {
        height: `${this.containerHeight ? this.containerHeight : 'auto'}px`,
      }
    },
    currentOption() {
      let number = 5
      let seamless = null
      let duration = 2000
      if (this.option.hasOwnProperty('number')) {
        // eslint-disable-next-line prefer-destructuring
        number = this.option.number
      }
      if (this.option.hasOwnProperty('seamless')) {
        // eslint-disable-next-line prefer-destructuring
        seamless = this.option.seamless
      }
      if (this.option.hasOwnProperty('duration')) {
        // eslint-disable-next-line prefer-destructuring
        duration = this.option.duration
      }
      return {
        number,
        seamless,
        duration,
      }
    },
  },
  watch: {
    data: {
      handler() {
        this.$nextTick(() => {
          this.init()
        })
      },
      deep: true,
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.init()
    })
  },
  beforeDestroy() {
    clearInterval(this.timeOut)
    clearInterval(this.singTimeOut)
  },
  methods: {
    mousewheel(e) {
      if (!this.currentOption.seamless) {
        e.preventDefault()
      }
    },
    //计算容器值
    init() {
      clearInterval(this.timeOut)
      clearInterval(this.singTimeOut)
      if (
        this.currentOption.seamless ||
        this.$slots.main[0].children.length === 1
      ) {
        this.$refs.listMain.children[1].style.display = 'none'
      }
      if (this.$slots.main[0].children.length > 1) {
        this.listLength = this.$slots.main[0].children.length //总数量
        this.interval =
          parseFloat(
            window.getComputedStyle(this.$slots.main[0].children[1].elm)
              .marginBottom
          ) +
          parseFloat(
            window.getComputedStyle(this.$slots.main[0].children[1].elm)
              .marginTop
          ) //上下数据间隔

        this.containerHeight =
          (this.$slots.main[0].children[1].elm.offsetHeight + this.interval) *
          this.currentOption.number //外层容器高度

        this.offsetHeight = this.$slots.main[0].children[1].elm.offsetHeight //每一条的高度
        this.initScroll()
      }
    },
    //滚动
    initScroll() {
      //以滚动高度
      this.scrollHeight = this.$refs.listMain.scrollHeight
      this.autoScroll()
    },
    stop() {
      clearInterval(this.timeOut)
    },
    keep() {
      if (this.currentOption.seamless) {
        this.seamlessRolling()
      }
    },
    // 单个滚动停止
    sStop() {
      clearInterval(this.singTimeOut)
    },
    //单个滚动继续
    sKeep() {
      if (!this.currentOption.seamless) {
        if (this.currentOption.number >= this.listLength) {
          this.$refs.listMain.children[1].style.display = 'none'
        } else {
          this.singleRolling(this.goFirst)
        }
      }
    },
    //自动定时
    autoScroll() {
      if (this.currentOption.seamless) {
        this.seamlessRolling()
      } else {
        // console.log(this.currentOption.number,this.listLength)
        if (this.currentOption.number >= this.listLength) {
          this.$refs.listMain.children[1].style.display = 'none'
        } else {
          this.singleRolling(this.goFirst)
        }
      }
    },
    //无缝滚动方法
    seamlessRolling() {
      clearInterval(this.timeOut)
      // eslint-disable-next-line no-unused-vars
      const distant = this.scrollHeight - this.containerHeight
      const interval = (this.interval + this.offsetHeight) / 20
      this.timeOut = setInterval(() => {
        // if(this.$refs.listMain.scrollTop){
        this.scrollTop = 0
        this.scrollTop = Math.ceil(this.$refs.listMain.scrollTop)
        if (this.scrollHeight > this.scrollTop + this.containerHeight) {
          this.$refs.listMain.scrollTop = this.scrollTop + interval
        } else {
          this.scrollTop = 0
          this.$refs.listMain.scrollTop = this.scrollTop
        }
        // }
      }, this.currentOption.duration / 30)
    },
    //单个滚动方法
    singleRolling(goFirst) {
      this.singTimeOut = setInterval(() => {
        const s = goFirst(this.singleIndex)
        if (this.singleIndex <= this.listLength && s) {
          this.$refs.listMain.children[0].style.transition =
            'transform 1s ease'
          this.$refs.listMain.children[1].style.transition =
            'transform 1s ease'
          this.$refs.listMain.children[0].style.transform = `translate3d(0,${
            -this.singleIndex * this.offsetHeight
          }px,0)`
          this.$refs.listMain.children[0].style.backfaceVisibility = 'hidden'
          this.$refs.listMain.children[1].style.transform = `translate3d(0,${
            -this.singleIndex * this.offsetHeight
          }px,0)`
          this.$refs.listMain.children[1].style.backfaceVisibility = 'hidden'
          this.singleIndex = this.singleIndex + 1
          goFirst(this.singleIndex)
        }
      }, this.currentOption.duration)
    },
    goFirst(data) {
      if (data > this.listLength) {
        setTimeout(() => {
          this.$refs.listMain.children[0].style.transition = 'none'
          this.$refs.listMain.children[1].style.transition = 'none'
          this.$refs.listMain.children[0].style.transform = `translate3d(0,0,0)`
          this.$refs.listMain.children[1].style.transform = `translate3d(0,0,0)`
          this.singleIndex = 1
        }, 800)
      }
      // this.singleRolling(this.add());
      return true
    },
  },
}
</script>

<style lang='scss' scoped>
.llgtfoo-list-scroll {
  .llgtfoo-list-main {
    // height: 300px;
    overflow: hidden;
    position: relative;
    overflow: auto;
    &::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 0px; /*高宽分别对应横竖滚动条的尺寸*/
    }
    transition: height 0.5s linear;
  }
}
</style>
