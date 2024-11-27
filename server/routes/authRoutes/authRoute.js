const express = require('express')
const authController = require('../../controllers/authControllers/authController')
const authRoute = express()


authRoute.post('/verify',authController)

module.exports = authRoute;