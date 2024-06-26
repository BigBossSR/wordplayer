// rollup.config.js
import babel from '@rollup/plugin-babel';

export default [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.js',
      format: 'es',
      sourcemap: true
    },
    plugins: [
      babel({
        babelHelpers: 'bundled',
        presets: ['@babel/preset-env']
      })
    ]
  },
  {
    input: 'src/web-components/index.js',
    output: {
      file: 'dist/web-components/index.js',
      format: 'es',
      sourcemap: true
    },
    plugins: [
      babel({
        babelHelpers: 'bundled',
        presets: ['@babel/preset-env']
      })
    ]
  }
];
