const path = require('path');

module.exports = {
	entry: './src/index.jsx',
	output: {
		filename: 'client_bundle.js',
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
				},
			},
		],
	},
	resolve: {
		extensions: ['.js', '.jsx', '.json'],
	},
};
