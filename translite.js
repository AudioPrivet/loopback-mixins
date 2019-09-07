'use strict'

let cyrillicToTranslit = require('cyrillic-to-translit-js')

module.exports = function(Model, options) {
  Model.defineProperty(options.resultField, {type: 'string'})

  Model.observe('before save', function(ctx, next) {
    let transliteField = options.transliteField
    let resultField = options.resultField

    if (ctx.instance) {
      let translite = ctx.instance[transliteField]
      if (translite) {
        ctx.instance[resultField] = cyrillicToTranslit().transform(clearStr(translite), '-')
      }
    } else {
      let translite = ctx.data[transliteField]
      if (translite) {
        ctx.data[resultField] = cyrillicToTranslit().transform(clearStr(translite), '-')
      }
    }
    next()
  })
}

function clearStr(str) {
  return str.replace(/[^A-Za-zА-Яа-я0-9\s]/g, '').replace(/\s{2,}/g, ' ')
}
