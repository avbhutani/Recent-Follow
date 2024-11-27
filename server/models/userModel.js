const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type:String,
        required:true,
        unique:true,
        validate: {
            validator: function(v) {
                // Regular expression to validate email format
                return /\S+@\S+\.\S+/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    
    subscriptionStatus: {
        type:String,
        enum:['active','inactive'],
        default:'inactive'
    },
    subscriptionExpiry: {
        type:Date,
        validate: {
            validator: function(v) {
                // Ensure that subscriptionExpiry is after subscriptionPurchase
                return v > this.subscriptionPurchase;
            },
            message: props => 'Subscription expiry must be after the purchase date!'
        }
    },
    subscriptionPurchase: {
        type:Date,
        required:true
    },

    // can be used to target the users, with high renewal rate.
    subscriptionFrequency: 
    {
        type:Number,
        default:0,
        min: [0, 'Subscription frequency cannot be negative']
    }
},{timestamps:true})

// indexing to make the retrival of the data faster.
userSchema.index({subscriptionStatus:1})

const userModel = mongoose.model('user',userSchema)


module.exports = userModel;