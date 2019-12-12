const path = require('path')
const chalk = require('chalk')
const execa = require('execa')
const install = require('./install')
const fileServer = require('./fileServer')
const { logWithSpinner, stopSpinner } = require('../utils/spinner')
const { clearConsole, log } = require('../utils/logger')

class Creator {
  constructor(name, context) {
    this.name = name
    this.context = context
    this.run = this.run.bind(this)
  }
  async create(options, template) {
    const { run, name, context } = this

    await clearConsole()
    logWithSpinner('✨', `在 ${chalk.yellow(context)} 中生成项目`)
    stopSpinner()

    log('🚀  创建文件...')
    const templatePath = path.join(__dirname, `./template/${template}`)
    const files = await fileServer.read(templatePath, {
      list: ['README.md', 'package.json', 'public/index.html'],
      options: {
        projectName: name
      }
    })
    fileServer.write(context, files) // 写文件
    if (options.forceGit) {
      logWithSpinner('🗃', ' 初始化 git ...')
      await run('git init')
    }
    stopSpinner()

    log('📦  安装依赖文件...')
    await install(context)
    log()
    log(`🎉  创建 ${chalk.green(name)} 项目成功.`)
    log(`👉  开始使用以下命令，遨游代码的世界吧\n\n${context === process.cwd() ? '' : chalk.cyan(` ${chalk.gray('$')} cd ${name}\n`)}${chalk.cyan(` ${chalk.gray('$')} ${'npm run serve'}`)}`)
  }
  run(command, args) {
    if (!args) {
      ;[command, ...args] = command.split(/\s+/)
    }
    return execa(command, args, { cwd: this.context })
  }
}

module.exports = Creator
