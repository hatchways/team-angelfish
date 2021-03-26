const express = require("express");
const router = express.Router();

const stripe = require("stripe")(process.env.STRIPE_SK);

const Itinerary = require("../models/Itinerary");
const User = require("../models/User");

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

      customer: stripeId,
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

const createItinerary = async (req, res) => {
  const { flights, hotels, rentalCar } = req.body.itiData;
  const { userData } = req.body;

  const flightsTotal = flights.reduce((total, item) => {
    return (
      total +
      item.departure.price +
      item.departure.taxes +
      item.arrival.price +
      item.arrival.taxes
    );
  }, 0);

  const hotelTotal = hotels.reduce((total, item) => {
    return total + item.price + item.taxes;
  }, 0);
  const carTotal = hotels.reduce((total, item) => {
    return total + item.price + item.taxes;
  }, 0);

  const flightsObj = {
    departureDate: flights.length === 0 ? "" : flights[0].departure.date,
    returnDate: flights.length === 0 ? "" : flights[0].arrival.date,
    departureLocation:
      flights.length === 0 ? "" : flights[0].departure.departurePlace,
    destinationLocation:
      flights.length === 0 ? "" : flights[0].departure.arrivalPlace,
    carrier: flights.length === 0 ? "" : flights[0].departure.id,
    price: flightsTotal,
  };
  const hotelObj = {
    name: hotels.length === 0 ? "" : hotels[0].place,
    numberOfOccupants: hotels.length === 0 ? "" : hotels[0].numberOfGuests,
    checkInDate: hotels.length === 0 ? "" : hotels[0].arrival,
    checkOutDate: hotels.length === 0 ? "" : hotels[0].departure,
    rating: hotels.length === 0 ? "" : hotels[0].rating,
    location: hotels.length === 0 ? "" : hotels[0].city,
    price: hotels.length === 0 ? "" : hotelTotal,
  };
  const carObj = {
    name: rentalCar.length === 0 ? "" : rentalCar[0].placeOfRental,
    returnRentalDate: rentalCar.length === 0 ? "" : rentalCar[0].arrival,
    rentOutDate: rentalCar.length === 0 ? "" : rentalCar[0].departure,
    total: carTotal,
  };

  User.findOne({ email: userData.email }).then((user) => {
    if (user) {
      const newItinerary = new Itinerary({
        user,
        car: carObj,
        flight: flightsObj,
        hotel: hotelObj,
      });
      newItinerary.save().then((createdItin) => {
        if (createdItin) {
          res.status(200).json({ status: "Success", data: createItinerary });
        } else {
          res.status(400).json({ message: "Something went wrong" });
        }
      });
    }
  });
};

router.post("/checkout-session", makePayment);
router.post("/create-itinerary", createItinerary);

module.exports = router;
