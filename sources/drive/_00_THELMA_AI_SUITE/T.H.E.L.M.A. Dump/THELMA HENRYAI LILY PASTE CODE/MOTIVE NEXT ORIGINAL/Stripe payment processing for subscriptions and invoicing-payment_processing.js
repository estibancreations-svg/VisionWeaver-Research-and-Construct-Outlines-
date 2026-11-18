Original name: Stripe payment processing for subscriptions and invoicing-payment_processing.js
Drive ID: 1G2J8ADkpyWCjTRrEr792pT_GoY9FMPl0
Parent folder: _00_THELMA_AI_SUITE/T.H.E.L.M.A. Dump/THELMA HENRYAI LILY PASTE CODE/MOTIVE NEXT ORIGINAL/
Modified: 2025-11-06T00:07:06.000Z

// netlify/functions/payment-process.js
// Stripe payment processing for subscriptions and invoicing

exports.handler = async (event, context) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    try {
        const { action, plan, userId, paymentMethodId } = JSON.parse(event.body);
        
        // Stripe integration (requires stripe npm package and API key)
        const stripeKey = process.env.STRIPE_SECRET_KEY;
        
        if (!stripeKey) {
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    demo: true,
                    message: 'Configure STRIPE_SECRET_KEY for live payments',
                    plan: plan,
                    amount: getPlanAmount(plan)
                })
            };
        }

        const stripe = require('stripe')(stripeKey);

        if (action === 'create-subscription') {
            // Create subscription
            const customer = await stripe.customers.create({
                payment_method: paymentMethodId,
                email: userId,
                invoice_settings: { default_payment_method: paymentMethodId }
            });

            const subscription = await stripe.subscriptions.create({
                customer: customer.id,
                items: [{ price: getPlanPriceId(plan) }],
                expand: ['latest_invoice.payment_intent']
            });

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    success: true,
                    subscriptionId: subscription.id,
                    status: subscription.status,
                    currentPeriodEnd: subscription.current_period_end
                })
            };
        }

        if (action === 'create-invoice') {
            // Daily billing for driveaway services
            const invoice = await stripe.invoices.create({
                customer: userId,
                auto_advance: true,
                collection_method: 'charge_automatically'
            });

            await stripe.invoiceItems.create({
                customer: userId,
                invoice: invoice.id,
                amount: 7500, // $75.00
                currency: 'usd',
                description: 'Daily driveaway service - 7PM EST billing'
            });

            const finalizedInvoice = await stripe.invoices.finalizeInvoice(invoice.id);

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    success: true,
                    invoiceId: finalizedInvoice.id,
                    amountDue: finalizedInvoice.amount_due,
                    status: finalizedInvoice.status
                })
            };
        }

    } catch (error) {
        console.error('Payment Error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Payment processing failed' })
        };
    }
};

function getPlanAmount(plan) {
    const amounts = {
        'basic': 3000,       // $30/month
        'professional': 5000, // $50/month
        'enterprise': 7000    // $70/month
    };
    return amounts[plan] || 3000;
}

function getPlanPriceId(plan) {
    // Map to Stripe Price IDs (set in Stripe Dashboard)
    return process.env[`STRIPE_PRICE_${plan.toUpperCase()}`] || 'price_default';
}