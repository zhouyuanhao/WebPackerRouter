## ABOUT

this is a plugin for the webpack, inspired by react native, which will use existing ios/android/native file to custom the generated artifact.

This plugin can config the related environment hierarchy, and when use webpack it will according the configuration to get the expected env file. for example, if you configured environment like native->android->htc then it will and you want to generate the artifact for the htc, then when you require 'a.js' it will detect if a.htc.js exist then a.android.js then a.native.js if none exist it will use a.js.

##USAGE

###WEBPACK PLUGIN

In the webpack.config.js file you can add

```
var routerPlugin = require('./src/plugin/router.js');
var webpackConfig = {
...
	plugins: [
		new routerPlugin({
			env: '*target env*',
			confFile: '*configfile path*'
		})
	]
};
...
```

you need to require the plugin and then add it in the plug in , two mandatory configuration is env and confFile, env is the expected target env, while confFile is the env hierarchy config file.

###HIERARCHY CONFIGURATION
hirerarchy can be configured as human readable tree, every node is one env ,and it cannot bu duplicate or contain space ,each env is seperated by the space or tab, and the tree support \ | / to contact each env, and while building, the plugin will find the target node and get the hierarchy chain and build according the chain to fetch the originl file.