const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const config = require('./config')


function resolve (dir) {
  return path.resolve(__dirname, dir)
}

module.exports = {
  mode: 'production',
  entry: {
    index: resolve('../packages/index.ts')
  },
  output: {
    path: resolve('../dist/packages'),
    filename: '[name].js',
    library: 'ac-ui',
    libraryTarget: 'umd',
    libraryExport: 'default',
    umdNamedDefine: true,
    globalObject: 'typeof self !== \'undefined\' ? self : this'
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
          name: 'assets/[name].[ext]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
  },
  optimization: {
    minimize: false,
    sideEffects: false
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}
