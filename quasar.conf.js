module.exports = function(ctx) {
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    boot: ['aof'],
    css: ['app.styl'],
    vendor: {
      remove: ['axios']
    },

    extras: [
      //'roboto-font',
      'material-icons' // optional, you are not bound to it
      // 'ionicons-v4',
      //"mdi-v3"
      //"fontawesome-v5"
      //"themify"
    ],

    framework: {
      all: true
    },

    supportIE: false,

    build: {
      scopeHoisting: true,
      env: {
        DEV: process.env.DEV,
        AOTF_DEV_SERVER: JSON.stringify(process.env.AOTF_DEV_SERVER)
      },
      vueRouterMode: 'history',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack(cfg) {
        cfg.module.rules.push({
          test: /\.pug$/,
          loader: 'pug-plain-loader'
        })
        //cfg.module.rules.push({
        //  enforce: 'pre',
        //  test: /\.(js|vue)$/,
        //  loader: 'eslint-loader',
        //  exclude: /node_modules/
        //})
      }
    },

    devServer: {
      // https: true,
      // port: 8080,
      //open: true // opens browser window automatically
    },

    animations: ['tada'],

    ssr: {
      pwa: false
    }
  }
}
