const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  devServer: {
    port: 3006, // 替换为您需要的端口号
    open: true, // 启动时自动打开浏览器
    host: 'localhost', // 设置主机名（默认是 localhost）
    // proxy: { // 如果需要配置代理，可以添加此项
    //   '/api': {
    //     target: 'http://localhost:3000', // 后端服务器地址
    //     changeOrigin: true,
    //   },
    // },
  },
  transpileDependencies: true,

})
