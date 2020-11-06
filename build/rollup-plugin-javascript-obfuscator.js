const JavaScriptObfuscator = require('javascript-obfuscator')

function javascriptObfuscator(options) {
  if ( options === void 0 ) options = {}

  return {
    name: 'javascript-obfuscator',

    renderStart() {
    },
    renderChunk(code) {
      var obfuscationResult = JavaScriptObfuscator.obfuscate(code, options)
      var result = {code: obfuscationResult.getObfuscatedCode()}

      if (options.sourceMap && options.sourceMapMode !== 'inline') {
        result.map = obfuscationResult.getSourceMap();
      }

      return result
    },
    generateBundle() {
    }
  }
}

module.exports = javascriptObfuscator
