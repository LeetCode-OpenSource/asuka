const childProcess = require('child_process')
const { join } = require('path')

const { execOptions, extraArg } = require('./cli')

const nodeModulesBinDir = join(__dirname, '..', '..', 'node_modules', '.bin')

childProcess.execSync(
  `node --stack_size=8192 --max-old-space-size=8192 ${join(nodeModulesBinDir, 'webpack-dev-server')} --config ${join(
    __dirname,
    '..',
    'webpack',
    'webpack.config.js',
  )} --progress --color ${extraArg}`,
  execOptions,
)
