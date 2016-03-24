'use strict'

module.exports = function (api, models, _) {

  api.use('/messages', models.service({
    Model: models.Message
  }))

}