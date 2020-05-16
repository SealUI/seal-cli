module.exports = {
  root: true,
  env: {
    commonjs: true,
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['@sealui/sealui'],
  plugins: ['node', 'import'],
  rules: {
    'prettier/prettier': 'error',
    complexity: ['error', { max: 30 }],
    'prefer-object-spread': 0,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
  },
  globals: {
    __VERSION__: true,
  },
}
