const util = {
	disablePlugin: function(disabled) {
		if (disabled == null) {
			disabled = true
		}
		global.routerPlugin.enabled = !disabled;
	},

	isDisabled: function() {
		return !global.routerPlugin.enabled
	}
}

module.exports = util;