var fs = require('fs');
var util = require('./util')

const treePropFileParser = {


	init: function() {
		var contentText = fs.readFileSync(global.routerPlugin.confFile, 'utf-8');
		//console.log(contentText);

		//parse tree file here
		var oriLines = contentText.split('\r\n');
		var lines = []
		for (var i = 0, iReal = 0; i < oriLines.length; i++, iReal++) {
			//add leading space and appending space for search
			if (oriLines[i].trim() === "") {
				continue;
			}
			lines[iReal] = formatLine(oriLines[i]);
		}
		if (iReal % 2 === 0) {
			console.log("config file not valid, have odd number of row")
			util.disablePlugin();
			return;
		}
		var lastMeta = paraseFirstLineIntoMeta(lines[0]);
		console.log("----" + lastMeta);
		for (i = 1; i < lines.length; i += 2) {
			lastMeta = parseLineIntoMeta(lines, i, lastMeta);
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
		if (chars[i] === "\t") {
			var off = (offset % 4);
			off = (off === 0) ? 4 : off;
			chars[i] = "    ".substring(off - 1);
			offset += (4 - off);
		}
	}
	return " " + chars.join('') + " "
}

root = {
	env: "",
	parent: null
}

existEnv = {}

function paraseFirstLineIntoMeta(line) {
	var metas = []
	var lineData = line.split(/[ ]+/);
	for (var i = 1; i < lineData.length - 1; i++) {
		if (existEnv[lineData[i]] != null) {
			throw lineData[i] + " already defined ! Each env should only be defined once."
		}
		var pos = line.indexOf(" " + lineData[i] + " ") + 1;
		var meta = {
			env: lineData[i],
			start: pos,
			end: pos + lineData[i].length,
			parent: root
		}
		metas.push(meta);
		existEnv[lineData[i]] = meta;
	}
	return metas;
}

function parseLineIntoMeta(lines, lineNum, lastMeta) {
	var directLine = lines[lineNum];
	var envLine = lines[lineNum + 1];
	var metas = []

	var envArr = envLine.split(/[ ]+/);
	var directArr = directLine.split(/[ ]+/);
	if (envArr.length != directArr.length) {
		throw "line " + lineNum + " direction and env don't match"
	}

	//TODO: parse this line and match with lastMeta
	for (var i = 1; i < lineData.length - 1; i++) {
		if (existEnv[lineData[i]] != null) {
			throw env + " already defined ! Each env should only be defined once."
		}
		var pos = line.indexOf(" " + lineData[i] + " ") + 1;
		var meta = {
			env: lineData[i],
			start: pos,
			end: pos + lineData[i].length,
			parent: root
		}
		metas.push(meta);
		existEnv[lineData[i]] = meta;
	}
	return metas;
}

module.exports = treePropFileParser;