import React from "react";
import { useHistory } from "react-router-dom";

import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

// Mock data based on if USER is logged and Authenticated
const paymentDetails = {
  details: "Flight00",
  amount: 1000,
  departure: "11/21/21",
  arrival: "11/21/21",
  currency: "usd",
  email: "1@gmail.com",
  stripeId: "cus_J7E4s2WwPF68Dk",
  id: "604b41b8d7cad7730161bb16",
};

const Checkout = () => {
  const history = useHistory();
  const goToPayment = async (e) => {
    e.preventDefault();
    const stripe = await stripePromise;

    const response = await fetch("/api/checkout/create-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentDetails),
    });

    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      history.push("/error");
    }
  };

  return (
    <div>
      <button onClick={goToPayment}>Proceed with payment</button>
    </div>
  );
};

export default Checkout;
