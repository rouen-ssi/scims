var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: 'babel'
		}, {
			test: /\.scss$/,
			loader: ExtractTextPlugin.extract(
				'style',
				'css!sass'
			)
		}]
	},
	plugins: [
		new ExtractTextPlugin('bundle.[hash].css'),
		new HtmlWebpackPlugin({
			title: 'SciMS - Le CMS pour les scientifiques'
		})
	],
	entry: './src/index.js',
	output: {
		path: './build',
		filename: 'bundle.[hash].js'
	}
 }
