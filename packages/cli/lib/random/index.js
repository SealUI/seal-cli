'use strict'
const chalk = require('chalk'),
  crypto = require('crypto'),
  random = async function(a) {
    var b = Math.floor
    if (!/^[+]{0,1}(\d+)$/.test(a)) return void console.log(`Not a valid length ${chalk.yellow(a)}.`)
    const c = crypto.randomBytes(+a),
      d = c.toString('hex'),
      e = b(Math.random() * (d.length / 2))
    return console.log(d.slice(e, e + +a)), d.slice(e, e + +a)
  }
module.exports = random
