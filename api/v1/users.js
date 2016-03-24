'use strict'

module.exports = function (api, models, hooks, authHooks, _) {

  api.use('/users', models.service({
    Model: models.User
  }))

  // hooks
  api.service('users').before({
    create: authHooks.hashPassword()
  })

}