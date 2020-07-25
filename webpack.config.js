const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const LiveReloadPlugin = require('webpack-livereload-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: "all"
    }
  }
  if (isProd) {
    config.minimizer = [
      new TerserPlugin(),
      new OptimizeCssAssetsPlugin()
    ]
  }
  return config
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const cssLoaders = extra => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: isDev,
        reloadAll: true
      }
    },
    'css-loader'
  ]
  if (extra) {
    loaders.push(extra)
  }
  return loaders
}

module.exports = {
  optimization: optimization(),
  devtool: isDev ? 'source-map' : '',
  context: path.resolve(__dirname, 'src'),
  entry: './index.js',
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    port: 4200,  // can be any port
    hot: isDev
  },
  plugins: [
    new LiveReloadPlugin({
      appendScriptTag: true
    }),
    new MiniCssExtractPlugin({
      filename: filename('css')
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'cards.html',
      template: path.resolve(__dirname, 'src/pug/pages/cards.pug')
    }),
    new HtmlWebpackPlugin({
      filename: 'colors-&-type.html',
      template: path.resolve(__dirname, 'src/pug/pages/colors-&-type.pug')
    }),
    new HtmlWebpackPlugin({
      filename: 'form-elements.html',
      template: path.resolve(__dirname, 'src/pug/pages/form-elements.pug')
    }),
    new HtmlWebpackPlugin({
      filename: 'headers-&-footers.html',
      template: path.resolve(__dirname, 'src/pug/pages/headers-&-footers.pug')
    }),
    new HtmlWebpackPlugin({
      filename: 'landing-page.html',
      template: path.resolve(__dirname, 'src/pug/pages/landing-page.pug')
    }),
    new HtmlWebpackPlugin({
      filename: 'registration.html',
      template: path.resolve(__dirname, 'src/pug/pages/registration.pug')
    }),
    new HtmlWebpackPlugin({
      filename: 'room-details.html',
      template: path.resolve(__dirname, 'src/pug/pages/room-details.pug')
    }),
    new HtmlWebpackPlugin({
      filename: 'search-room.html',
      template: path.resolve(__dirname, 'src/pug/pages/search-room.pug')
    }),
    new HtmlWebpackPlugin({
      filename: 'sign-in.html',
      template: path.resolve(__dirname, 'src/pug/pages/sign-in.pug')
    }),
  ],
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        query: {
          pretty: true
        }
      },
      {
        test: /\.css$/,
        use: cssLoaders()
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders('sass-loader')
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ]
          }
        }
      },
      {
        test: /\.(png|jpg|svg|gif)/,
        use: ['file-loader']
      }
    ]
  }
}
