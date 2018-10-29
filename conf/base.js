const path = require('path');
// const glob = require('glob');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const EncodingPlugin = require('webpack-encoding-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const args = require('minimist')(process.argv.slice(2));
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('../package.json');

const BUILD_PATH = path.resolve(__dirname, '../dist');
const { version } = config;

// let pageName = 'portal';
// let appName = 'sys';
// if (args.page) {
//   pageName = args.page;
// }
// if (args.app) {
//   appName = args.appName;
// }
// const SRC_PATH = path.resolve(__dirname, '../src');
// const pagesPath = glob.sync(`${SRC_PATH}/*/*`);
// const entries = {};

// pagesPath.forEach((f) => {
//   const pageNameTemp = f.substr(f.lastIndexOf('/') + 1, f.length - f.lastIndexOf('/'));
//   const appPath = f.substr(0, f.lastIndexOf('/'));
//   const appNameTemp = appPath.substr(appPath.lastIndexOf('/') + 1, appPath.length - appPath.lastIndexOf('/'));
//   const pagePath = `${f}/index.jsx`;
//   if (pageName === pageNameTemp && appName === appNameTemp && appNameTemp !== 'common') {
//     entries[pageName] = pagePath;
//   }
// });

const webpackConfig = {
  // entry: entries,
  output: {
    // path: path.resolve(__dirname, `../dist/assets/${appName}/${pageName}/`),
    filename: `[name].${version}.min.js`,
    sourceMapFilename: '[name].map',
    // publicPath: path.join(BUILD_PATH, `/${appName}/${pageName}/`),
    // publicPath: '/sys',
  },
  plugins: [
    new CleanWebpackPlugin([BUILD_PATH]),
    new EncodingPlugin({
      encoding: 'utf-8',
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   filename: `vendor.${version}.min.js`,
    // }),
    new ExtractTextPlugin({
      filename: `[name].${version}.min.css`,
      allChunks: true,
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../src/common/assets/fonts'),
        to: path.resolve(__dirname, '../dist/assets/common/fonts/'),
      },
    ]),
  ],
  // eslint: {
  //   fix: true,
  //   configFile: path.resolve(__dirname, '../.eslintrc')
  // },
  module: {
    rules: [{
      test: /\.(css|scss)$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'sass-loader'],
      }),
    },
    // {
    //   test: /\.scss$/,
    //   use: ExtractTextPlugin.extract({
    //     fallback: 'style-loader',
    //     use: ['css-loader', 'sass-loader'],
    //   }),
    // },
    {
      test: /\.json$/,
      use: [
        'json-loader',
      ],
    },
    {
      test: /\.jsx?$/,
      enforce: 'pre',
      exclude: /node_modules/,
      use: {
        loader: 'eslint-loader',
        options: {
          emitError: true,
        },
      },
    },
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: ['babel-loader'],
      // use: {
      //   loader: 'babel-loader',
      //   options: {
      //     presets: ['env']
      //   }
      // }
    },
    {
      test: /\.ejs?$/,
      exclude: /node_modules/,
      use: ['ejs-loader'],
    },
      // {
      //   test: /\.(css|scss)?$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: 'string-replace-loader',
      //     query: {
      //       search: 'https://at.alicdn.com/t/',
      //       replace: '../common/fonts/',
      //     },
      //   },
      // },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss', '.woff', '.woff2', '.eot', '.ttf', '.otf', '.jpg', '.png', '.svg', '.gif'],
  },
};


// pagesPath.forEach((f) => {
//   const pageNameTemp = f.substr(f.lastIndexOf('/') + 1, f.length - f.lastIndexOf('/'));
//   const appPath = f.substr(0, f.lastIndexOf('/'));
//   const appNameTemp = appPath.substr(appPath.lastIndexOf('/') + 1, appPath.length - appPath.lastIndexOf('/'));
//   if (pageName === pageNameTemp && appName === appNameTemp && appNameTemp !== 'common') {
//     webpackConfig.plugins.push(
//       new HtmlWebpackPlugin({
//         template: path.join(f, '/index.html'),
//         filename: path.join(BUILD_PATH, `/${appNameTemp}/${pageNameTemp}.html`),
//       }));
//   }
// });
module.exports = webpackConfig;
