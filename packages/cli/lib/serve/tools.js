'use strict'
const url = require('url'),
  chalk = require('chalk'),
  address = require('address'),
  portfinder = require('portfinder'),
  defaultGateway = require('default-gateway')
module.exports = {
  getPort(a) {
    return new Promise(function(b) {
      portfinder
        .getPortPromise({ port: a })
        .then(function(a) {
          b(a)
        })
        .catch(function(a) {
          console.log(`getPort failed ${chalk.red(a)}.`), console.log(a)
        })
    })
  },
  parseUrl(a, b, c = !0, d = '/') {
    return url.format({ protocol: 'http', hostname: a, port: c ? chalk.bold(b) : b, pathname: d })
  },
  getIp() {
    const a = defaultGateway.v4.sync()
    return address.ip(a && a.interface)
  }
}
