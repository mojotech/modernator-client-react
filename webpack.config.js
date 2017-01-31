const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/app.js',

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ejs', '.less'],
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
