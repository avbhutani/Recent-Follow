const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const authRoute = require('./routes/authRoutes/authRoute')
require('dotenv').config()
require('./db/mongodb')
app.use(cors())
app.use(bodyParser.json())

app.use(authRoute)

app.get('/',(req,res)=> {
    res.send({message: 'ok'})
})



app.listen(process.env.PORT || 4000, ()=> {
    console.log(`Server is listening on PORT ${process.env.PORT || 4000}`)
})