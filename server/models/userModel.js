const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    emailId: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                // Regular expression to validate email format
                return /\S+@\S+\.\S+/.test(v);
            },
            message: (props) => `${props.value} is not a valid email!`
        }
    },
    subscriptionStatus: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    subscriptionExpiry: {
        type: Date,
        validate: [
            {
                validator: function (v) {
                    // Only validate if subscriptionStatus is 'active'
                    return this.subscriptionStatus === 'inactive' || (v && v > this.subscriptionPurchase);
                },
                message: 'Subscription expiry must be after the purchase date!'
            }
        ]
    },
    subscriptionPurchase: {
        type: Date,
        validate: [
            {
                validator: function (v) {
                    // Only validate if subscriptionStatus is 'active'
                    return this.subscriptionStatus === 'inactive' || !!v;
                },
                message: 'Subscription purchase date is required when the subscription is active!'
            }
        ]
    },
    subscriptionFrequency: {
        type: Number,
        default: 0,
        min: [0, 'Subscription frequency cannot be negative']
    }
}, { timestamps: true });

// Indexing to make the retrieval of the data faster.
userSchema.index({ subscriptionStatus: 1 });

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
