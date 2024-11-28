const axios = require('axios')
require('dotenv').config()

async function followingController(req,res) {
    const username = req.params.username


    // If every other check passes, then just fetch the response from the API.
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

        const followers = await axios.get(`https://instagram-scraper-api2.p.rapidapi.com/v1/following?username_or_id_or_url=${username}`, config);
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

module.exports = followingController