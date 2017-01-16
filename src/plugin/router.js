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
	compiler.plugin('done', function() {
		console.log('Hello World!');
	});

	compiler.plugin('compilation', function(compilation, params) {
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
};

module.exports = HelloWorldPlugin;