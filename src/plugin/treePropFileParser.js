var fs = require('fs');
const treePropFileParser = {
	init: function() {
		var contentText = fs.readFileSync('envs.prop', 'utf-8');
		console.log(contentText);
	}
}

module.exports = treePropFileParser;