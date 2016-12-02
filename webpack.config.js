const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/app.js',

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.ejs'],
    alias: {
      components: path.resolve('./src/components'),
      lib: path.resolve('./src/lib'),
      types: path.resolve('./src/types'),
      reducers: path.resolve('./src/reducers')
    }
  },

  // Plugins
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      hash: true
    })
  ]
};
