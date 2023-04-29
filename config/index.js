"use strict";
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require("path");
// const targetUrl = 'http://192.168.0.113:8403'
/*james*/
//const targetUrl = 'http://192.168.0.66:182'
// const targetUrl = 'http://192.168.0.5:182'
// const targetUrl = 'http://192.168.0.12:182'
// const targetUrl = 'http://192.168.0.173:182'
// const targetUrl = 'http://192.168.0.173:192'
 //const targetUrl = 'http://192.168.0.173:192'//shawn
 //const targetUrl = 'http://192.168.0.100'//shawn
 //const targetUrl = 'http://52.220.132.253:8402' //常用地址
  const targetUrl = 'http://vkpcapi.mibogame.com' //常用地址
  //const targetUrl = 'http://192.168.0.146:100' //franci
  //const targetUrl = 'http://192.168.0.119:191'//kent
// const targetUrl = 'http://192.168.0.106:195' //aec电脑
// const targetUrl = 'http://192.168.0.119:220' // Caden电脑


module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: "pc_static",
    assetsPublicPath: "/",
    proxyTable: {
      "/api": {
        target: targetUrl,
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      },
      "/static/img": {
        target: targetUrl,
        changeOrigin: true
      },
      "/uploads": {
        target: targetUrl,
        changeOrigin: true
      },
      // 资讯图片
      "/ueditor": {
        target: targetUrl,
        changeOrigin: true
      },
      '/static/video': {
        target: targetUrl,
        changeOrigin: true,
      },
    },

    // Various Dev Server settings
    host: serverPrivate(), // can be overwritten by process.env.HOST
    port: 8081, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: "cheap-module-eval-source-map",

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, "../dist/index.html"),

    // Paths
    assetsRoot: path.resolve(__dirname, "../dist"),
    assetsSubDirectory: "pc_static",
    assetsPublicPath: "/",

    /**
     * Source Maps
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: "#source-map",

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: true,
    productionGzipExtensions: ["js", "css", "ttf", "png", "mp4"],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
};

/**
 * host名称
 * @return {string}
 */
function serverPrivate() {
  if (process.env.npm_lifecycle_event === "dev:private") {
      return "localhost"
  }
  return "0.0.0.0"
}
