const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FlowStatusWebpackPlugin = require('flow-status-webpack-plugin');

module.exports = {
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
    extensions: ['', '.js', '.jsx', '.ejs']
  },

  // Plugins
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      hash: true
    }),
    new FlowStatusWebpackPlugin({ failOnError: true })
  ],

  // General configuration
  debug: true,
  devtool: 'cheap-eval-source-map'
};
