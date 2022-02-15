const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const config = require('./config')

module.exports = {
  mode: 'production',
  entry: config.components,
  output: {
    path: path.resolve(__dirname, '../dist/packages/'),
    pathinfo: false,
    filename: '[name].js',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.tsx|ts?$/,
        use: [
          {loader: 'babel-loader'},
          {loader: 'ts-loader',options: {transpileOnly: true,appendTsSuffixTo: ['\\.vue$'],happyPackMode: true}}]
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: 'assets/[name].[ext]',
          publicPath: 'assets'
        }
      }
    ]
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue'
    }
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.vue', 'json']
  },
  optimization: {
    minimize: false,
    sideEffects: false
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}
