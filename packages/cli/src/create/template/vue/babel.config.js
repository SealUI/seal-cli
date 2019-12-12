module.exports = function(api) {
  api.cache.using(() => process.env.NODE_ENV)
  api.env(['development', 'production'])
  const presets = ['@vue/cli-plugin-babel/preset']
  return {
    presets
  }
}
