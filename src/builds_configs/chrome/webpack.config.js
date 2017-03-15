const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const nmPath = '../../../node_modules';

const joinToDirname = pth => path.join(__dirname, pth);

module.exports = {
  cache: true,
  devtool: 'eval',

  entry: {
    bundle: joinToDirname('/index'), // will be  /build/chrome/bundle.js,
    background:joinToDirname('/background')
  },
  output: {
    path: './build/chrome',
    filename: '[name].js'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['transform-object-rest-spread']
        }
      },
      {
        test: /\.(scss|css)$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass?sourceMap')
      },
      {
        test: /\.woff2?$|\.ttf$|\.eot$|\.svg$|\.png|\.jpe?g|\.gif$/,
        loader: 'file-loader'
      }
    ]
  },

  plugins: [
    new CopyWebpackPlugin([
      {from: joinToDirname('/background.html')},
      {from: joinToDirname('/manifest.json')},
      {from: joinToDirname('/logo.png')},
      {from: joinToDirname('/echo.css')}
    ]),
    new ExtractTextPlugin('styles.css', {allChunks: true})
  ],

  noParse: [
    nmPath
  ],

  stats: {children: false},

  watchOptions: {
      aggregateTimeout: 500,
      poll: true
  },

  keepalive: true,

  inline: true

}
