//
import fs from 'fs'
import path from 'path'

// utils
import _ from 'lodash'
import moment from 'moment'
import async from 'async'

// feathers dependency
import feathers from 'feathers'
import rest from 'feathers-rest'
import hooks from 'feathers-hooks'
import authentication from 'feathers-authentication'
import handler from 'feathers-errors/handler'
import memory from 'feathers-memory'
import bodyParser from 'body-parser'

// mongo collections
import models from './models'

// config
import config, {
  serverConf,
  apiConf
} from './config'

const authHooks = authentication.hooks

// api list
const features = fs.readdirSync(path.join(__dirname, 'api', 'v1'))

// api config, breaking chain because i don't like it
const api = feathers()

api.configure(rest())
  // bodyParser should before authentication
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({
    extended: true
  }))
  .configure(hooks())
  .use(handler())
  .configure(authentication())
  .use(function (error, req, res, next) {
    res.status(error.code).json(error)
  })

// use api
features.forEach(function (feature) {
  require(`.${apiConf.url.v1}/${feature}`)(api, models, hooks, authHooks, _)
})

// run server
api.listen(serverConf.port, function () {
  console.log('running at %s', serverConf.port)
})