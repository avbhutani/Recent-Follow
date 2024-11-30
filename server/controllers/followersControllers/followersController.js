const axios = require('axios');
const usernameSearches = require('../usernameSearchesControllers/usernameSearches');
const checkSubscribedUser = require('../../utility/checkSubscribedUser');
require('dotenv').config()

async function followersController(req,res) {
    // const username = req.params.username
    // console.log(username)
    // Write the tests to check 
    const token = req.headers.authtoken
    console.log(token)
    const subscribedUser = await checkSubscribedUser(token)
    console.log('Check herre the value')
    console.log(subscribedUser)
    
    // If all the tests pass and now the user can fetch the data.
    
    const username = req.params.username;
    console.log('Username:', username);

    // Checks if the username search quota is remaining or not.
    const usernameSearchQuota = await usernameSearches(username)
    if(!subscribedUser && !usernameSearchQuota) {
        console.log('Quota finished!')
        return res.status(500).send(
            {
                success:'false',
                message:'Username Limit is reached!'
            }
        )
    }
    // Checks if the username search quota is remaining or not.


    try {
        const apiKey = process.env.INSTA_SCRAPPER_API;
        if (!apiKey) {
            throw new Error('API key is missing in the environment variables');
        }

        const config = {
            headers: {
                'x-rapidapi-host': 'instagram-scraper-api2.p.rapidapi.com',
                'x-rapidapi-key': apiKey
            }
        };

        const followers = await axios.get(`https://instagram-scraper-api2.p.rapidapi.com/v1/followers?username_or_id_or_url=${username}`, config);
        console.log('Followers Data:', followers.data);

        res.status(200).send({
            success: 'true',
            data: followers.data.data.items,
            message: 'Followers Fetched Successfully!'
        });
    } catch (error) {
        console.error('Error:', error.message || error.response?.data);

        res.status(500).send({
            success: 'false',
            message: error.response?.data || 'Error Occurred. Please Try Again!'
        });
    }
}

module.exports = followersController