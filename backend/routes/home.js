const express = require('express')

const router = express.Router()

// GET home page
router.get('', (req, res) => {
  //  send random posts from other users
  res.status(200).json({userPosts: ['Dubai', 'France', 'Thailand', 'Washington DC']})
})