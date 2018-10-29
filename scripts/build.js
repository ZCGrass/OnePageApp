const webpack = require('webpack');
const cloneDeep = require('lodash.clonedeep');
const path = require('path');
const glob = require('glob');
const config = require('../conf/prod');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const args = require('minimist')(process.argv.slice(2));

const BUILD_PATH = path.resolve(__dirname, '../dist');
const SRC_PATH = path.resolve(__dirname, '../src');
const pagesPath = glob.sync(`${SRC_PATH}/*/*`);

const configs = [];
if (args.app && args.page) {
  const entry = {};
  const pageName = args.page;
  const appName = args.app;
  entry[pageName] = path.join(__dirname, `../src/${appName}/${pageName}/index.jsx`);
  const configTemp = cloneDeep(config);
  const pageAssetsPath = `${appName}/${pageName}`;
  configTemp.entry = entry;
  configTemp.output.path = path.join(__dirname, `../dist/assets/${appName}/${pageName}/`);
  configTemp.module.rules.push({
    test: /\.(png|svg|jpg|gif)$/,
    use: {
      loader: 'file-loader',
      options: {
        name: '[path][name].[ext]',
        outputPath: `${pageAssetsPath}/images`,
        publicPath: path.join(__dirname, '../dist/assets'),
      },
    },
  });
  configTemp.module.rules.push({
    test: /\.(woff|woff2|eot|ttf|otf)$/,
    use: {
      loader: 'file-loader',
      options: {
        name: '[path][name].[ext]',
        outputPath: `${pageAssetsPath}/fonts`,
        publicPath: path.join(__dirname, '../dist/assets'),
      },
    },
  });
  // configTemp.plugins.push(new HtmlWebpackPlugin({
  //   template: path.join(__dirname, `../src/${appName}/${pageName}/index.html`),
  //   filename: path.join(BUILD_PATH, `/${appName}/${pageName}.html`),
  // }));
  configTemp.plugins.push(new HtmlWebpackPlugin({
    template: path.join(__dirname, `../src/${appName}/entry.ejs`),
    filename: path.join(BUILD_PATH, `/${appName}/${pageName}.html`),
    title: pageName,
  }));
  configs.push(configTemp);
} else {
  for (const f of pagesPath) {
    const entry = {};
    const pageName = f.substr(f.lastIndexOf('/') + 1, f.length - f.lastIndexOf('/'));
    const appPath = f.substr(0, f.lastIndexOf('/'));
    const appName = appPath.substr(appPath.lastIndexOf('/') + 1, appPath.length - appPath.lastIndexOf('/'));
    const pagePath = `${f}/index.jsx`;
    if (appName !== 'common') {
      entry[pageName] = pagePath;
      const configTemp = cloneDeep(config);
      // const pageAssetsPath = `assets/${appName}/${pageName}`;
      configTemp.entry = entry;
      configTemp.output.path = path.join(__dirname, `../dist/assets/${appName}/${pageName}/`);
      configTemp.module.rules.push({
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: '/assets/images/',
          },
        },
      });
      configTemp.module.rules.push({
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
          },
        },
      });
      configTemp.plugins.push(new HtmlWebpackPlugin({
        template: path.join(__dirname, `../src/${appName}/entry.ejs`),
        filename: path.join(BUILD_PATH, `/${appName}/${pageName}.html`),
        title: pageName,
      }));
      configs.push(configTemp);
    }
  }
}

// console.log(JSON.stringify(configs[1]));


webpack(configs, (err, stats) => {
  if (err || stats.hasErrors()) {
    // 在这里处理错误
    console.log(err);
  }
});
