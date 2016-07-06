//  cd /Users/xx/www/github/select-webpack/src/sass  compass watch
// webpack -w

var LiveReloadPlugin = require('webpack-livereload-plugin');
module.exports = {
    entry: "./src/js/index.jsx",
    output: {
        path: './dist/',
        filename: "bundle.js"
    },
    plugins: [
        new LiveReloadPlugin({
            port: 20000,
            appendScriptTag: true
        })
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'webpack-traceur?runtime&sourceMaps'
            }
        ]
    }
};