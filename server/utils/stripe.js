const { Stripe } = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SK);

const createStripeCustomer = async ({ email }) => {
  const { data } = await stripe.customers.list({ email });
  return data.length === 0 ? stripe.customers.create({ email }) : data[0];
};

const attachPaymentMethod = async ({ customer, id }) => {
  const paymentMethod = await stripe.paymentMethods.list({
    customer: customer,
    type: "card",
  });
  return stripe.paymentMethods.attach(id, { customer });
};

const paymentIntent = async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.amount,
    currency: req.currency,
    metadata: { integration__check: "accept_a_payment" },
  });
  return paymentIntent;
};

module.exports = { createStripeCustomer, attachPaymentMethod, paymentIntent };
