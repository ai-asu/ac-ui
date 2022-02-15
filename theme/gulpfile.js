const { series, src, dest } = require('gulp')
const sass = require('gulp-dart-sass')
const autoprefixer = require('gulp-autoprefixer')
const cssmin = require('gulp-cssmin')
const rename = require('gulp-rename')
const imagemin = require('gulp-imagemin')
const pngquant = require('imagemin-pngquant')

const noElPrefixFile = /index/

function compile() {
  return src('./src/*.scss')
    .pipe(sass.sync())
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cssmin())
    .pipe(rename(function (path) {
      if(!noElPrefixFile.test(path.basename)) {
        path.basename = `ac-${path.basename}`
      }
    }))
    .pipe(dest('../dist/theme'))
}

function copyfont() {
  return src('./src/fonts/**')
    .pipe(cssmin())
    .pipe(dest('../dist/theme/fonts'))
}

function copyicon() {
  return src('./src/icon/**')
    .pipe(cssmin())
    .pipe(dest('../dist/theme/icon'))
}

function images() {
  return src('./src/images/**/*')
    .pipe(imagemin({
      optimizationLevel: 5,   // 默认：3  取值范围：0-7（优化等级）
      progressive: true,      // 默认：false 无损压缩jpg图片
      interlaced: true,       // 默认：false 隔行扫描gif进行渲染
      multipass: true,        // 默认：false 多次优化svg直到完全优化
      svgoPlugins: [{removeViewBox: false}],  // 不要移除svg的viewbox属性
      use: [pngquant()]       // 使用pngquant深度压缩png图片的imagemin插件
    }))
    .pipe(dest('../dist/theme/images'))
}

exports.build = series(compile, copyfont, copyicon, images)
