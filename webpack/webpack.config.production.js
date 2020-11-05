/**
 *
 * @file webpack.production.js
 * @author Jérémy Levron <jeremylevron@19h47.fr> (http://19h47.fr)
 */

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');

const glob = require('glob'); // eslint-disable-line import/no-extraneous-dependencies
const resolve = require('./webpack.utils');

const safelist = () => ({
	standard: [/^is-/, /^has/, /^c-/, /^wc-/],
	deep: [/^is-/, /^has/, /^c-/, /^flickity-/, /^wc-/],
	greedy: [
		/^is/,
		/^has/,
		/^c/,
		/^js/,
		/Archive-room/,
		/Front-page/,
		/Archive-room/,
		/Archive-offer/,
		/Page-bookings/,
		/Page-hours-and-prices/,
		/Hero/,
		/Navigation/,
		/line/,
		/Menu/,
		/Product-list-widget/,
	],
});

module.exports = {
	mode: 'production',
	devtool: false,
	watch: false,
	module: {
		rules: [
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '../',
						},
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: false,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: false,
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sassOptions: {
								sourceMap: false,
								precision: 10,
							},
						},
					},
				],
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: [resolve('dist'), resolve('docs')],
		}),
		new MiniCssExtractPlugin({
			filename: 'css/main.[chunkhash:8].css',
		}),
		new CompressionPlugin(),
		new PurgecssPlugin({
			paths: glob.sync(resolve('views/**/*.twig'), { nodir: true }),
			safelist,
		}),
	],
};
