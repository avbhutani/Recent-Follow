const mongoose = require('mongoose') 

const subscribersSchema = new mongoose.Schema({
    email: {
        type:String,
        required:true,
        unique:true,
        validate: {
            validator: function(v) {
                // Regular expression to validate the email format
                return /\S+@\S+\.\S+/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    subscriptionPurchase: {
        type:Date
    },
    subscriptionExpiry: {
        type:Date,
        required: true,
        validate: {
            validator: function(v) {
                // Ensure that the subscription expiry is after the purchase date
                return v > this.subscriptionPurchase;
            },
            message: props => `Subscription expiry must be after the purchase date!`
        }
    },
    subscriptionStatus: {
        type:String,
        enum:['active','inactive'],
        default:'active'
    },
    // Max number of API requests allowed.
    requestMaxCount: {
        type:Number,
        default: 9999
    },
    // Current number of API requests..
    requestCurrentCount: {
        type:Number,
        default: 0,
        validate: {
            validator: function(v) {
                // Ensure the current count doesn't exceed the max count
                return v <= this.requestMaxCount;
            },
            message: props => `Request count cannot exceed the maximum allowed count of ${this.requestMaxCount}`
        }

    }
},{timestamps:true})


const subscribersModel = new mongoose.model('subscribers',subscribersSchema)
module.exports = subscribersModel