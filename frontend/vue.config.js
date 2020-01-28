module.exports = {
  pluginOptions: {
    i18n: {
      locale: "es",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: true
    }
  }
};
module.exports = {
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].template = "src/index.html";
      return args;
    });

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
