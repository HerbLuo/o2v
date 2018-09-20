import typescript from 'typescript'
import less from 'rollup-plugin-less'
import replace from 'rollup-plugin-replace'
import rollupTypescript from 'rollup-plugin-typescript'
import fse from 'fs-extra'

fse.emptyDirSync('lib')
fse.ensureDirSync('lib')

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
    include: ['index.ts', 'src/**'],
    exclude: 'node_modules/**'
  },
  plugins: [
    rollupTypescript({
      typescript
    }),
    less({
      output: 'lib/o2v.css',
      insert: true
    }),
    replace({
      exclude: 'node_modules/**',
      ['process.env.NODE_ENV']: JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ],
  external: [
    'react',
    'react-dom',
    'tslib',
    'styled-components'
  ]
}
