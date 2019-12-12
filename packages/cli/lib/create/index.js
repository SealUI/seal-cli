'use strict'
const verify = require('./verify'),
  select = require('./select'),
  Creator = require('./creator'),
  { stopSpinner } = require('../utils/spinner'),
  { error } = require('../utils/logger'),
  { exit } = require('../utils/exit'),
  create = async function(a, b) {
    const c = await verify.start(a, b)
    c || exit(1)
    const d = await select(),
      e = new Creator(c.name, c.context)
    await e.create(b, d)
  }
module.exports = function(...a) {
  return create(...a).catch(function(a) {
    stopSpinner(!1), error(a), process.exit(1)
  })
}
