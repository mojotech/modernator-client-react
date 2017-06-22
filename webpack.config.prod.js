const webpack = require('webpack');
const R = require('ramda');
const baseConfig = require('./webpack.config');
const path = require('path');
require('dotenv').config();

module.exports = R.merge(baseConfig, {
  output: {
    path: path.resolve('./bin/dist'),
    filename: 'app.bundle.prod.js'
  },
  plugins: baseConfig.plugins.concat(
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("production"),
        "API_PATH": JSON.stringify(process.env.API_PATH),
        "WS_PATH": JSON.stringify(process.env.WS_PATH)
      }
    })
  )
});
