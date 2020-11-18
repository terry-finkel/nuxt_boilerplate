require('dotenv').config()
const fs = require('fs')
const http = require('http')
const https = require('https')
const compression = require('compression')
const { Nuxt, Builder } = require('nuxt')
const consola = require('consola')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(compression())

app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use(bodyParser.json())

const router = express.Router()
app.use('/', router)

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

// Transform req & res to have the same API as express
// So we can use res.status() & res.json()
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server

  if (!config.dev) {
    const httpsOptions = {
      key: fs.readFileSync(process.env.SSL_KEYFILE || 'server.key'),
      cert: fs.readFileSync(process.env.SSL_CRTFILE || 'server.crt')
    }
    https.createServer(httpsOptions, app).listen(process.env.NUXT_HTTPS_PORT, process.env.NUXT_HOST)
    consola.ready({
      message: `Server listening on https://${process.env.NUXT_HOST}:${process.env.NUXT_HTTPS_PORT}`,
      badge: true
    })
  } else {
    http.createServer(app).listen(process.env.NUXT_HTTP_PORT, process.env.NUXT_HOST)
    consola.ready({
      message: `Server listening on http://${process.env.NUXT_HOST}:${process.env.NUXT_HTTP_PORT}`,
      badge: true
    })
  }
}

start()
