import React, { useState } from "react";
import Payment from "./Payment";

// Mock data based on if USER is logged and Authenticated
const paymentDetails = {
  details: "Flight00",
  amount: 1000,
  departure: "11/21/21",
  arrival: "11/21/21",
  currency: "usd",
  // Need to fix if logged in/ email is filled in on Stripeform but Stripe gives error that is invalid.
  // email: "1@gmail.com",
  id: "604b41b8d7cad7730161bb16",
};

const Checkout = () => {
  const [key, setSecret] = useState("");

  const goToPayment = async (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/api/checkout/secret", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentDetails),
    })
      .then((res) => res.json())
      .then((clientSecretObj) => setSecret(clientSecretObj));
  };

  if (key) {
    const clientSecret = key.client_secret;
    return (
      <>
        <Payment secretKey={clientSecret} clientSecretObj={key} />{" "}
      </>
    );
  }
  return (
    <div>
      <button onClick={goToPayment}>Proceed with payment</button>
    </div>
  );
};

export default Checkout;
