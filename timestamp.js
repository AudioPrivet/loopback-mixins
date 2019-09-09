'use strict'

module.exports = function(Model) {
  Model.defineProperty('createdAt', {type: 'date'})
  Model.defineProperty('updatedAt', {type: 'date'})

  Model.observe('before save', function (ctx, next) {
    let dateTime = new Date()
    // Псевдо локальное время сервера, к времени UTC добавляем локальное смещение
    // Это позволить управлять через настройки времени опрационной системы
    dateTime.setTime(dateTime.getTime() + (dateTime.getTimezoneOffset() * -1) * 60 * 1000); 
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
