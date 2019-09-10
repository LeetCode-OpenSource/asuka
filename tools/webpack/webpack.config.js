const { join } = require('path')
const os = require('os')
const webpack = require('webpack')

const HappyPack = require('happypack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length - 1 })

const projectPath = process.env.PROJECT_PATH
const project = process.env.project

const packageJson = require(join(projectPath, 'package.json'))

console.assert(
  !!packageJson.main,
  `main field is not existed in ${join(projectPath, 'package.json')}, which would be used as webpack entry`,
)

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  context: projectPath,

  entry: [packageJson.main],

  mode: 'development',

  output: {
    webassemblyModuleFilename: '[modulehash].wasm',
    path: join(__dirname, '..', 'dist', project),
    chunkFilename: '[name].[hash].js',
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.gql', '.graphql', '.wasm'],
    modules: [join(__dirname, '..', '..', 'node_modules')],
    alias: {
      '~': join(projectPath, 'src'),
      assets: join(projectPath, 'assets'),
    },
  },

  devtool: '#@cheap-module-source-map',

  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
    minimize: false,
  },

  devServer: {
    hot: true,
    proxy: {
      '/graphql': 'http://localhost:8000',
      changeOrigin: true,
    },
  },

  externals: {
    benchmark: 'Benchmark',
  },

  module: {
    rules: [
      {
        test: /\.wasm$/,
        type: 'webassembly/experimental',
      },
      {
        test: /\.(t|j)sx?$/,
        loader: 'happypack/loader?id=sourcemap',
        enforce: 'pre',
        include: [join(projectPath, './src')],
      },
      {
        test: /\.tsx?$/,
        use: 'happypack/loader?id=ts',
        exclude: /node_modules/,
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: false,
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new HappyPack({
      id: 'ts',
      loaders: [
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            happyPackMode: true,
            configFile: join(projectPath, 'tsconfig.json'),
          },
        },
      ],
      threadPool: happyThreadPool,
    }),

    new HappyPack({
      id: 'sourcemap',
      loaders: ['source-map-loader'],
      threadPool: happyThreadPool,
    }),

    new HtmlWebpackPlugin({
      template: join(projectPath, 'index.html'),
    }),

    new webpack.HotModuleReplacementPlugin(),
  ],
}
