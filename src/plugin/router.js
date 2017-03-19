ParseUtil = require('./parseUtil')
yaml = require('js-yaml');
fs = require('fs');


try {
	var doc = yaml.safeLoad(fs.readFileSync('./web-packer-router.conf.yml', 'utf8'));
} catch (e) {
	var doc = yaml.safeLoad(fs.readFileSync('./src/plugin/web-packer-router.conf.yml', 'utf8'));
}
console.log(doc);


function HelloWorldPlugin(options) {
	// Setup the plugin instance with options...
}

HelloWorldPlugin.prototype.apply = function(compiler) {
	var env = "a";
	compiler.plugin('done', function() {
		console.log('webpack done!');
	});

	compiler.plugin('compilation', function(compilation, params) {
		compilation.plugin('optimize-chunk-assets', function(chunks, callback) {
			console.log('opt');
			callback();
		});
		compilation.plugin('after-optimize-chunk-assets', function(chunks) {
			console.log(chunks.map(function(c) {
				return {
					id: c.id,
					name: c.name,
					includes: c.modules.map(function(m) {
						return m.request;
					})
				};
			}));
		});
	});
	compiler.plugin('emit', function(compilation, callback) {
		console.log('emit')
		callback();
	});
	compiler.plugin("make", function(compilation, callback) {
		console.log('make')
		compilation.plugin('normal-module-loader', function(loaderContext, module) {
			console.log('load-test here');
			console.log(loaderContext.resourcePath);
			var path = loaderContext.resourcePath;
			loaderContext.resourcePath = ParseUtil.resolveFileAccordingEnv(loaderContext.resourcePath, 'test');
		});
		callback();
	});
};

module.exports = HelloWorldPlugin;