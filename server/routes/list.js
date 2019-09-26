const axios = require('axios')
const express = require('express')
const router = express()

router.get('/comments', async (req, res) => {
  const { data } = await axios.get(
    'https://jsonplaceholder.typicode.com/comments'
  )
  res.json(data)
})

router.get('/users', async (req, res) => {
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/users')
  res.json(data)
})

module.exports = router
