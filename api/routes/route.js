const express = require('express')
const router = express.Router()

router.use(function timeLog(req, res, next) {
  next()
})

// router.get('/', (req, res) => client.method(req, res))

module.exports = router
