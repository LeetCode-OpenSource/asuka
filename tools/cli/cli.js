const fs = require('fs')
const { join } = require('path')

const project = process.argv[2]

const projectPath =
  process.cwd() === join(__dirname, '..', '..') ? join(process.cwd(), 'packages', project) : process.cwd()

if (!fs.existsSync(projectPath)) {
  throw new TypeError(`packages/${project} is not existed`)
}

const execOptions = {
  stdio: [0, 1, 2],
  env: {
    NODE_ENV: 'development',
    PROJECT_PATH: projectPath,
    project,
    ...process.env,
  },
}

module.exports.execOptions = execOptions
module.exports.extraArg = process.argv.slice(3).join(' ')
module.exports.project = project
