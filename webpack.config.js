const path = require('path');
const glob = require('glob');

const entry = glob.sync('./src/themes/*.scss').reduce((x, y) => Object.assign(x, {
  [y.replace('src/', '').replace('.scss', '')]: y,
}), { modalist: './src/modalist.scss' });

module.exports = [{
  entry: {
    'modalist.js': './src/modalist.js'
  },
  output: {
    filename: 'modalist.js',
    path: path.resolve(__dirname, 'docs', 'dist')
  }
}, {
  entry,
  output: {
    filename: '[name].min.css',
    path: path.resolve(__dirname, 'docs', 'dist')
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
