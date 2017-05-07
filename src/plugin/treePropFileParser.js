var fs = require('fs');
var util = require('./util')

const treePropFileParser = {


	init: function() {
		var contentText = fs.readFileSync(global.routerPlugin.confFile, 'utf-8');

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
		for (i = 1; i < lines.length; i += 2) {
			lastMeta = parseLineIntoMeta(lines, i, lastMeta);
		}

		global.routerPlugin.targetEnvChain = getHierarchy();
		console.log('extend path:');
		console.log(global.routerPlugin.targetEnvChain.join('->'));
	}
}

function getHierarchy() {
	var map = []
	var node = existEnv[global.routerPlugin.env];
	if (node == null) {
		throw 'env "' + global.routerPlugin.env + '" not detected in the config file!'
	}
	while (node != null) {
		map.push(node.env);
		node = node.parent
	}
	return map;
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
			end: pos + lineData[i].length - 1,
			parent: null
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
		throw "line " + lineNum + " direction and env don't match";
	}

	for (var i = 1; i < envArr.length - 1; i++) {
		if (existEnv[envArr[i]] != null) {
			throw envArr[i] + " already defined ! Each env should only be defined once.";
		}
		var pos = envLine.indexOf(" " + envArr[i] + " ") + 1;
		var direct = null;
		var directPos = 0;
		for (var x = pos; x < pos + envArr[i].length; x++) {
			if (directLine[x] !== ' ' && direct != null) {
				throw 'multiple direction detected for ' + envArr[i];
			}
			if (directLine[x] === '/' || directLine[x] === '|' || directLine[x] === '\\') {
				direct = directLine[x];
				directPos = x;
			} else if (directLine[x] !== ' ') {
				throw 'invalid direction detected for ' + envArr[i];
			}
		}
		if (direct == null) {
			throw 'no direction detected for ' + envArr[i];
		}
		var parent = null;
		if (direct === '|') {
			for (var tempMeta in lastMeta) {
				if (lastMeta[tempMeta].start <= directPos && lastMeta[tempMeta].end >= directPos) {
					parent = lastMeta[tempMeta];
					break;
				}
			}
			if (parent == null) {
				throw 'no parent detected for ' + envArr[i];
			}
		} else if (direct === '/') {
			for (var tempMeta in lastMeta) {
				if (lastMeta[tempMeta].end > directPos) {
					parent = lastMeta[tempMeta];
					break;
				}
			}
			if (parent == null) {
				throw 'no parent detected for ' + envArr[i];
			}
		} else if (direct === '\\') {
			for (var tempMeta in lastMeta) {
				if (lastMeta[tempMeta].start < directPos) {
					parent = lastMeta[tempMeta];
				}
			}
			if (parent == null) {
				throw 'no parent detected for ' + envArr[i];
			}
		}
		// TODO: according the direct to get the parent node
		var meta = {
			env: envArr[i],
			start: pos,
			end: pos + envArr[i].length - 1,
			parent: parent
		}
		metas.push(meta);
		existEnv[envArr[i]] = meta;
	}
	return metas;
}

module.exports = treePropFileParser;