import React, { useState } from "react";
import Payment from "./Payment";

// Mock data
const paymentDetails = {
  details: "Flight00",
  amount: 1000,
  departure: "11/21/21",
  arrival: "11/21/21",
  currency: "usd",
  email: "23@gmail.com",
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
      .then(({ clientSecret }) => setSecret(clientSecret));
  };

  if (key) {
    return (
      <>
        <Payment secretKey={key} />{" "}
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
