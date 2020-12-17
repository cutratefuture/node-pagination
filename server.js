var express = require('express')
var ejs = require('ejs')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var app = express()
var mainRoutes = require('./routes/main')

require('dotenv').config()

app.use(mainRoutes)
//db connection
const uri = process.env.MONGODB_URI
mongoose.connect(`${uri}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
const db = mongoose.connection
db.on('error', console.log.bind(console, 'connection error'))
db.once('open', (callback) => {
  console.log('connection succeeded')
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.set('view engine', 'ejs')

//server
const LOCAL = process.env.LOCAL || 'localhost'
const PORT = process.env.PORT || '5400'
const NODE_ENV = process.env.NODE_ENV
app.set('port', PORT)
app.listen(PORT, (err) => {
  if (err) throw err
  console.log(`${NODE_ENV} server started...`)
  console.log(`http://localhost:${PORT}`)
  console.log(`http://${LOCAL}:${PORT}`)
})