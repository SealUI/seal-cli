const verify = require('./verify')
const select = require('./select')
const Creator = require('./creator')
const { stopSpinner } = require('../utils/spinner')
const { error } = require('../utils/logger')
const { exit } = require('../utils/exit')
const create = async (name, options) => {
  const result = await verify.start(name, options)
  if (!result) exit(1)
  const template = await select()
  const creator = new Creator(result.name, result.context)
  await creator.create(options, template)
}

module.exports = (...args) => {
  return create(...args).catch(err => {
    stopSpinner(false)
    error(err)
    process.exit(1)
  })
}
