const bodyParser = require('body-parser')
const compression = require('compression')
const express = require('express')
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use('/route', require('./routes/route'))
app.use(compression())

module.exports = { path: '/api/', handler: app }
