const path = require('path')
const poststylus = require('poststylus')
const pxtorem = require('postcss-pxtorem')
process.env.VUE_APP_VERSION = require('./package.json').version
console.log(process.env.VUE_APP_VERSION)
const CopyWebpackPlugin = require("copy-webpack-plugin")

const resolve = file => path.resolve(__dirname, file)
module.exports = {
  //默认'/'，部署应用包时的基本 URL  history 本地使用默认值 '/'
  //注：在本地一定要用 '/'，否则二级路由刷新找不到js路径
  //IS_PROD是判断是否为现上环境，可自行配置，process.env.VUE_APP_SRC为线上环境的某个路径。
  publicPath: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_SRC : '/',
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
    },
    payAmount: {
      entry: 'src/payAmount/payAmount.main.js',
      filename: './scenefront/index.html'
    }
  },
  devServer: {
    // proxy: 'http://127.0.0.1:8989'
    proxy: 'http://127.0.0.1:8080',
  },
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin({
        patterns: [{
          from: "./static",
          to: 'static'
        }]
      })
    ]
  },
  css: {
    loaderOptions: {
      stylus: {
        use: [
          poststylus([
            pxtorem({
              rootValue: 100,
              propWhiteList: [],
              minPixelValue: 2
            }),
            'autoprefixer'
          ])
        ],
        import: [
          resolve('./src/assets/theme.custom')
        ]
      },
      postcss: {
        plugins: [
          require('postcss-pxtorem')({
            rootValue: 100,
            propWhiteList: [],
            minPixelValue: 2
          }),
          require('autoprefixer')()
        ]
      }
    }
  },
  transpileDependencies: [
    'mand-mobile'
  ]

}