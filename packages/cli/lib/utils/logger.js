'use strict'
const readline = require('readline'),
  chalk = require('chalk'),
  padStart = require('string.prototype.padstart'),
  format = function(a, b) {
    return b
      .split('\n')
      .map(function(b, c) {
        return 0 === c ? `${a} ${b}` : padStart(b, chalk.reset(a).length)
      })
      .join('\n')
  },
  chalkTag = function(a) {
    return chalk.bgBlackBright.white.dim(` ${a} `)
  }
;(exports.log = function(a = '', b = null) {
  b ? console.log(format(chalkTag(b), a)) : console.log(a)
}),
  (exports.info = function(a, b = null) {
    console.log(format(chalk.bgBlue.black(' INFO ') + (b ? chalkTag(b) : ''), a))
  }),
  (exports.done = function(a, b = null) {
    console.log(format(chalk.bgGreen.black(' DONE ') + (b ? chalkTag(b) : ''), a))
  }),
  (exports.warn = function(a, b = null) {
    console.warn(format(chalk.bgYellow.black(' WARN ') + (b ? chalkTag(b) : ''), chalk.yellow(a)))
  }),
  (exports.error = function(a, b = null) {
    console.error(format(chalk.bgRed(' ERROR ') + (b ? chalkTag(b) : ''), chalk.red(a)))
  }),
  (exports.success = function(a, b = null) {
    console.error(format(chalk.bgGreen(' SUCCESS ') + (b ? chalkTag(b) : ''), chalk.green(a)))
  }),
  (exports.clearConsole = function() {
    if (process.stdout.isTTY) {
      const a = '\n'.repeat(process.stdout.rows)
      console.log(a), readline.cursorTo(process.stdout, 0, 0), readline.clearScreenDown(process.stdout)
      const { version: b } = require('../../package.json')
      console.log(chalk.bold.blue(`🌟️  Seal CLI v${b}`))
    }
  })
