module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    require.resolve('eslint-config-prettier'),
    './base.js'
  ],
  rules: {
    'prettier/prettier': 'error'
  }
}
