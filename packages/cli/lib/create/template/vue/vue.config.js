const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const isEnvProduction = process.env.NODE_ENV === 'production'
const resolve = dir => {
  return path.resolve(__dirname, dir)
}
module.exports = {
  productionSourceMap: false,
  runtimeCompiler: true,
  chainWebpack: config => {
    config.output
      .filename(isEnvProduction ? 'static/js/[chunkhash:10].js' : 'static/js/bundle.js')
      .chunkFilename(isEnvProduction ? 'static/js/[chunkhash:8].js' : 'static/js/[name].chunk.js')
      .library('SEAL')
      .libraryTarget('umd')
      .libraryExport('default')
      .umdNamedDefine(true)
      .end()
    config.resolve.alias
      .set('vue$', 'vue/dist/vue.esm.js')
      .set('components', resolve('./src/components'))
      .set('plugins', resolve('./src/plugins'))
      .set('core', resolve('./src/core'))
      .set('modules', resolve('./src/modules'))
      .set('utils', resolve('./src/utils'))
      .set('static', resolve('./src/assets'))
      .set('router', resolve('./src/router'))
      .end()
    config
      .plugin('banner')
      .use(require('webpack/lib/BannerPlugin'), ['学而思小班课'])
      .end()
    config
      .plugin('html')
      .tap(([options]) => [
        Object.assign(options, {
          filename: 'index.html',
          releaseTime: new Date().getTime()
        })
      ])
      .end()
    config
      .plugin('copy')
      .use(CopyWebpackPlugin, [
        [
          {
            from: path.resolve(__dirname, 'public/'),
            to: 'static/',
            ignore: ['.*', '*.html', '*.favicon.ico']
          }
        ]
      ])
      .end()
    config.performance.set('hints', false).end()
  },
  css: {
    requireModuleExtension: true,
    loaderOptions: {
      css: {
        modules: {
          localIdentName: '[local]_[hash:base64:12]'
        }
      },
      // sass: {
      //   prependData: `@import "~static/styles/mixins/mixins";@import "~static/styles/common/var";`
      // }
      scss: {
        // prependData: `@import "~@/assets/styles/mixins/mixins.scss";@import "~@/assets/styles/common/var.scss";`
      }
    }
  },
  devServer: {}
}
