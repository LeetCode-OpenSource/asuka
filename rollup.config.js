export default [
  {
    input: './packages/http/esm/index.js',
    output: [
      {
        file: './packages/http/lib/index.js',
        format: 'cjs',
      },
      {
        file: './packages/http/esm/bundle.esm.js',
        format: 'esm',
      },
    ],
  },
  {
    input: './packages/di/esm/index.js',
    output: [
      {
        file: './packages/di/lib/index.js',
        format: 'cjs',
      },
      {
        file: './packages/di/esm/bundle.esm.js',
        format: 'esm',
      },
    ],
  },
  {
    input: './packages/utils/esm/index.js',
    output: [
      {
        file: './packages/utils/lib/index.js',
        format: 'cjs',
      },
      {
        file: './packages/utils/esm/bundle.esm.js',
        format: 'esm',
      },
    ],
  },
  {
    input: './packages/types/esm/index.js',
    output: [
      {
        file: './packages/types/lib/index.js',
        format: 'cjs',
      },
      {
        file: './packages/types/esm/bundle.esm.js',
        format: 'esm',
      },
    ],
  },
]
