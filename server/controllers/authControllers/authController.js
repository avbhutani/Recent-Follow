// Update the link when in production.

const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer");
const moment = require('moment')
require('dotenv').config()
const lastTokenGeneration = {};

// Function to Check if the user has already generated the token less than 5 minutes ago, then it would not allow the user to generate the token again for next 5 minutes.
async function tokenGenerationAccess(emailId) {
    const currentTime = moment();
    
    // Check if the email already has a generated token within the last 5 minutes
    if (lastTokenGeneration[emailId]) {
        const lastGeneratedTime = moment(lastTokenGeneration[emailId]);
        const timeDifference = currentTime.diff(lastGeneratedTime, 'minutes');

        // If token was generated in the last 5 minutes, don't generate a new one
        if (timeDifference < 5) {
            return { success: false, message: 'Token already generated within the last 5 minutes' };
        }
    }
}

// Function sends the authentication token to the client's email for login
async function sendAuthenticationToken(token,emailId) {
    // One time verification link that will be sent over to the user.
    const verificationLink = `http://localhost:4000/verify?token=${token}`

    try{
        const auth = nodemailer.createTransport({
        service: "gmail",
        secure : true,
        port : 465,
        auth: {
            user: "ab.anubhav19@gmail.com",
            pass: process.env.ID_ACCESS_PASS
        }
    });

    const receiver = {
        from : "ab.anubhav19@gmail.com",
        to : emailId,
        subject : `Login Details for Recent Follow Account`,
        text : `Kindly find attached the login details for your recent follow account here.${verificationLink}
        `
    };

    auth.sendMail(receiver, (error, emailResponse) => {
        if(error)
        throw error;
        console.log("Successfully sent mail!");
    });}
    catch(error) {
        throw error;
    }
}

async function authController(req,res) {


    // receive the email id from the body of the request.
    const emailId = req.body.emailId
    console.log(emailId)

    const currentTime = moment();
    const response = tokenGenerationAccess(emailId)
    if(response.success === false)  {
        return {success: false, message: 'Token already generated within the last 5 minutes'}
    }
    // JWT payload would contain the email address for quick verification.
    const payload = {emailId}

    try {
        const token = jwt.sign(payload,process.env.JWT_KEY,{expiresIn:'10m'})
        const response = sendAuthenticationToken(token,emailId)
        res.status(200).send({
            success:'true',
            message:'Click the link in the email to log in instantly.'
        })
    } catch (error) {
        res.status(400).send(
            {   success:'false',
                message:'Something went wrong. Please try again later.'
            }
        )
    }
}


module.exports = authController