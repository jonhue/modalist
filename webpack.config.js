const glob = require('glob');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const entry = glob.sync('./src/themes/*.scss').reduce((x, y) => Object.assign(x, {
  ['../docs/dist/' + y.replace('src/', '').replace('.scss', '')]: y,
}), {
  '../docs/dist/modalist': './src/modalist.scss',
  '../docs/dist/main': './docs/index.js'
});

module.exports = {
  entry,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }, {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoader: 2
            }
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [path.resolve(__dirname, 'node_modules')]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ]
};
