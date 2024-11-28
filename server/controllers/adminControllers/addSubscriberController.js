const subscribersModel = require('../../models/subscribersModel')
const moment = require('moment')

async function addSubscriberController(req,res) {
    const {emailId,subscriptionPurchase,subscriptionExpiry,subscriptionStatus} = req.body
    const purchaseDate = moment(subscriptionPurchase, 'DD-MM-YYYY').toDate();  
    const expiryDate = moment(subscriptionExpiry, 'DD-MM-YYYY').toDate();
    try {
        const newSubscriber = new subscribersModel({
            emailId,
            subscriptionPurchase:purchaseDate,
            subscriptionExpiry:expiryDate,
            subscriptionStatus
        })

        await newSubscriber.save()
        res.status(200).send(
            {
                success:'true',
                message:'Added Subscriber Successfully!',
                newSubscriber
            }
        )
    } catch (error) {
        res.status(500).send(
            {
                success:'false',
                message:'Not able to add User. Check logs!',
                error
            }
        )
    }
}

module.exports = addSubscriberController