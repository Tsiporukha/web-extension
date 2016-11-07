const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {

  entry: {
    bundle: __dirname + '/index.js', // will be  /build/bundle.js
    styles: './src/assets/styles/_main.scss'
  },
  output: {
    path: './build/web',
    filename: '[name].js'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015'],
          plugins: ['transform-object-rest-spread']
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!resolve-url!sass-loader?sourceMap')
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.woff2?$|\.ttf$|\.eot$|\.svg$|\.png|\.jpe?g|\.gif$/,
        loader: 'file-loader'
      }
    ]
  },

  plugins: [
    new CopyWebpackPlugin([
      {from: __dirname + '/index.html'}  // {output}/index.html
    ]),
    new ExtractTextPlugin('styles.css', {
      allChunks: true
    })
  ]

}
