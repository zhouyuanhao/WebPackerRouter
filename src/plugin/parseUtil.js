var fs = require("fs")
const parseUtil = {
	resolveFile2MatchEnv: function(path) {
		var envChain = global.routerPlugin.targetEnvChain;
		var filePathArr = path.split(/\/|\\/);
		var fileName = filePathArr[filePathArr.length - 1];
		var fileNameArray = fileName.split('.');
		var tempFileNameArray;
		if (fileNameArray.length == 0) {
			return path;
		}
		var env;
		for (var count in envChain) {
			env = envChain[count];
			tempFileNameArray = fileNameArray.concat(); //copy the array
			tempFileNameArray[tempFileNameArray.length] = tempFileNameArray[tempFileNameArray.length - 1];
			tempFileNameArray[tempFileNameArray.length - 2] = env;
			var newFileName = tempFileNameArray.join('.');
			filePathArr[filePathArr.length - 1] = newFileName;
			var newPath = filePathArr.join('/');
			if (fs.existsSync(newPath)) {
				return newPath;
			}
		}
		return path;
	}
}

module.exports = parseUtil;