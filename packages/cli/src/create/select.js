const inquirer = require('inquirer')
const { clearConsole } = require('../utils/logger')

const select = async () => {
  await clearConsole()
  const { action } = await inquirer.prompt([
    {
      name: 'action',
      type: 'list',
      message: '📄  请选择要生成的模板',
      choices: [
        { name: 'Vue', value: 'vue' },
        { name: 'React', value: 'react' },
        { name: 'Koa', value: 'koa' },
        { name: 'Active-Page', value: 'activePage' }
      ]
    }
  ])
  return action
}

module.exports = select
