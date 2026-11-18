Original name: billing-process-daily.js
Drive ID: 1r9yb8s-hW3gwGqGM-qQ7Se74-Cizl4vH
Parent folder: My Drive/MAF/Mac Book Dump/_THELMA_COMMAND_ROOT/motive_next_deployment_bundle Nov 4/netlify/functions/
Modified: 2025-11-05T03:08:42.000Z

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const logger = require('./shared/logger');
const { sendMetric } = require('./shared/monitor');

exports.handler = async (event) => {
  logger.info('Billing process started');
  sendMetric('motive.next.billing_attempts', 1);

  try {
    const { customerId, amount } = JSON.parse(event.body);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'usd',
      customer: customerId,
      payment_method_types: ['card'],
    });

    logger.info('Billing successful', { customerId, amount });
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, paymentIntent }),
    };
  } catch (err) {
    logger.error('Billing failed', { error: err.message });
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
