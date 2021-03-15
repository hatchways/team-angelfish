const express = require("express");
const router = express.Router();

const stripe = require("stripe")(process.env.STRIPE_SK);

const makePayment = async (req, res) => {
  const customer = req.body.stripeId;
  let session;
  if (customer) {
    session = await stripe.checkout.sessions.create({
      payment_intent_data: {
        setup_future_usage: "off_session",
      },

      /* Note: Customer can change email in form if using key 'customer'. No fix that I could find
      'customer_email' creates a new customer everytime but doesn't allow customer to change email in form*/

      // customer_email: req.body.email,
      customer: req.body.stripeId,
      payment_method_types: ["card"],
      line_items: [
        {
          currency: req.body.currency,
          amount: req.body.amount,
          name: req.body.details,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/error",
    });

    res.json({ id: session.id });
  } else {
    session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          currency: req.body.currency,
          amount: req.body.amount,
          name: req.body.details,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/error",
    });

    res.json({ id: session.id });
  }
};

router.post("/checkout-session", makePayment);

module.exports = router;
