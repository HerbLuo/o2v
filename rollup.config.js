import typescript from 'typescript'
import replace from 'rollup-plugin-replace'
import rollupTypescript from 'rollup-plugin-typescript'
import fse from 'fs-extra'
import commonjs from 'rollup-plugin-commonjs';

fse.emptyDirSync('lib')
fse.ensureDirSync('lib')

export default {
  input: 'index.ts',
  output: [
    {
      format: 'cjs',
      exports: 'named',
      file: 'lib/index.js',
      sourceMap: true
    },
    {
      format: 'es',
      file: 'lib/index.esm.js',
      sourceMap: true
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
    commonjs(),
    replace({
      exclude: 'node_modules/**',
      ['process.env.NODE_ENV']: JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ],
  external: [
    'react',
    'react-dom',
    'tslib',
    'styled-components',
    'color'
  ]
}
