var fs = require("fs")
const ParseUtil = {
	resolveFileAccordingEnv: function(path, env) {
		var fileArr = path.split(/\/|\\/);
		var file = fileArr[fileArr.length - 1]
		var fileNameStruct = file.split('.');
		if (fileNameStruct.length != 0) {
			fileNameStruct[fileNameStruct.length] = fileNameStruct[fileNameStruct.length - 1];
			fileNameStruct[fileNameStruct.length - 2] = env;
			var newFileName = fileNameStruct.join('.');
			fileArr[fileArr.length - 1] = newFileName;
			var newPath = fileArr.join('/');
			if (fsExistsSync(newPath)) {
				return newPath;
			}
			return path
		}

		return pathArr[pathArr.length];
	}
}

function fsExistsSync(path) {
	try {
		fs.accessSync(path, fs.F_OK);
	} catch (e) {
		return false;
	}
	return true;
}
module.exports = ParseUtil;