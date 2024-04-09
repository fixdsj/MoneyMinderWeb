const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  proxy: '${process.env.VUE_APP_API_URL}',
})
