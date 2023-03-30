//.netlify/functions/create-payment-intent

require('dotenv').config()

const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY)

exports.handler = async (event, context) => {
  if (event.body) {
    const { cart, shipping_fee, total_amount } = JSON.parse(event.body)

    const calculateOrderAmount = () => {
      // this function generally communicate with the API, map over the item and take the data from the server to prevent malicious change on the client side
      return shipping_fee + total_amount
    }

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(),
        currency: 'eur',
      })
      return {
        statusCode: 200,
        body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message }),
      }
    }
  }

  // basic return if there is no event.body

  return {
    statusCode: 200,
    body: 'Create Payment Intent',
  }
}
