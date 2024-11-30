const mongoose = require('mongoose')

const usernameSearchesSchema = new mongoose.Schema({
    username: {
        type:String,
        required:true
    },
    searchCount: {
        type:Number,
        default:1
    }
})


const usernameSearchesModel = mongoose.model('usernameSearches',usernameSearchesSchema)
module.exports = usernameSearchesModel