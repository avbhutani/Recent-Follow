const express = require('express');
const addSubscriberController = require('../../controllers/adminControllers/addSubscriberController');
const adminRoute = express()


adminRoute.post('/admin/add/subscriber',addSubscriberController)



module.exports = adminRoute;