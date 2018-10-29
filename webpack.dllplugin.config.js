const path = require('path');
const webpack = require('webpack');

const BUILD_PATH = path.resolve(__dirname, 'dist');

module.exports = {
  entry: {
    vendor: ['react', 'react-dom', 'antd', 'lodash', 'echarts'],
  },
  output: {
    path: BUILD_PATH,
    filename: '[name].dll.js',
    library: '[name]_library',
    sourceMapFilename: '[name].map',
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(BUILD_PATH, '[name]-manifest.json'),
      name: '[name]_library',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
