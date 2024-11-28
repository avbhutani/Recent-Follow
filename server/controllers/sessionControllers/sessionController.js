const jwt = require('jsonwebtoken');
const userModel = require('../../models/userModel');
const subscribersModel = require('../../models/subscribersModel')

require('dotenv').config();


// Function will be Logging in the user.
async function sessionController(req, res) {
    const token = req.query.token;
    const date = new Date()

    // If there's no token, send error response
    if (!token) {
        return res.status(400).send({
            success: 'false',
            message: 'Token is missing!'
        });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        const emailId = decodedToken.emailId;
        if (!emailId) {
            return res.status(400).send({
                success: 'false',
                message: 'Invalid token: emailId missing!'
            });
        }

        let subscriptionStatus = 'inactive'
        let subscriptionPurchase = 'NA'
        let subscriptionExpiry = 'NA'
        
        const getSubscriptionDetails = await subscribersModel.findOne({emailId})
        if(!getSubscriptionDetails)
        {
            console.log('User Not Subscribed')
        }

        else {
            console.log(getSubscriptionDetails)
        }
        // Find the user with the emailId
        let user = await userModel.findOne({ emailId });

        if (!user) {
            // If the user doesn't exist, create a new one
            user = new userModel({ emailId });
            await user.save();
        }

        // Generate the session token
        const payload = { emailId, 
            subscriptionStatus,
            subscriptionPurchase,
            subscriptionExpiry
        };
        const sessionToken = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '7d' });

        // Set the expiration date for the cookie (7 days)
        const date = new Date();
        date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000)); // 7 days from the current date.

        // Send response with the session token in the cookie
        return res.status(200)
            .cookie('authToken', sessionToken, { expires: date}) // add httpOnly for security
            .send({
                success: 'true',
                message: 'User Logged In Successfully!'
            });

    } catch (error) {
        // Handle errors
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(400).send({
                success: 'false',
                message: 'Invalid or expired token!'
            });
        }

        console.error(error); // Log the error for debugging
        return res.status(500).send({
            success: 'false',
            message: 'Error Occurred. Please Try Again!'
        });
    }
}

module.exports = sessionController;
