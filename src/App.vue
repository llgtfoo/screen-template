<template>
  <div style="height:100%;width:100%" v-auto-scale="{width: 1920, height: 1080}">
    <div class="wrapper">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {},
  methods: {},
}
</script>

<style lang="scss">
.wrapper {
  height: 100%;
  width: 100%;
}
</style>
