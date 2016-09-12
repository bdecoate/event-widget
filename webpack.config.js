var webpack = require('webpack');
var fs = require('fs');

// Allow server side bundling with node modules properly required in
var nodeModules = {};
fs.readdirSync('node_modules')
	.filter(function(x) {
		return ['.bin'].indexOf(x) === -1;
	})
	.forEach(function(mod) {
		nodeModules[mod] = 'commonjs ' + mod;
	});

module.exports = [
	// client side bundle
	{
		entry: './src/client/app/',
		output: {
			path: './build/',
			filename: 'bundle.js'
		},
		externals: {
			'jquery': 'jQuery'
		},
		module: {
			loaders: [
				{
					test: /\.js$/, loader: 'babel', exclude: '/node_modules/',
					query: {presets: ['es2015']}
				},
				{ test: /\.less$/, loaders: ['style', 'css', 'less'] }
			]
		},
		devtool: 'source-map'
	},
	// server side bundle
	{
		entry: './src/server/app.js',
		output: {
			path: './build/',
			filename: 'app.js'
		},
		externals: nodeModules,
		target: 'node',
		module: {
			loaders: [
				{
					test: /\.js$/, loader: 'babel', exclude: '/node_modules/',
					query: {presets: ['es2015']}
				}
			]
		},
		plugins: [
			new webpack.BannerPlugin('require("source-map-support").install();',
				{ raw: true, entryOnly: false })
		],
		devtool: 'source-map'
	}
]
