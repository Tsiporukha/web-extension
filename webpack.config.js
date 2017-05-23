/* eslint "fp/no-mutation": ["error", {"commonjs": true}] */

const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const nmPath = './node_modules';

const joinToDirname = pth => path.join(__dirname, pth);
const jointToWebCliDir = pth => path.join('./src/environments/web_cli/', pth);
const jointToChromeDir = pth => path.join('./src/environments/chrome/', pth);

const getFullConfig = envConfig => Object.assign({}, commonConfig, envConfig);

const commonConfig = {
  cache: true,

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: JSON.stringify({
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['transform-object-rest-spread']
        })
      },
      {
        test: /\.(scss|css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use:[
            'css-loader?' + JSON.stringify({modules: true, importLoaders: 1, localIdentName: '[name]__[local]___[hash:base64:5]'}),
            'sass-loader?' + JSON.stringify({sourceMap: true})
          ]
        })
      },
      {
        test: /\.woff2?$|\.ttf$|\.eot$|.svg$/,
        loader: 'file-loader?' + JSON.stringify({name: 'assets/fonts/[name].[ext]'})
      },
      {
        test: /\.png|\.jpe?g|\.gif$/,
        loader: 'file-loader?' + JSON.stringify({name: 'assets/images/[name].[ext]'})
      }
    ]
  },

  stats: {
    children: false
  }
}

const chromeConfig = {
  name: 'chrome',

  entry: {
    background:joinToDirname(jointToChromeDir('/background')),
    bundle: joinToDirname(jointToChromeDir('/index'))
  },
  output: {
    path: joinToDirname('/build/chrome'),
    filename: '[name].js'
  },

  plugins: [
    new CopyWebpackPlugin([
      {from: joinToDirname(jointToChromeDir('/background.html'))},
      {from: joinToDirname(jointToChromeDir('/manifest.json'))},
      {from: joinToDirname(jointToChromeDir('/logo.png'))},
      {from: joinToDirname(jointToChromeDir('/echo.css'))}
    ]),
    new ExtractTextPlugin({filename: 'styles.css', allChunks: true})
  ]
}

const webCliConfig = {
  name: 'web_cli',

  entry: {
    bundle: joinToDirname(jointToWebCliDir('/index.js'))
  },
  output: {
    path: joinToDirname('/build/web'),
    filename: '[name].js'
  },

  plugins: [
    new CopyWebpackPlugin([{from: joinToDirname(jointToWebCliDir('/index.html'))}
    ]),
    new ExtractTextPlugin({filename: 'styles.css', allChunks: true})
  ],
}

const builds = {chrome: getFullConfig(chromeConfig), web: getFullConfig(webCliConfig)};

module.exports = process.env.build ? builds[process.env.build] : Object.keys(builds).map(k => builds[k]);
