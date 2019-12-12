const path = require('path')
const chalk = require('chalk')
const fs = require('fs-extra')

const inquirer = require('inquirer')
const validateProjectName = require('validate-npm-package-name')
const fileServer = require('./fileServer')
const { clearConsole } = require('../utils/logger')
const { logWithSpinner, stopSpinner } = require('../utils/spinner')
// 验证文件名
const verify = {
  async exists(options, { targetDir, inCurrent }) {
    if (options.force) {
      await fs.remove(targetDir)
    } else {
      await clearConsole()
      if (inCurrent) {
        const { ok } = await inquirer.prompt([
          {
            name: 'ok',
            type: 'confirm',
            message: '确定在当前目录中生成项目?'
          }
        ])
        if (!ok) {
          return false
        }
      }
      const files = await fileServer.list(targetDir)
      if (files.length) {
        const { action } = await inquirer.prompt([
          {
            name: 'action',
            type: 'list',
            message: `目标目录 ${chalk.cyan(targetDir)} 已经存在。请选择:\n\n`,
            choices: [
              {
                name: ' 🗃  覆盖项目',
                value: 'overwrite'
              },
              {
                name: ' 🔗 合并项目',
                value: 'merge'
              },
              {
                name: ' 🔒 取消创建',
                value: false
              }
            ]
          }
        ])
        if (!action) {
          return false
        }
        if (action === 'overwrite') {
          logWithSpinner(`移除 ${chalk.bold(targetDir)}...`)
          if (inCurrent) {
            await fileServer.delete(targetDir, files)
          } else {
            await fs.remove(targetDir)
          }
          stopSpinner()
        }
      }
    }
    return true
  },
  invalid(name, { errors, warnings }) {
    console.error(chalk.red(`无效的项目名称: "${name}"`))
    errors &&
      errors.forEach(err => {
        console.error(chalk.red.dim(`Error: ${err}`))
      })
    warnings &&
      warnings.forEach(warn => {
        console.error(chalk.red.dim(`警告: ${warn}`))
      })
    process.exit(1)
  },
  async start(projectName, options) {
    const cwd = options.cwd || process.cwd()
    const inCurrent = projectName === '.'
    const name = inCurrent ? path.relative('../', cwd) : projectName
    const targetDir = path.resolve(cwd, projectName || '.')
    const { validForNewPackages, errors, warnings } = validateProjectName(name)
    // 项目名格式无效
    !validForNewPackages && this.invalid(name, { errors, warnings })
    // 项目名存在
    if (fs.existsSync(targetDir)) {
      const action = await this.exists(options, { targetDir, inCurrent })
      if (!action) return false
    }
    return {
      name,
      context: targetDir
    }
  }
}

module.exports = verify
