module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule("gltf")
      .test(/\.(gltf)$/)
      .use("gltf-webpack-loader")
      .loader("gltf-webpack-loader")
      .end();

    config.module
      .rule("url-loader")
      .test(/\.(png|cur|woff|woff2|eot|ttf|svg)$/)
      .use("url-loader?importLoaders=1&limit=100000")
      .loader("url-loader?importLoaders=1&limit=100000")
      .end();

    config.module
      .rule("file-loader")
      .test(/\.(png|cur|woff|woff2|eot|ttf|svg)$/)
      .use("file-loader?importLoaders=1&limit=100000")
      .loader("file-loader?importLoaders=1&limit=100000")
      .end();

    config.module
      .rule("...")
      .test(/\...$/)
      .use("eslint-loader")
      .loader("eslint-loader")
      .end();
  },
};
// module.exports = {
//   css: {
//     loaderOptions: {
//       scss: {
//         prependData: `
//           @import "~@/main.scss";
//         `,
//       },
//     },
//   },
// };
