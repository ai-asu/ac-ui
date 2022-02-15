const path = require('path')

function resolve(src) {
  return path.resolve(__dirname, src)
}

module.exports = {
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
    },
    module: {
      rules: [
        {
          test: /\.md$/,
          use: [
            {
              loader: 'vue-loader',
              options: {
                compilerOptions: {
                  preserveWhitespace: false,
                },
              }
            },
            {
              loader: resolve('./build/md-loader/index.js')
            }
          ]
        }
      ]
    }
  }
}