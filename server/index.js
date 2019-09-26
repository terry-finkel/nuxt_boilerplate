const http = require('http')
const consola = require('consola')
const express = require('express')
const bodyParser = require('body-parser')
const { Builder, Nuxt } = require('nuxt')
const app = express()

app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(bodyParser.json())

const router = express.Router()
app.use('/', router)

// Import and set Nuxt.js options
const config = require('../nuxt.config')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  app.get('/status', (req, res) => {
    res.send({ status: 'UP' })
  })
  app.use('/api/list', require('./routes/list'))

  app.use(nuxt.render)
  http
    .createServer(app)
    .listen(process.env.NUXT_HTTP_PORT, process.env.NUXT_HOST)

  consola.ready({
    message: `Server listening on http://${process.env.NUXT_HOST}:${process.env.NUXT_HTTP_PORT}`,
    badge: true
  })
}

start()
