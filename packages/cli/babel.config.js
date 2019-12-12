module.exports = function(api) {
  api.cache.using(() => process.env.NODE_ENV)
  api.env(['development', 'production'])
  const presets = [
    [
      '@babel/preset-env',
      {
        targets: {
          node: '8.9'
        }
      }
    ],
    'minify'
  ]
  const plugins = [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: false,
        helpers: false,
        regenerator: true,
        useESModules: false
      }
    ],
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-arrow-functions',
    '@babel/plugin-transform-classes'
  ]

  return {
    presets,
    plugins,
    ignore: ['node_modules', 'src/create/template/**/*']
  }
}
