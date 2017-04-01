ParseUtil = require('./parseUtil')
fs = require('fs');

function RouterPlugin(options) {
	console.log("router plugin enabled")
	global.routerPlugin = {}
	if (!options.env) {
		global.routerPlugin.enabled = false;
	}
	global.routerPlugin.enabled = true;
	global.routerPlugin.targetEnv = options.env;
	global.routerPlugin.targetEnvChain = ['test', 'test2', 'test3'];
	console.log('extend path:');
	console.log(global.routerPlugin.targetEnvChain.join('->'));
	// Setup the plugin instance with options...
}

RouterPlugin.prototype.apply = function(compiler) {
	var env = "a";
	compiler.plugin("make", function(compilation, callback) {
		compilation.plugin('normal-module-loader', function(loaderContext, module) {
			if (!global.routerPlugin.enabled) {
				return;
			}
			var path = loaderContext.resourcePath;
			loaderContext.resourcePath = ParseUtil.resolveFile2MatchEnv(loaderContext.resourcePath);
			if (path != loaderContext.resourcePath) {
				console.log('ori path-' + path);
				console.log('after path-' + loaderContext.resourcePath);
			}
		});
		callback();
	});
};

module.exports = RouterPlugin;