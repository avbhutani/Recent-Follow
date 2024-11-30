const jwt = require('jsonwebtoken')
const moment = require('moment')
require('dotenv').config()

async function checkSubscribedUser(token) {
    const decodedToken = jwt.verify(token,process.env.JWT_KEY)    
    if(decodedToken.subscriptionStatus === 'inactive') {
        return false;
    }
    else if(decodedToken.subscriptionStatus === 'active') {
        const purchaseDate = new Date(decodedToken.subscriptionPurchase)
        const expiryDate = new Date(decodedToken.subscriptionExpiry)
        const currentDate = new Date()
        if(currentDate <= expiryDate && currentDate >= purchaseDate) {
            return true;
        }
        return false;
    }
    console.log(decodedToken)
}

module.exports = checkSubscribedUser