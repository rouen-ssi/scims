const NODE_ENV = process.env.NODE_ENV || 'development'

var config = refineConfig(require('./config/' + NODE_ENV + '.json'))
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var UnusedFilesWebpackPlugin = require('unused-files-webpack-plugin')['default']

module.exports = {
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style', 'css!sass'),
    }, {
      test: /\.(eot|svg|ttf|woff2?).*$/,
      loader: 'url?limit=10000',
    }],
  },
  plugins: [
    new ExtractTextPlugin('bundle.[hash].css'),
    new HtmlWebpackPlugin({
      title: 'SciMS - Le CMS pour les scientifiques',
    }),
    new webpack.IgnorePlugin(/unicode|locale/),
    new webpack.DefinePlugin(Object.assign({}, config, {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    })),
    new UnusedFilesWebpackPlugin({
      pattern: 'src/**/*.*',
    }),
  ],
  entry: ['whatwg-fetch', 'babel-polyfill', './src/index.js', './src/scss/scims.scss'],
  output: {
    path: './build',
    filename: 'bundle.[hash].js',
    publicPath: '/',
  },
  devServer: {
    inline: true,
    stats: {
      chunks: false,
    },
  },
}

function refineConfig(config) {
  const result = {}
  for (const key in config) {
    result[key] = JSON.stringify(config[key])
  }
  return result
}
