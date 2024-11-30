const express = require('express')
const usernameSearches = require('../controllers/usernameSearchesControllers/usernameSearches')
const genericRoutes = express()

genericRoutes.post('/',usernameSearches)


module.exports = genericRoutes