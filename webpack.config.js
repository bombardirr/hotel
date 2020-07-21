const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// const PATHS = {
//   src: path.resolve(__dirname, '../src'),
//   dist: path.resolve(__dirname, '../dist')
// }

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/pug/pages/index.pug')
    }),
  ],
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: ['pug-loader']
      },
    ]
  }
}