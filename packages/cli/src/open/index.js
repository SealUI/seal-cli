const browser = require('open')
const { parse } = require('url')

const open = async url => {
  const { protocol } = parse(url)
  const website = protocol ? url : `http://${url}`
  await browser(website)
}
module.exports = open
