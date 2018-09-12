import rollupTypescript from 'rollup-plugin-typescript'
import typescript from 'typescript'
import replace from 'rollup-plugin-replace'

export default {
  input: 'index.ts',

  output: [
    {
      format: 'cjs',
      exports: 'named',
      file: 'lib/index.js'
    },
    {
      format: 'es',
      file: 'lib/index.esm.js'
    },
  ],
  watch: {
    include: 'src/**',
    exclude: 'node_modules/**'
  },
  plugins: [
    rollupTypescript({
      typescript
    }),
    replace({
      exclude: 'node_modules/**',
      ['process.env.NODE_ENV']: JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ],
  external: [
    'react',
    'react-dom',
    'tslib'
  ]
}
