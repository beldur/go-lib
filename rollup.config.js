import babel from 'rollup-plugin-babel'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import uglify from 'rollup-plugin-uglify'
import serve from 'rollup-plugin-serve'

const env = process.env.NODE_ENV

const config = {
  format: 'umd',
  moduleName: 'GoLib',
  external: ['react', 'prop-types'],
  globals: {
    react: 'React',
    'prop-types': 'PropTypes',
  },
  plugins: [
    nodeResolve({
      jsnext: true,
      main: true,
    }),
    commonjs({
      include: 'node_modules/**',
    }),
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers'],
    }),
  ],
}

if (env === 'production') {
  config.plugins.push(uglify())
}

if (env === 'serve') {
  config.plugins.push(serve(['example', 'dist']))
}

export default config
