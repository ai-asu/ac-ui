const path = require('path')
const fs = require('fs')
// const nodeExternals = require('webpack-node-externals')

const resolve = src => {
    return path.resolve(__dirname, src)
}

const components = fs.readdirSync(resolve('../packages/components'))

let externals = {}

components.forEach(name => {
  externals[`components/${name}`] = `dist/ac-ui/lib/${name}`
})

externals = Object.assign({
  vue: 'vue'
}, externals)

exports.components = components.reduce((last, curr) => {
  last[`lib/${curr}`] = resolve(`../packages/components/${curr}`)
  return last
}, {})

exports.externals = externals