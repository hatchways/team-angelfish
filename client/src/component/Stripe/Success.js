import React, { useEffect, useState } from "react";

const stripe = window.Stripe(process.env.REACT_APP_STRIPE_PK);
const Success = ({ clientSecret }) => {
  const [paymentDetails, setPaymentDetails] = useState([]);
  const getPayment = async () => {
    const paymentIntent = await stripe.retrievePaymentIntent(clientSecret);
    setPaymentDetails(paymentIntent);
  };
  useEffect(() => {
    getPayment();
  }, []);
  return (
    <div>
      <h1>Successs</h1>
    </div>
  );
};

export default Success;
