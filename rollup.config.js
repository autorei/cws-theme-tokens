import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import resolve from 'rollup-plugin-node-resolve'
import serve from 'rollup-plugin-serve'
import { terser } from 'rollup-plugin-terser'

import pkg from './package.json'

const production = !process.env.ROLLUP_WATCH

const rollupConfig = () => {
  if (production) {
    return [
      {
        input: 'src/main.js',
        output: {
          file: pkg.main,
          format: 'cjs'
        },
        plugins: [
          resolve(),
          commonjs(),
          json(),
          babel({
            exclude: 'node_modules/**',
            babelrc: false,
            presets: [
              [
                '@babel/env',
                {
                  modules: false,
                  useBuiltIns: "usage",
                  targets: 'maintained node versions'
                }
              ]
            ]
          })
        ]
      },
      {
        input: 'src/main.js',
        output: {
          file: pkg.browser,
          format: 'umd',
          name: 'cwsThemeTokens'
        },
        plugins: [
          resolve(),
          commonjs(),
          json(),
          babel({
            exclude: 'node_modules/**'
          })
        ]
      },
      {
        input: 'src/main.js',
        output: {
          file: pkg.browser.replace(/\.js$/, '.min.js'),
          format: 'umd',
          name: 'cwsThemeTokens'
        },
        plugins: [
          resolve(),
          commonjs(),
          json(),
          babel({
            exclude: 'node_modules/**'
          }),
          terser()
        ]
      },
      {
        input: 'src/main.js',
        output: {
          file: pkg.module,
          format: 'es'
        },
        plugins: [
          resolve(),
          commonjs(),
          json(),
          babel({
            exclude: 'node_modules/**'
          })
        ]
      },
      {
        input: 'src/main.js',
        output: {
          file: 'public/cws-theme-tokens.js',
          format: 'umd',
          name: 'cwsThemeTokens'
        },
        plugins: [
          resolve(),
          commonjs(),
          json(),
          babel({
            exclude: 'node_modules/**'
          }),
        ]
      }
    ]
  }
  else {
    return {
      input: 'src/main.js',
      output: {
        file: 'public/cws-theme-tokens.js',
        format: 'umd',
        name: 'cwsThemeTokens'
      },
      plugins: [
        resolve(),
        commonjs(),
        json(),
        babel({
          exclude: 'node_modules/**'
        }),
        serve('public')
      ]
    }
  }
}

export default rollupConfig()
