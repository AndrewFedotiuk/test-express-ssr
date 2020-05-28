const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');

module.exports = {
	target: 'node',
	entry: './server.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'build'),
		publicPath: '/build',
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
				},
			},
		],
	},
	resolve: {
		extensions: ['.js', '.jsx', '.json'],
	},
	externals: [webpackNodeExternals()],
};
