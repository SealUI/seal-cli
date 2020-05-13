module.exports = {
  extends: ['./lib/index.js', './lib/react.js', './lib/typescript.js', './lib/vue.js'],
  settings: {
    react: {
      pragma: 'React', // Pragma to use, default to "React"
      version: 'detect'
    }
  },
  globals: {
    Prism: false
  }
}
