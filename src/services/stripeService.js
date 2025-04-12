const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (amount, currency = 'usd', metadata = {}) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      metadata
    });
    
    return paymentIntent;
  } catch (error) {
    console.error('Stripe payment intent error:', error);
    throw error;
  }
};

const createCheckoutSession = async (lineItems, successUrl, cancelUrl, metadata = {}) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata
    });
    
    return session;
  } catch (error) {
    console.error('Stripe checkout session error:', error);
    throw error;
  }
};

const handleWebhookEvent = async (event) => {
  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        return { status: 'success', event: event.type };
        
      case 'payment_intent.payment_failed':
        return { status: 'failed', event: event.type };
        
      default:
        return { status: 'unhandled', event: event.type };
    }
  } catch (error) {
    console.error('Stripe webhook error:', error);
    throw error;
  }
};

module.exports = {
  createPaymentIntent,
  createCheckoutSession,
  handleWebhookEvent
};
