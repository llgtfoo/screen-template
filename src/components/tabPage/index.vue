/**
 * @name:tab自动翻页组件
 * @param {type}
 */
<template>
  <div class="tab-page" @mouseenter="pause" @mouseleave="start">
    <div
      class="prev-page"
      v-if="currentOption.button"
      @click="prev"
    >
      <span
      src="./img/left.png"
      alt
      :style="imgStyle"
      :class="{doClick:prevShow}" />
    </div>
    <div class="page-content" :style="contentStyle">
      <div :style="{transform:`translateX(${transNum}px)`,transition:'all .5s linear'}">
        <slot></slot>
      </div>
    </div>
    <div
      class="back-page"
      v-if="currentOption.button"
      @click="back"
    >
      <span
      src="./img/right.png"
      alt
      :style="imgStyle"
      :class="{doClick:backShow}" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabPage',
  props: {
    data: {
      type: [Array, Object],
    },
    option: {
      type: Object,
      default: () => ({
        number: 5, //默认五个
        button: true, //按钮
        single: false,
        autoScroll: false,
        autoScrollTime: 3000,
      }),
    },
  },
  data() {
    return {
      prevShow: true,
      backShow: false,
      clickNum: 0, //有效点击次数
      transNum: 0, //移动距离,
      totalNumber: 0, //显示几个
      containerWidth: 0, //外层容器的宽度
      containerHeight: 0, //外层容器的高度
      finalInterval: 0, //最后一个margin
      interval: 0, //间隔,
      timeOut: null,
      goLeft: true, //向左滚
      goRight: false, //向右滚
    }
  },
  computed: {
    //没传的props值自动默认
    currentOption() {
      let number = 5
      // let interval = 0;
      let single = false
      let autoScroll = true
      let autoScrollTime = 5000
      let button = true
      if (this.option.hasOwnProperty('number')) {
        // eslint-disable-next-line prefer-destructuring
        number = this.option.number
      }
      if (this.option.hasOwnProperty('single')) {
        // eslint-disable-next-line prefer-destructuring
        single = this.option.single
      }
      if (this.option.hasOwnProperty('autoScroll')) {
        // eslint-disable-next-line prefer-destructuring
        autoScroll = this.option.autoScroll
      }
      if (this.option.hasOwnProperty('autoScrollTime')) {
        // eslint-disable-next-line prefer-destructuring
        autoScrollTime = this.option.autoScrollTime
      }
      if (this.option.hasOwnProperty('button')) {
        if (this.option.hasOwnProperty('autoScroll') && !autoScroll) {
          button = true
        } else {
          // eslint-disable-next-line prefer-destructuring
          button = this.option.button
        }
      }
      return {
        button,
        number,
        single,
        autoScroll,
        autoScrollTime,
      }
    },
    //容器大小
    contentStyle() {
      return {
        width: `${((this.containerWidth + this.finalInterval) /
          this.totalNumber) *
          this.currentOption.number -
          this.interval}px`,
        height: `${this.containerHeight}px`,
      }
    },
    //自动计算左右翻页按钮的大小
    imgStyle() {
      return {
        width: `${this.containerHeight / 2}px`,
        height: `${this.containerHeight / 2}px`,
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
    this.init()
  },
  destroyed() {
    clearInterval(this.timeOut)
  },
  methods: {
    init() {
      clearInterval(this.timeOut)
      this.$nextTick(() => {
        this.totalNumber = this.$slots.default[0].children.length
        this.containerWidth = this.$slots.default[0].elm.offsetWidth
        this.containerHeight = this.$slots.default[0].elm.offsetHeight
        if (this.$slots.default[0].children.length <= 1) {
          return
        }
        this.interval =
          parseFloat(
            window.getComputedStyle(this.$slots.default[0].children[1].elm)
              .marginLeft
          ) +
          parseFloat(
            window.getComputedStyle(this.$slots.default[0].children[1].elm)
              .marginRight
          )
        this.finalInterval =
          this.interval === 0 ?
            0 :
            parseFloat(
              window.getComputedStyle(
                this.$slots.default[0].children[this.totalNumber - 1].elm
              ).marginRight
            ) === 0 ?
              15 :
              0
        // console.log(this.currentOption.autoScroll);
        if (this.currentOption.autoScroll) {
          this.autoPage()
        }
      })
    },
    //鼠标移入停止自动翻页
    pause() {
      clearInterval(this.timeOut)
    },
    //鼠标移开继续自动翻页
    start() {
      if (this.currentOption.autoScroll) {
        this.autoPage()
      }
    },
    //自动翻页
    autoPage() {
      clearInterval(this.timeOut)
      // console.log(1)
      this.timeOut = setInterval(() => {
        // console.log(this.transNum)
        if (this.goLeft) {
          this.back()
        } else {
          this.prev()
        }
      }, this.currentOption.autoScrollTime)
    },
    //向前翻页
    prev() {
      if (!this.currentOption.single) {
        if (this.clickNum !== 0) {
          this.goLeft = false
          this.backShow = false
          this.clickNum = this.clickNum - 1
          this.transNum = -(
            Math.abs(this.transNum) -
            ((this.containerWidth + this.finalInterval) / this.totalNumber) *
              this.currentOption.number
          )
          if (this.clickNum === 0) {
            this.clickNum = 0
            this.prevShow = true
            this.goLeft = true
          }
        } else {
          this.clickNum = 0
          this.prevShow = true
          this.goLeft = true
        }
      } else {
        if (this.totalNumber === this.currentOption.number) {
          return
        }
        if (this.clickNum !== 0) {
          this.goLeft = false
          this.backShow = false
          this.clickNum = this.clickNum - 1
          this.transNum =
            -((this.containerWidth + this.finalInterval) / this.totalNumber) *
            this.clickNum
        }
        if (this.clickNum === 0) {
          this.backShow = false
          this.prevShow = true
          this.goLeft = true
        }
      }
    },
    //向后翻页
    back() {
      if (!this.currentOption.single) {
        const fg = Math.ceil(
          (this.data.length * (this.containerWidth / this.totalNumber)) /
            ((this.containerWidth / this.totalNumber) *
              this.currentOption.number)
        )
        if (this.clickNum + 1 < fg) {
          this.prevShow = false
          this.transNum =
            -(
              ((this.containerWidth + this.finalInterval) / this.totalNumber) *
              this.currentOption.number
            ) *
            (this.clickNum + 1)
          this.goLeft = true
          this.clickNum = this.clickNum + 1
          if (this.clickNum + 1 === fg) {
            this.backShow = true
            this.goLeft = false
          }
        }
      } else {
        if (this.totalNumber === this.currentOption.number) {
          return
        }
        if (this.clickNum < this.totalNumber - this.currentOption.number) {
          // console.log(this.clickNum);
          this.clickNum = this.clickNum + 1
          this.transNum =
            -((this.containerWidth + this.finalInterval) / this.totalNumber) *
            this.clickNum
          this.prevShow = false
          this.goLeft = true
        }
        if (this.clickNum === this.totalNumber - this.currentOption.number) {
          this.backShow = true
          this.prevShow = false
          this.goLeft = false
        }
      }
    },
  },
}
</script>

<style lang='scss' scoped>
.tab-page {
  display: flex;
  align-items: center;
  .prev-page,
  .back-page {
    // background: #ccc;
    z-index: 1;
    span {
      z-index: 5;
      // margin:5px;
      display: inline-block;
      cursor: pointer;
      // background: #ccc;
      &.doClick {
        cursor: not-allowed;
      }
    }
  }
  .back-page {
    > span {
      background: url("./img/right.png") no-repeat;
      background-size: 100% 100%;
    }
  }
  .prev-page {
    > span {
      background: url("./img/left.png") no-repeat;
      background-size: 100% 100%;
    }
  }
  .page-content {
    margin: 0 20px;
    position: relative;
    overflow: hidden;
    > div {
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}
</style>