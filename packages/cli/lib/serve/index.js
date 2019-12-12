'use strict'
const path = require('path'),
  browser = require('open'),
  chalk = require('chalk'),
  express = require('express'),
  { getPort, getIp, parseUrl } = require('./tools'),
  { log } = require('../utils/logger'),
  app = express(),
  serve = async function(a, { port: b, open: c }) {
    const d = await getPort(b),
      e = '.' === a ? process.cwd() : a,
      f = path.isAbsolute(e) ? e : path.join(process.cwd(), e)
    app.use(express.static(f)),
      app.listen(d, async function() {
        log(),
          log(chalk.green(' \uD83C\uDF89 \u672C\u5730\u670D\u52A1\u542F\u52A8\u6210\u529F:')),
          log(`  - Local:   ${chalk.cyan(parseUrl('localhost', d))}`),
          log(`  - Network: ${chalk.cyan(parseUrl(getIp(), d))}`),
          c && (await browser(parseUrl('localhost', d, !1)))
      })
  }
module.exports = serve
