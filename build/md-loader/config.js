const Config = require('markdown-it-chain')
const anchorPlugin = require('markdown-it-anchor')
const slugify = require('transliteration').slugify
const hljs = require('highlight.js')
const containers = require('./containers')
const overWriteFenceRule = require('./fence')

const config = new Config()

const highlight = (str, lang) => {
  if (!lang || !hljs.getLanguage(lang)) {
    return '<pre><code class="hljs">' + str + '</code></pre>'
  }
  const html = hljs.highlight(lang, str, true, undefined).value
  return `<pre><code class="hljs language-${lang}">${html}</code></pre>`
}

// 使用链式API调用配置
config.options   // markdown-it 选项配置
  .html(true) // 在源码中启用 HTML 标签
  .highlight(highlight).end()

  // 标题锚点生成插件
  .plugin('anchor').use(anchorPlugin, [
    {
      level: 2, // 最少包含的渲染层级
      slugify: slugify, // 生成有效url的自定义函数
      permalink: true,  // 是否在标题旁加入永久链接
      permalinkBefore: true,  // 将永久链接放在标题的前面
    },
  ]).end()

  // 创建块级自定义容器的解析插件
  .plugin('containers').use(containers).end()

const md = config.toMd()
// 针对代码块（fence）覆盖默认渲染规则。当代码块在 demo 容器内要做一下特殊处理。
overWriteFenceRule(md)

module.exports = md
