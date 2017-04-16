var fs = require('fs');
const treePropFileParser = {
	init: function() {
		var contentText = fs.readFileSync('envs.prop', 'utf-8');
		console.log(contentText);

		//parse tree file

		global.routerPlugin.targetEnvChain = ['test', 'test2', 'test3'];
		console.log('extend path:');
		console.log(global.routerPlugin.targetEnvChain.join('->'));
	}
}

module.exports = treePropFileParser;