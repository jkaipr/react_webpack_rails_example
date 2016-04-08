const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const config = require('./app/react/config/defaults');


module.exports = {
  entry: {
    main: ['./app/react/main.jsx']
  },
  output: {
    path: `${__dirname}/app/assets/javascripts`,
    filename: 'react_bundle.js'
  },
  module: {
    loaders: [
      {
        key: 'jsx',
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loaders: ['babel']
      },
      {
        loader: ExtractTextPlugin.extract('style', 'css!sass'),
        test: /\.s?css$/
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.js.jsx']
  },
  plugins: [
    new ExtractTextPlugin('../stylesheets/react_bundle.css', {
      allChunks: true
    }),
    new webpack.DefinePlugin({
      APP_NAME: JSON.stringify(config.appName),
      API_URL: JSON.stringify(config.apiUrl),
    })
  ]
};
