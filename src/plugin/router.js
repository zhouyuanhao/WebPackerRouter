ParseUtil = require('./parseUtil')
yaml = require('js-yaml');
fs = require('fs');


try {
	var doc = yaml.safeLoad(fs.readFileSync('./web-packer-router.conf.yml', 'utf8'));
} catch (e) {
	var doc = yaml.safeLoad(fs.readFileSync('./src/plugin/web-packer-router.conf.yml', 'utf8'));
}


function RouterPlugin(options) {
	console.log("router plugin enabled")
	global.abc = "this is a global message"
		// Setup the plugin instance with options...
}

RouterPlugin.prototype.apply = function(compiler) {
	var env = "a";
	compiler.plugin("make", function(compilation, callback) {
		compilation.plugin('normal-module-loader', function(loaderContext, module) {
			var path = loaderContext.resourcePath;
			console.log('ori path-' + path);
			loaderContext.resourcePath = ParseUtil.resolveFileAccordingEnv(loaderContext.resourcePath, 'test');
			console.log('after path-' + loaderContext.resourcePath);
		});
		callback();
	});
};

module.exports = RouterPlugin;