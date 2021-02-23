/* eslint-disable indent */
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  pluginOptions: {
    PROJ_TYPE: 'screen', // 项目类型
  },
  lintOnSave: 'default',
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))// 这样配置后 @ 可以指向 src 目录
    config.module.rule('worker')
      .test(/\.worker\.js$/i)
      .use('worker-loader')
      .loader('worker-loader')
  },
  css: {
    loaderOptions: { // 向 CSS 相关的 loader 传递选项
      less: {
        javascriptEnabled: true,
      },
    },
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'https://www.fastmock.site/mock/a76ff711b33a233cdeac2112d8d909d0/llgtfoo/',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },
  productionSourceMap: false,
}
