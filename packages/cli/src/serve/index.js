const path = require('path')
const browser = require('open')
const chalk = require('chalk')
const express = require('express')
const { getPort, getIp, parseUrl } = require('./tools')
const { log } = require('../utils/logger')
const app = express()

const serve = async (target, { port, open }) => {
  const serverPort = await getPort(port)
  const inCurrent = target === '.'
  const name = inCurrent ? process.cwd() : target
  const cwd = path.isAbsolute(name) ? name : path.join(process.cwd(), name)
  app.use(express.static(cwd))
  app.listen(serverPort, async () => {
    log()
    log(chalk.green(' 🎉 本地服务启动成功:'))
    log(`  - Local:   ${chalk.cyan(parseUrl('localhost', serverPort))}`)
    log(`  - Network: ${chalk.cyan(parseUrl(getIp(), serverPort))}`)
    if (open) {
      await browser(parseUrl('localhost', serverPort, false))
    }
  })
}

module.exports = serve
