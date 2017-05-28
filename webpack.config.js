const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LessPluginAutoPrefix = require('less-plugin-autoprefix');

module.exports = {
  entry: './src/app.js',

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {
            loader: 'less-loader',
            options: { plugins: [ new LessPluginAutoPrefix({ browsers: [ "last 2 versions" ] }) ] }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ejs', '.less'],
    alias: {
      components: path.resolve('./src/components'),
      lib: path.resolve('./src/lib'),
      types: path.resolve('./src/types'),
      reducers: path.resolve('./src/reducers'),
      styles: path.resolve('./src/styles'),
      middleware: path.resolve('./src/middleware')
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
