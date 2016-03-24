// feathers mongoose
import mongoose from 'mongoose'
import service from 'feathers-mongoose'
import {
  dbConf
} from './config'

// use native promise
mongoose.Promise = global.Promise

// db connector
mongoose.connect(`mongodb://localhost:27017/${dbConf.database}`)

//schema
const User = mongoose.model('User', {
  username: String,
  password: String
})

const Message = mongoose.model('Message', {
  text: String
})

// map all models to api
// "service" is feathers service
module.exports = {
  User,
  Message,
  service
}