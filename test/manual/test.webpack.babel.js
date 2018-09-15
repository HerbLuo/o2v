/* eslint-disable */
import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'

export default {
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, './index.jsx')
  },
  output: {
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
  },
  module: {
    rules: [{
      test: /.jsx?$/,
      use: 'eslint-loader',
      enforce: 'pre',
      include: [/test/, /src/], // 指定检查的目录
      exclude: [/node_modules/]
    }, {
      test: /.jsx?$/,
      use: ['babel-loader'],
      exclude: /node_modules/
    }, {
      test: /.html$/,
      use: 'html-loader',
    }, {
      test: /\.(svg|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: 'url-loader?limit=5120',
    }, {
      test: /.(le|c)ss$/,
      use: ['style-loader', 'css-loader', 'less-loader']
    }]
  },
  devServer: {
    inline: true,
    contentBase: path.resolve(__dirname, './'),
    hot: true,
    publicPath: '/',
    port: 3002,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, './index.html')
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    alias: {
      '@lib': path.resolve('lib')
    }
  }
}
