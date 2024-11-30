const express = require('express')
const authController = require('../../controllers/authControllers/authController')
const sessionController = require('../../controllers/sessionControllers/sessionController')
const authRoute = express()

// Route for Login Link Generation
authRoute.post('/verify',authController)

// Route for verification of the user or logging in the user.
authRoute.get('/verify',sessionController)

module.exports = authRoute;