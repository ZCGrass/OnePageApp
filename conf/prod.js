// const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const StringReplacePlugin = require('string-replace-webpack-plugin');
const baseConfig = require('./base.js');

// const SRC_PATH = path.resolve(__dirname, '../src');
// const BUILD_PATH = path.resolve(__dirname, '../dist');


module.exports = merge(baseConfig, {
  plugins: [
    // an instance of the plugin must be present
    new StringReplacePlugin(),
    new webpack.DefinePlugin({
      'process.env.MODE_ENV': JSON.stringify('production'),
      'process.env.ServiceBaseApi': '"http://10.0.0.30:82"',
    }),
    // new HtmlWebpackPlugin({
    //   template: path.resolve(SRC_PATH, 'index.html'),
    //   // template: `${__dirname}/src/entry.ejs`,
    //   // filename: path.resolve(BUILD_PATH, 'index.html'),
    //   // minify: {
    //   //   collapseWhitespace: true,
    //   // },
    //   // hash: true,
    // }),
    new UglifyJSPlugin({
      sourceMap: true,
    }),
  ],
});
