const stripe = require('../payments/stripeconfig')

async function createPaymentIntent(req, res) {
    try {
        const { amount } = req.body

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'eur',
            description: 'Payment for products'
        })
        res.status(200).json({ clientSecret: paymentIntent.client_secret })
    }
    catch (err) {
        console.error(err)
        res.status(500).json({ err })
    }


}

module.exports = { createPaymentIntent }