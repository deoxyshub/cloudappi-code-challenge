// const path = require("path");
// const CopyWebpackPlugin = require("copy-webpack-plugin");
const { GenerateSW } = require("workbox-webpack-plugin");

module.exports = {
  configureWebpack: {
    //publicPath: process.env.NODE_ENV === "development" ? "/{subdirectory-name}/" : "",
    plugins: [
      // new CopyWebpackPlugin([
      //   {
      //     from: path.resolve("src/assets/pwa"),
      //     to: path.resolve("dist/img"),
      //     toType: "dir"
      //   }
      // ]),
      new GenerateSW()
    ]
  },
  chainWebpack: config => {
    // config.plugin("html").tap(args => {
    //   args[0].template = "src/index.html";
    //   return args;
    // });

    //config.module.rule("css").exclude.add(/node_modules/);

    config.performance.maxEntrypointSize(512000).maxAssetSize(512000);
  },
  pluginOptions: {
    i18n: {
      locale: "es",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: true
    }
  }
};
