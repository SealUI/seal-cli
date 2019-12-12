'use strict'
const ejs = require('ejs'),
  path = require('path'),
  slash = require('slash'),
  fs = require('fs-extra'),
  globby = require('globby'),
  rimraf = require('rimraf'),
  { isBinaryFileSync } = require('isbinaryfile'),
  fileServer = {
    normalizeFilePaths(a) {
      return (
        Object.keys(a).forEach(function(b) {
          const c = slash(b)
          b !== c && ((a[c] = a[b]), delete a[b])
        }),
        a
      )
    },
    async delete(a, b) {
      return (
        await rimraf.sync(`${a}/*`),
        Promise.all(
          b.map(async function(b) {
            await rimraf.sync(`${a}/${b}`)
          })
        )
      )
    },
    async list(a) {
      const b = await globby(['**'], { cwd: a, onlyFiles: !0, gitignore: !0, dot: !0, ignore: ['**/node_modules/**', '**/.git/**'] })
      return b
    },
    async read(a, b) {
      const c = {},
        d = await this.list(a)
      for (const e of d) {
        const b = path.resolve(a, e)
        c[e] = isBinaryFileSync(b) ? fs.readFileSync(b) : fs.readFileSync(b, 'utf-8')
      }
      return (
        b &&
          Object.keys(c).forEach(function(a) {
            b.list.includes(a) && (c[a] = ejs.render(c[a], b.options))
          }),
        this.normalizeFilePaths(c)
      )
    },
    write(a, b) {
      Object.keys(b).forEach(function(c) {
        const d = path.join(a, c)
        fs.ensureDirSync(path.dirname(d)), fs.writeFileSync(d, b[c])
      })
    }
  }
module.exports = fileServer
