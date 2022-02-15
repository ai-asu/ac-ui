module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    ["prismjs", {
      "languages": ["javascript", "css", "markup"],
      "plugins": ["line-numbers", 'file-highlight', 'highlight-keywords', 'normalize-whitespace'],
      "theme": "tomorrow",
      "css": true
    }]
  ]
}
