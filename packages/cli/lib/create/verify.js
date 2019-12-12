'use strict'
const path = require('path'),
  chalk = require('chalk'),
  fs = require('fs-extra'),
  inquirer = require('inquirer'),
  validateProjectName = require('validate-npm-package-name'),
  fileServer = require('./fileServer'),
  { clearConsole } = require('../utils/logger'),
  { logWithSpinner, stopSpinner } = require('../utils/spinner'),
  verify = {
    async exists(a, { targetDir: b, inCurrent: c }) {
      if (a.force) await fs.remove(b)
      else {
        if ((await clearConsole(), c)) {
          const { ok: a } = await inquirer.prompt([{ name: 'ok', type: 'confirm', message: '\u786E\u5B9A\u5728\u5F53\u524D\u76EE\u5F55\u4E2D\u751F\u6210\u9879\u76EE?' }])
          if (!a) return !1
        }
        const a = await fileServer.list(b)
        if (a.length) {
          const { action: d } = await inquirer.prompt([
            {
              name: 'action',
              type: 'list',
              message: `目标目录 ${chalk.cyan(b)} 已经存在。请选择:\n\n`,
              choices: [
                { name: ' \uD83D\uDDC3  \u8986\u76D6\u9879\u76EE', value: 'overwrite' },
                { name: ' \uD83D\uDD17 \u5408\u5E76\u9879\u76EE', value: 'merge' },
                { name: ' \uD83D\uDD12 \u53D6\u6D88\u521B\u5EFA', value: !1 }
              ]
            }
          ])
          if (!d) return !1
          'overwrite' === d && (logWithSpinner(`移除 ${chalk.bold(b)}...`), c ? await fileServer.delete(b, a) : await fs.remove(b), stopSpinner())
        }
      }
      return !0
    },
    invalid(a, { errors: b, warnings: c }) {
      console.error(chalk.red(`无效的项目名称: "${a}"`)),
        b &&
          b.forEach(function(a) {
            console.error(chalk.red.dim(`Error: ${a}`))
          }),
        c &&
          c.forEach(function(a) {
            console.error(chalk.red.dim(`警告: ${a}`))
          }),
        process.exit(1)
    },
    async start(a, b) {
      const c = b.cwd || process.cwd(),
        d = '.' === a,
        e = d ? path.relative('../', c) : a,
        f = path.resolve(c, a || '.'),
        { validForNewPackages: g, errors: h, warnings: i } = validateProjectName(e) // 项目名存在
      if ((g || this.invalid(e, { errors: h, warnings: i }), fs.existsSync(f))) {
        const a = await this.exists(b, { targetDir: f, inCurrent: d })
        if (!a) return !1
      }
      return { name: e, context: f }
    }
  }
module.exports = verify
