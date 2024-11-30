const followersController = require('../../controllers/followersControllers/followersController')
const express = require('express')
const checkAuthToken = require('../../utility/checkAuthToken')
const followingController = require('../../controllers/followingControllers/followingController')
const followRoute = express()


followRoute.get('/api/fetch/followers/:username',(req,res,next) => {
    const token = req.headers.authtoken 
    if(!token) {
        res.status(400).send(
            {
                success:'false',
                message:'Kindly Login!'
            }
        )
    }
    next()
},followersController)
followRoute.get('/api/fetch/following/:username',(req,res,next) => {
    const token = req.headers.authtoken 
    if(!token) {
        res.status(400).send(
            {
                success:'false',
                message:'Kindly Login!'
            }
        )
    }
    next()
},followingController)

module.exports = followRoute