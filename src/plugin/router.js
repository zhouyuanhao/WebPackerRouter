var parseUtil = require('./parseUtil')
var fs = require('fs');
var treePropFileParser = require('./treePropFileParser')
var util = require('./util')

function routerPlugin(options) {
	console.log("init router plugin")
	global.routerPlugin = {}
	if (!options || !options.env || !options.confFile) {
		console.log("plugin configuration not correct, expected config is :");
		console.log("    env -- (mandaroty) the env want to pick");
		console.log("    confFile -- (mandaroty) the configuration file");
		util.disablePlugin()
		return;
	}
	global.routerPlugin = options;
	util.disablePlugin(false);
	// Setup the plugin instance with options...
	try {
		treePropFileParser.init();
	} catch (err) {
		console.log("error " + err);
		util.disablePlugin(false);
	}
}

routerPlugin.prototype.apply = function(compiler) {
	var env = "a";
	compiler.plugin("make", function(compilation, callback) {
		compilation.plugin('normal-module-loader', function(loaderContext, module) {
			if (util.isDisabled()) {
				return;
			}
			var path = loaderContext.resourcePath;
			loaderContext.resourcePath = parseUtil.resolveFile2MatchEnv(loaderContext.resourcePath);
			if (path !== loaderContext.resourcePath) {
				console.log('ori path-' + path);
				console.log('after path-' + loaderContext.resourcePath);
			}
		});
		callback();
	});
};

module.exports = routerPlugin;