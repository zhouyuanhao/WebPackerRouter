var fs = require('fs');
const treePropFileParser = {
	init: function() {
		var contentText = fs.readFileSync('envs.prop', 'utf-8');
		console.log(contentText);

		//parse tree file here
		var root = {
			env: "",
			parent = null;
		}
		var lines = contentText.split('\r\n');
		var i, iReal;
		iReal = 0;
		for (int i = 0 i < lines.length; i++) {
			//add leading space and appending space for search
			if (lines.trim() == "") {
				continue;
			}
			lines[iReal] = " " + lines[i] + " ";
			iReal++;
		}


		global.routerPlugin.targetEnvChain = ['test', 'test2', 'test3'];
		console.log('extend path:');
		console.log(global.routerPlugin.targetEnvChain.join('->'));
	}
}

module.exports = treePropFileParser;