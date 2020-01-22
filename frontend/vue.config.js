const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin([
        {
          from: path.resolve("src/assets/pwa"),
          to: path.resolve("dist/img"),
          toType: "dir"
        }
      ])
    ]
  },
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].template = "src/index.html";
      return args;
    });

    config.performance.maxEntrypointSize(512000).maxAssetSize(512000);
  },

  pwa: {
    name: "CloudAppi ::: Code Challenge",
    short_name: "cloudappi-code-challenge",
    theme_color: "#4DBA87",
    manifestOptions: {
      icons: [
        {
          src: "./img/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "./img/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png"
        }
      ]
    },
    iconPaths: {
      favicon32: "./img/favicon-32x32.png",
      favicon16: "./img/favicon-16x16.png",
      appleTouchIcon: "./img/apple-touch-icon-152x152.png",
      maskIcon: "./img/safari-pinned-tab.svg",
      msTileImage: "./img/msapplication-icon-144x144.png"
    },
    start_url: ".",
    display: "standalone",
    background_color: "#000000"
  }
};
