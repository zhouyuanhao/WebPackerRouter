yaml = require('js-yaml');
fs = require('fs');
var doc = yaml.safeLoad(fs.readFileSync('./web-packer-router.conf.yml', 'utf8'));
console.log(doc);


function HelloWorldPlugin(options) {
	// Setup the plugin instance with options...
}

HelloWorldPlugin.prototype.apply = function(compiler) {
	compiler.plugin('done', function() {
		console.log('Hello World!');
	});
};

module.exports = HelloWorldPlugin;