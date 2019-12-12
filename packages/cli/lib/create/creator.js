'use strict'
function _classCallCheck(a, b) {
  if (!(a instanceof b)) throw new TypeError('Cannot call a class as a function')
}
function _defineProperties(a, b) {
  for (var c, d = 0; d < b.length; d++) (c = b[d]), (c.enumerable = c.enumerable || !1), (c.configurable = !0), 'value' in c && (c.writable = !0), Object.defineProperty(a, c.key, c)
}
function _createClass(a, b, c) {
  return b && _defineProperties(a.prototype, b), c && _defineProperties(a, c), a
}
const path = require('path'),
  chalk = require('chalk'),
  execa = require('execa'),
  install = require('./install'),
  fileServer = require('./fileServer'),
  { logWithSpinner, stopSpinner } = require('../utils/spinner'),
  { clearConsole, log } = require('../utils/logger')
let Creator = /*#__PURE__*/ (function() {
  function a(b, c) {
    _classCallCheck(this, a), (this.name = b), (this.context = c), (this.run = this.run.bind(this))
  }
  return (
    _createClass(a, [
      {
        key: 'create',
        value: async function create(a, b) {
          const { run: c, name: d, context: e } = this
          await clearConsole(), logWithSpinner('\u2728', `在 ${chalk.yellow(e)} 中生成项目`), stopSpinner(), log('\uD83D\uDE80  \u521B\u5EFA\u6587\u4EF6...')
          const f = path.join(__dirname, `./template/${b}`),
            g = await fileServer.read(f, { list: ['README.md', 'package.json', 'public/index.html'], options: { projectName: d } })
          fileServer.write(e, g),
            a.forceGit && (logWithSpinner('\uD83D\uDDC3', ' \u521D\u59CB\u5316 git ...'), await c('git init')),
            stopSpinner(),
            log('\uD83D\uDCE6  \u5B89\u88C5\u4F9D\u8D56\u6587\u4EF6...'),
            await install(e),
            log(),
            log(`🎉  创建 ${chalk.green(d)} 项目成功.`),
            log(`👉  开始使用以下命令，遨游代码的世界吧\n\n${e === process.cwd() ? '' : chalk.cyan(` ${chalk.gray('$')} cd ${d}\n`)}${chalk.cyan(` ${chalk.gray('$')} ${'npm run serve'}`)}`)
        }
      },
      {
        key: 'run',
        value: function run(a, b) {
          return b || ([a, ...b] = a.split(/\s+/)), execa(a, b, { cwd: this.context })
        }
      }
    ]),
    a
  )
})()
module.exports = Creator
