const execa = require('execa')

const install = cwd => {
  const command = 'npm'
  const args = ['install', '--loglevel', 'error']
  return new Promise((resolve, reject) => {
    const child = execa(command, args, {
      cwd,
      stdio: ['inherit', 'inherit', 'inherit']
    })
    child.on('close', code => {
      if (code !== 0) {
        reject(`command failed: ${command} ${args.join(' ')}`)
        return
      }
      resolve()
    })
  })
}

module.exports = install
