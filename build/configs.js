const path = require('path')
const buble = require('@rollup/plugin-buble')
const { uglify } = require('rollup-plugin-uglify')
const javascriptObfuscator = require('./rollup-plugin-javascript-obfuscator')

const resolve = _path => path.resolve(__dirname, '../', _path)

const JSOptions = {
  umdDev: {
    input: resolve('src/index.js'),
    file: resolve('dist/pill.js'),
    format: 'umd'
  },
  umdObfuscate: {
    input: resolve('src/index.js'),
    file: resolve('dist/pill.obf.js'),
    format: 'umd',
    plugins: [
      javascriptObfuscator({
        compact: false,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 1,
        numbersToExpressions: true,
        simplify: true,
        shuffleStringArray: true,
        splitStrings: true,
        stringArrayThreshold: 1,
        // debugProtection: true,
        selfDefending: true
      })
    ]
  },
  // umdCjs: {
  //   input: resolve('src/index.js'),
  //   file: resolve('dist/pill.cjs.js'),
  //   format: 'cjs'
  // },
  umdPord: {
    input: resolve('src/index.js'),
    file: resolve('dist/pill.min.js'),
    format: 'umd',
    plugins: [uglify()]
  },
  esm: {
    input: resolve('src/index.js'),
    file: resolve('dist/pill.esm.js'),
    format: 'es'
  }
}

function genConfig (opt) {
  return {
    input: {
      input: opt.input,
      plugins: [ buble(), ...(opt.plugins || []) ]
    },
    output: {
      file: opt.file,
      format: opt.format,
      name: 'pill'
    }
  }
}

function mapOpts (opts, fn) {
  return Object.keys(opts).map(key => {
    return fn(opts[key])
  })
}

module.exports = {
  js: mapOpts(JSOptions, genConfig)
}
