#!/usr/bin/env node

const program = require('commander')
const minimist = require('minimist')
const chalk = require('chalk')
const semver = require('semver')
const requiredVersion = require('../package.json').engines.node
const didYouMean = require('didyoumean')
didYouMean.threshold = 0.6

const checkNodeVersion = (wanted, id) => {
  if (!semver.satisfies(process.version, wanted)) {
    console.log(chalk.red(`You are using Node ${process.version}, but this version of ${id} requires Node ${wanted} '.\nPlease upgrade your Node version.'`))
    process.exit(1)
  }
}

checkNodeVersion(requiredVersion, '@sealjs/cli')

if (semver.satisfies(process.version, '9.x')) {
  console.log(
    chalk.red(
      `You are using Node ${process.version}.\n
        Node.js 9.x has already reached end-of-life and will not be supported in future major releases.\nIt's strongly recommended to use an active LTS version instead.`
    )
  )
}

const camelize = (str) => {
  return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''))
}

const cleanArgs = (cmd) => {
  const args = {}
  cmd.options.forEach((o) => {
    const key = camelize(o.long.replace(/^--/, ''))
    if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
      args[key] = cmd[key]
    }
  })
  return args
}

program.version(`@sealjs/cli ${require('../package.json').version}`).usage('<command> [options]')

const verifyArgs = (name) => {
  if (minimist(process.argv.slice(3))._.length > 1) {
    console.log(chalk.yellow(`\n Info: You provided more than one argument. The first one will be used as the ${name}, the rest are ignored.`))
  }
}

// 创建文件
program
  .command('create <app-name>')
  .description('创建一个新项目')
  .option('-f, --force', '如果目标目录存在，则覆盖它')
  .option('-g, --git [message]', 'Force git initialization with initial commit message')
  .action((name, cmd) => {
    const options = cleanArgs(cmd)
    verifyArgs('App Name')
    if (process.argv.includes('-g') || process.argv.includes('--git')) {
      options.forceGit = true
    }
    require('../lib/create')(name, options)
  })

// 打开url
program
  .command('open <url>')
  .description('打开 url')
  .action((name, cmd) => {
    const options = cleanArgs(cmd)
    verifyArgs('Url')
    require('../lib/open')(name, options)
  })

// 启动本地服务
program
  .command('serve <path>')
  .description('启动本地服务')
  .option('-p, --port <port>', ' 使用哪个端口  ', 8000)
  .option('-o, --open', '自动打开浏览器')
  .action((name, cmd) => {
    const options = cleanArgs(cmd)
    verifyArgs('Path')
    require('../lib/serve')(name, options)
  })

// 生成随机数
program
  .command('random <length>')
  .description('生成一个随机数')
  .action((name) => {
    verifyArgs('Length')
    require('../lib/random')(name)
  })

// 输出帮助信息
program.on('--help', () => {
  console.log()
  console.log(`  运行 ${chalk.cyan('seal <command> --help')} 将会给出的命令的详细用法.`)
  console.log()
})

program
  .command('info')
  .description('打印有关环境的调试信息')
  .action(() => {
    console.log(chalk.bold('\n环境信息:'))
    require('envinfo')
      .run(
        {
          System: ['OS', 'CPU'],
          Binaries: ['Node', 'Yarn', 'npm'],
          Browsers: ['Chrome', 'Edge', 'Firefox', 'Safari'],
          npmPackages: '/**/{typescript,*vue*,@vue/*/}',
          npmGlobalPackages: ['@sealjs/cli'],
        },
        {
          showNotFound: true,
          duplicates: true,
          fullTree: true,
        }
      )
      .then(console.log)
  })

program.arguments('<command>').action((cmd) => {
  program.outputHelp()
  console.log('  ' + chalk.red(`未知的命令 ${chalk.yellow(cmd)}.`))
  console.log()
  suggestCommands(cmd)
})

program.commands.forEach((c) => c.on('--help', () => console.log()))

const enhanceErrorMessages = (methodName, log) => {
  program.Command.prototype[methodName] = function (...args) {
    if (methodName === 'unknownOption' && this._allowUnknownOption) {
      return
    }
    this.outputHelp()
    console.log(`  ${chalk.red(log(...args))}`)
    console.log()
    process.exit(1)
  }
}

enhanceErrorMessages('missingArgument', (argName) => `缺少所需的参数 ${chalk.yellow(`<${argName}>`)}.`)

enhanceErrorMessages('unknownOption', (optionName) => `未知选项 ${chalk.yellow(optionName)}.`)

enhanceErrorMessages('optionMissingArgument', (option, flag) => `缺少选项所需的参数 ${chalk.yellow(option.flags)}${flag ? `, got ${chalk.yellow(flag)}` : ''}`)

program.parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp()
}

function suggestCommands(unknownCommand) {
  const availableCommands = program.commands.map((cmd) => {
    return cmd._name
  })

  const suggestion = didYouMean(unknownCommand, availableCommands)
  if (suggestion) {
    console.log('  ' + chalk.red(`你的意思是 ${chalk.yellow(suggestion)} ?\n`))
  }
}
