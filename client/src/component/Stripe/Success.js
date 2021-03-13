import { useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";

const Success = ({ clientSecret }) => {
  // To handle for future details of payment on Sucess/Error
  const [paymentDetails, setPaymentDetails] = useState([]);
  const stripe = useStripe();
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
