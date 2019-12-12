'use strict'
const inquirer = require('inquirer'),
  { clearConsole } = require('../utils/logger'),
  select = async function() {
    await clearConsole()
    const { action: a } = await inquirer.prompt([
      {
        name: 'action',
        type: 'list',
        message: '\uD83D\uDCC4  \u8BF7\u9009\u62E9\u8981\u751F\u6210\u7684\u6A21\u677F',
        choices: [
          { name: 'Vue', value: 'vue' },
          { name: 'React', value: 'react' },
          { name: 'Koa', value: 'koa' },
          { name: 'Active-Page', value: 'activePage' }
        ]
      }
    ])
    return a
  }
module.exports = select
