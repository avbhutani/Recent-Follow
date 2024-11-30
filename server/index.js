const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const authRoute = require('./routes/authRoutes/authRoute')
const followRoute = require('./routes/followRoutes/followRoute')
const axios = require('axios')
const { createSearchIndex } = require('./models/userModel')
const adminRoute = require('./routes/adminRoutes/adminRoute')
const genericRoutes = require('./routes/genericRoutes')
require('dotenv').config()
require('./db/mongodb')
app.use(cors())
app.use(bodyParser.json())

app.use(authRoute)
app.use(followRoute)
app.use(adminRoute)
app.use(genericRoutes)

app.get('/',(req,res)=> {
    res.send({message: 'ok'})
})

// app.get('/api/fetch/followers/:username', async (req, res) => {
//     const username = req.params.username;
//     console.log('Username:', username);

//     try {
//         const apiKey = process.env.INSTA_SCRAPPER_API;
//         if (!apiKey) {
//             throw new Error('API key is missing in the environment variables');
//         }

//         const config = {
//             headers: {
//                 'x-rapidapi-host': 'instagram-scraper-api2.p.rapidapi.com',
//                 'x-rapidapi-key': apiKey
//             }
//         };

//         const followers = await axios.get(`https://instagram-scraper-api2.p.rapidapi.com/v1/followers?username_or_id_or_url=${username}`, config);
//         console.log('Followers Data:', followers.data);

//         res.status(200).send({
//             success: 'true',
//             data: followers.data,
//             message: 'Followers Fetched Successfully!'
//         });
//     } catch (error) {
//         console.error('Error:', error.message || error.response?.data);

//         res.status(500).send({
//             success: 'false',
//             message: error.response?.data || 'Error Occurred. Please Try Again!'
//         });
//     }
// });



app.listen(process.env.PORT || 4000, ()=> {
    console.log(`Server is listening on PORT ${process.env.PORT || 4000}`)
})