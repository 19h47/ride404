/**
 *
 * @file webpack.config.common.js
 * @author Jérémy Levron <jeremylevron@19h47.fr> (http://19h47.fr)
 */

const webpack = require('webpack');

// Plugins
const ManifestPlugin = require('webpack-manifest-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const dotenv = require('dotenv');

const resolve = require('./webpack.utils');

dotenv.config({ path: resolve('.env') });

// Manifest plugin
const manifestPlugin = new ManifestPlugin({
	publicPath: 'dist/',
});

module.exports = {
	output: {
		publicPath: process.env.PUBLIC_PATH,
	},
	devServer: {
		contentBase: resolve('/'),
		compress: true,
		port: 3000,
		inline: true,
		disableHostCheck: true,
		writeToDisk: true,
	},
	externals: {
		jquery: 'jQuery',
	},
	resolve: {
		alias: {
			'@': resolve('src'),

			// scripts
			scripts: resolve('src/scripts'),
			common: resolve('src/scripts/common'),
			pages: resolve('src/scripts/pages'),
			transitions: resolve('src/scripts/transitions'),
			factories: resolve('src/scripts/factories'),
			services: resolve('src/scripts/services'),
			utils: resolve('src/scripts/utils'),
			blocks: resolve('src/scripts/blocks'),
			polyfills: resolve('src/scripts/polyfills'),
			abstracts: resolve('src/scripts/abstracts'),
			vendors: resolve('src/scripts/vendors'),
			videos: resolve('src/videos'),

			// stylesheets
			stylesheets: resolve('src/stylesheets'),

			// img
			jpg: resolve('src/img/jpg'),
			png: resolve('src/img/png'),
			svg: resolve('src/img/svg'),
			icons: resolve('src/icons'),
		},
	},
	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.js$/,
				exclude: [/node_modules/, /vendors/],
				loader: 'eslint-loader',
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
			{
				test: /\.(woff2?|eot|ttf|otf|woff|svg)?$/,
				exclude: [/img/, /icons/],
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'fonts/',
							publicPath: '../fonts/',
						},
					},
				],
			},
			{
				test: /\.svg$/,
				exclude: [/img/, /fonts/],
				use: [
					{
						loader: 'svg-sprite-loader',
						options: {
							spriteFilename: 'icons.svg',
							extract: true,
						},
					},
					'svg-transform-loader',
					'svgo-loader',
				],
			},
			{
				test: /\.svg$/,
				exclude: [/fonts/, /icons/],
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: 'img/svg',
							name: '[name].[ext]',
						},
					},
					{
						loader: 'svgo-loader',
						options: {
							plugins: [
								{
									removeTitle: true,
								},
								{
									convertColors: {
										shorthex: false,
									},
								},
								{
									convertPathData: false,
								},
							],
						},
					},
				],
			},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac|ogv)(\?.*)?$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 100000,
							name: '[name].[ext]',
							publicPath: resolve('src/videos'),
							outputPath: 'videos/',
						},
					},
				],
			},
			{
				test: /\.(gif|png|jpe?g)$/i,
				exclude: [/animations/],
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: 'img/',
							name: '[ext]/[name].[ext]',
							// publicPath: '../img/',
						},
					},
					{
						loader: 'image-webpack-loader',
						options: {
							mozjpeg: {
								progressive: true,
								quality: [65],
							},
							optipng: {
								enabled: false,
							},
							pngquant: {
								quality: [0.65, 0.9],
								speed: 4,
							},
							gifsicle: {
								interlaced: false,
							},
						},
					},
				],
			},
		],
	},
	plugins: [
		manifestPlugin,
		new SpriteLoaderPlugin({ plainSprite: true }),
		new WebpackNotifierPlugin({
			title: 'Webpack',
			excludeWarnings: true,
			alwaysNotify: true,
		}),
		new webpack.DefinePlugin({
			'process.env': dotenv.parsed,
		}),
	],
};
