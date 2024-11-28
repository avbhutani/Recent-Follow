const followersController = require('../../controllers/followersControllers/followersController')
const express = require('express')
const followingController = require('../../controllers/followingControllers/followingController')
const followRoute = express()


followRoute.get('/api/fetch/followers/:username',followersController)
followRoute.get('/api/fetch/following/:username',followingController)

module.exports = followRoute