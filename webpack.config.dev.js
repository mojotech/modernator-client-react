const webpack = require('webpack');
const baseConfig = require('./webpack.config');
const R = require('ramda');

module.exports = R.merge(baseConfig, {
  entry: './src/app.js',
  output: {
    path: './bin',
    filename: 'app.bundle.js'
  },

  // Dev server configuration
  devServer: {
    hot: true,
    inline: true,
    host: 'localhost',
    port: 3000,
    contentBase: './src'
  },

  // Plugins
  plugins: baseConfig.plugins.concat(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({ debug: true })
  ),

  // General configuration
  devtool: 'eval'
});
