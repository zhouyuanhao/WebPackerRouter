var fs = require('fs');
const treePropFileParser = {
	init: function() {
		var contentText = fs.readFileSync('envs.prop', 'utf-8');
		//console.log(contentText);

		//parse tree file here
		var root = {
			env: "",
			parent: null
		}

		var oriLines = contentText.split('\r\n');
		var lines = []
		for (var i = 0, iReal = 0; i < oriLines.length; i++, iReal++) {
			//add leading space and appending space for search
			if (oriLines[i].trim() == "") {
				continue;
			}
			lines[iReal] = formatLine(oriLines[i]);
		}

		//validate the data
		for (i = 0; i < lines.length; i++) {
			//console.log(lines[i]);
			if (i % 2 == 0) {
				parseLineIntoMeta(lines[i]);
				//console.log(lineData);
			} else {

			}

		}

		global.routerPlugin.targetEnvChain = ['test', 'test2', 'test3'];
		console.log('extend path:');
		console.log(global.routerPlugin.targetEnvChain.join('->'));
	}
}

function formatLine(line) {
	var chars = line.split("");
	var off;
	for (var i = 0, offset = 1; i < chars.length; i++, offset++) {
		if (chars[i] == "\t") {
			var off = (offset % 4);
			off = (off == 0) ? 4 : off;
			chars[i] = "    ".substring(off - 1);
			offset += (4 - off);
		}
	}
	return " " + chars.join('') + " "
}

function parseLineIntoMeta(line) {
	var lineData = line.split(/[ ]+/);
	//console.log(lineData);
	//TODO return Meta array
}

module.exports = treePropFileParser;