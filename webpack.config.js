const path = require('path');

module.exports = [{
  entry: {
    'modalist.js': './src/modalist.js'
  },
  output: {
    filename: 'modalist.js',
    path: path.resolve(__dirname, 'dist')
  }
}, {
  entry: {
    'modalist.scss': './src/modalist.scss'
  },
  output: {
    filename: 'modalist.min.css',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader'
      }, {
        loader: 'sass-loader',
        options: {
          includePaths: [path.resolve(__dirname, 'node_modules')]
        }
      }]
    }]
  }
}];
