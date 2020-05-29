const path = require('path');
const ReactLoadableSSRAddon = require('react-loadable-ssr-addon');

module.exports = {
	target: 'web',
	entry: './src/index.jsx',
	output: {
		filename: 'client_bundle.js',
		chunkFilename: '[name].bundle.js',
		path: path.resolve(__dirname, 'build/public'),
		publicPath: '/build/public',
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				exclude: '/node-modules/',
				options: {
					presets: [
						'@babel/preset-react',
						'@babel/preset-env',
					],
					plugins: [
						'@babel/plugin-syntax-dynamic-import',
						'react-loadable/babel',
					],
				},
			},
		],
	},
	resolve: {
		extensions: ['.js', '.jsx', '.json'],
	},
	plugins: [
		new ReactLoadableSSRAddon({
			filename: 'react-loadable-ssr-addon.json',
		}),
	],
};
