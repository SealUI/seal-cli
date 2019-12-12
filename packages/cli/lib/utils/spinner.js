'use strict'
const ora = require('ora'),
  chalk = require('chalk'),
  spinner = ora()
let lastMsg = null,
  isPaused = !1
;(exports.logWithSpinner = function(a, b) {
  b || ((b = a), (a = chalk.green('\u2714'))),
    lastMsg && spinner.stopAndPersist({ symbol: lastMsg.symbol, text: lastMsg.text }),
    (spinner.text = ` ${b}`),
    (lastMsg = { symbol: `${a} `, text: b }),
    spinner.start()
}),
  (exports.stopSpinner = function(a) {
    lastMsg && !1 !== a ? spinner.stopAndPersist({ symbol: lastMsg.symbol, text: a || lastMsg.text }) : spinner.stop(), (lastMsg = null)
  }),
  (exports.pauseSpinner = function() {
    spinner.isSpinning && (spinner.stop(), (isPaused = !0))
  }),
  (exports.resumeSpinner = function() {
    isPaused && (spinner.start(), (isPaused = !1))
  }),
  (exports.failSpinner = function(a) {
    spinner.fail(a)
  })
