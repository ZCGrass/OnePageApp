const path = require('path');
const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const config = require('../conf/dev');


const BUILD_PATH = path.resolve(__dirname, '../dist');
const openPage = 'sys/portal.html';
const options = {
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
};
const server = new WebpackDevServer(webpack(config), options);
server.listen(8081, 'localhost', () => { });
server.hot = true;
// var config = require("./webpack.config.js");
// config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/", "webpack/hot/dev-server");
// var compiler = webpack(config);
// var server = new webpackDevServer(compiler, {
//   hot: true
//   ...
// });
// server.listen(8080);
