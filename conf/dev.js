const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./base.js');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const packageJson = require('../package.json');
const BUILD_PATH = path.resolve(__dirname, '../dist');
const SRC_PATH = path.resolve(__dirname, '../src');
const pagesPath = glob.sync(`${SRC_PATH}/*/*`);

// 单页面开发
// const app = 'sys';
const { app, page, openPage } = packageJson;
// const openPage = `sys/${page}.html`;

baseConfig.output.path = BUILD_PATH;
const entry = {};

for (const f of pagesPath) {
  const pageName = f.substr(f.lastIndexOf('/') + 1, f.length - f.lastIndexOf('/'));
  const appPath = f.substr(0, f.lastIndexOf('/'));
  const appName = appPath.substr(appPath.lastIndexOf('/') + 1, appPath.length - appPath.lastIndexOf('/'));
  const pagePath = `${f}/index.jsx`;
  if (appName !== 'common' && app === appName && page === pageName) {
    entry[pageName] = pagePath; // ['webpack/hot/dev-server', pagePath];
      baseConfig.plugins.push(new HtmlWebpackPlugin({
        template: path.join(__dirname, `../src/${appName}/entry.ejs`),
        filename: path.join(BUILD_PATH, `/${appName}/${pageName}.html`),
        title: pageName,
      }));
    break;
  }
}
baseConfig.entry = entry;

module.exports = merge(baseConfig, {
  devtool: 'inline-source-map',
  devServer: {
    port: 8081,
    host: 'localhost',
    historyApiFallback: true,
    noInfo: false,
    stats: 'minimal',
    contentBase: BUILD_PATH, //  --progress --debug --colors --watch
    publicPath: '/',
    hot: true,
    inline: true,
    // compress: true,
    open: true,
    openPage,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.MODE_ENV': JSON.stringify('development'),
      'process.env.ServiceBaseApi': '"http://10.0.0.30:82"', // localhost:54131
    }),
    new webpack.DllReferencePlugin({
      context: BUILD_PATH,
      manifest: path.resolve(BUILD_PATH, 'vendor-manifest.json'),
      //  path: path.resolve(BUILD_PATH, 'vendor.dll.js'),
      //  name: 'vendor_library',
      //  content: 'vendor_library',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/',
          },
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
});
