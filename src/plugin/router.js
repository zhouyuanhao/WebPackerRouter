parseUtil = require('./parseUtil')
fs = require('fs');
treePropFileParser = require('./treePropFileParser')

function routerPlugin(options) {
	console.log("router plugin enabled")
	global.routerPlugin = {}
	if (!options || !options.env || !options.confFile) {
		console.log("plugin configuration not correct, expected config is :");
		console.log("    env -- (mandaroty)the env want to pick");
		console.log("    confFile -- (mandaroty)the configuration file");
		global.routerPlugin.enabled = false;
		return;
	}
	global.routerPlugin = options;
	global.routerPlugin.enabled = true;
	// Setup the plugin instance with options...
	treePropFileParser.init();
}

routerPlugin.prototype.apply = function(compiler) {
	var env = "a";
	compiler.plugin("make", function(compilation, callback) {
		compilation.plugin('normal-module-loader', function(loaderContext, module) {
			if (!global.routerPlugin.enabled) {
				return;
			}
			var path = loaderContext.resourcePath;
			loaderContext.resourcePath = parseUtil.resolveFile2MatchEnv(loaderContext.resourcePath);
			if (path != loaderContext.resourcePath) {
				console.log('ori path-' + path);
				console.log('after path-' + loaderContext.resourcePath);
			}
		});
		callback();
	});
};

module.exports = routerPlugin;