<template>
  <div class="infomation">
    <date-time v-slot="{data}">{{data.year}} {{data.time}}</date-time>
    <h1>云图模版</h1>
    <h2>已提供组件组件</h2>
    <ul>
      <li>echartsCommon：echart动画组件</li>
      <li>modalPage： 弹窗动画外壳</li>
      <li>
        NotFound/PermissionDenied： 404/403 跳转页面，可在
        <code>views/index.js</code> 做对应配置
      </li>
    </ul>
    <h2>已提供指令</h2>
    <ul>
      <li>auto-scale： 自动缩放组件，更具设计稿分辨率或者实际大屏分辨率做小屏幕自适应，在配合地图使用时，会导致地图的相关操作出现偏移</li>
      <li>drag： 自由拖拽</li>
      <li>water-marker： 水印指令</li>
    </ul>
    <h2>已提供工具方法</h2>
    <ul>
      <li>time: 时间转指定格式字符串方法</li>
      <li>Debounce： 防抖</li>
      <li>Throttle： 节流</li>
      <li>toThousands： 千位分割符</li>
      <li>getUrlQuery： 获取url参数对象</li>
    </ul>
    <h2>请求协议</h2>
    <ul>
      <li>axios：axios原生</li>
      <li>http：axios的get与post封装传参一致{}</li>
    </ul>
    <h2>ui框架</h2>
    <ul>
      <li>ant-design-vue</li>
    </ul>
    <ul />
  </div>
</template>

<script>
export default {
  data() {
    return {
      llo: '99.99%',
    }
  },
  mounted() {},
  methods: {},
}
</script>

<style lang="scss" scoped>
.infomation {
  padding: 20px;
  font-weight: bold;
  font-size: 16px;
}
</style>