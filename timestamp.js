'use strict'

let moment = require('moment')

module.exports = function(Model) {
  Model.defineProperty('createdAt', {type: 'date'})
  Model.defineProperty('updatedAt', {type: 'date'})

  Model.observe('before save', function (ctx, next) {
    let dateTime = moment().add(3, 'hours') // псевдо московское время, по факту UTC + 3 часа (монга умеет хранить только UTC)

    if (ctx.instance) {
      if (ctx.isNewInstance) {
        ctx.instance.createdAt = dateTime
      }
      ctx.instance.updatedAt = dateTime
    } else {
      ctx.data.updatedAt = dateTime
    }
    next()
  })
}
