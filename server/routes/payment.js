const express = require("express");
const router = express.Router();

const stripe = require("stripe")(process.env.STRIPE_SK);

const makePayment = async (req, res) => {
  const customer = req.body.stripeId;
  const { currency, stripeId, flights, hotels, rentalCars } = req.body;
  let session;

  const lineItems = [
    {
      currency: currency,
      amount: flights.totalPrice * 100,
      name: flights.departure
        ? `${flights.departure} - ${flights.arrival}`
        : "No flights selected",
      quantity: 1,
    },
    {
      currency: currency,
      amount: hotels.totalPrice * 100,
      name: hotels.details ? `${hotels.details}` : "No hotels selected",
      quantity: 1,
    },
    {
      currency: currency,
      amount: rentalCars.totalPrice * 100,
      name: rentalCars.details
        ? `${rentalCars.details}`
        : "No rental cars selected",
      quantity: 1,
    },
  ];

  if (customer) {
    session = await stripe.checkout.sessions.create({
      payment_intent_data: {
        setup_future_usage: "off_session",
      },

      /* Note: Customer can change email in form if using key 'customer'. No fix that I could find
      'customer_email' creates a new customer everytime but doesn't allow customer to change email in form*/

      ustomer: stripeId,
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:3000/payment-success",
      cancel_url: "http://localhost:3000/payment-error",
    });

    res.json({ id: session.id });
  } else {
    session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:3000/payment-success",
      cancel_url: "http://localhost:3000/payment-error",
    });

    res.json({ id: session.id });
  }
};

router.post("/checkout-session", makePayment);

module.exports = router;
