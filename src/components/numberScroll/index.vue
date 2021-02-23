/**
 * @name: 数字滚动组件
 * @param {type}
 */
 <template>
  <count-to
    :start-val="0"
    :end-val="maxValue"
    :duration="duration"
    :separator="separator"
    :decimals="toFixed"
    :prefix="prefix"
    :suffix="suffix"
    :useEasing="true"
    :autoplay="true"
  ></count-to>
</template>

<script>
import countTo from 'vue-count-to'
export default {
  name: 'NumberScroll',
  components: { countTo },
  props: {
    maxValue: {//最大值
      type: [String, Number],
      default: 2020,
    },
    duration: {//耗时
      type: [String, Number],
      default: 2000,
    },
    separator: {//千位分隔符
      type: [String, Number],
      default: ',',
    },
    toFixed: {//保留小时
      type: [String, Number],
      default: 0,
    },
    prefix: {//前缀
      type: [String, Number],
      default: '',
    },
    suffix: {//后缀
      type: [String, Number],
      default: '',
    },
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
</style>