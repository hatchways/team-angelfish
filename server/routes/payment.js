const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { attachPaymentMethod, paymentIntent } = require("../utils/stripe");

const stripe = require("stripe")(process.env.STRIPE_SK);

const createNewPaymentMethod = async (req, res) => {
  const { user } = res.locals;
  if (user) {
    const { id } = req.body;
    if (!id) return res.sendStatus(400);
    const { customer } = user;
    const result = await attachPaymentMethod({
      customer: customer.stripeId,
      id,
    });
    console.log(result);
    return res.status(200).json({ message: "Success" });
  } else return res.sendStatus(401);
};

const getSecret = async (req, res) => {
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
          amount: req.body.amount,
          name: req.body.details,
          quantity: 1,
          currency: req.body.currency,
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
          amount: req.body.amount,
          name: rew.body.details,
          quantity: 1,
          currency: req.body.currency,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/error",
    });

    res.json({ id: session.id });
  }
};

router.post("/payment/create", auth, createNewPaymentMethod);
router.post("/secret", getSecret);

module.exports = router;
