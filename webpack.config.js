const process = require('process')
const path = require('path')
const AssetsPlugin = require('assets-webpack-plugin')
const assetsPluginInstance = new AssetsPlugin()
const ExtractTextPlugin = require('extract-text-webpack-plugin');

function outputFileName(suffix) {
  return process.env.NODE_ENV == "production" ? `[name]-[hash:20].${suffix}` : `[name].${suffix}`;
}

module.exports = {
    entry: {
      app: "./app/client/app.js"
    },
    output: {
        path: __dirname + "/public/toddy/assets",
        filename: outputFileName("js"),
        publicPath: "/toddy/assets/"
    },
    module: {
      rules: [
        { test: /\.(sass|scss)$/, loader: ExtractTextPlugin.extract('css-loader!sass-loader') },
        {
          test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/,
          loader: "file-loader",
          query: {
            context: './app/assets',
            name: outputFileName("[ext]")
          }
        }
      ]
    },
    plugins: [assetsPluginInstance, new ExtractTextPlugin({
      filename: process.env.NODE_ENV == "production" ? `[name]-[contenthash:20].css` : `[name].css`,
      allChunks: true,
    })]
};
