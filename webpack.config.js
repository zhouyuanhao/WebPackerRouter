var RouterPlugin = require('./src/plugin/router.js');

var webpackConfig = {
	entry: {
		main: './src/main.js',
	},
	output: {
		path: __dirname,
		filename: 'dist/main.js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	plugins: [
		new RouterPlugin({
			env: 'test'
		})
	]
};

module.exports = webpackConfig;