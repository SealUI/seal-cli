'use strict'
const execa = require('execa'),
  install = function(a) {
    const b = 'npm',
      c = ['install', '--loglevel', 'error']
    return new Promise(function(d, e) {
      const f = execa(b, c, { cwd: a, stdio: ['inherit', 'inherit', 'inherit'] })
      f.on('close', function(a) {
        return 0 === a ? void d() : void e(`command failed: ${b} ${c.join(' ')}`)
      })
    })
  }
module.exports = install
