const mongoose = require('mongoose')

const usernameSearchesSchema = new mongoose.Schema({
    username: {
        type:String,
        required:true
    },
    searchCount: {
        type:Number,
        default:0
    }
})


const usernameSearches = mongoose.model('usernameSearches',usernameSearchesSchema)
module.exports = usernameSearches