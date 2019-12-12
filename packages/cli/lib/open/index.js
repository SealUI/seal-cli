'use strict'
const browser = require('open'),
  { parse } = require('url'),
  open = async function(a) {
    const { protocol: b } = parse(a),
      c = b ? a : `http://${a}`
    await browser(c)
  }
module.exports = open
