import React from "react";
import StripeForm from "./StripeForm";

import { loadStripe } from "@stripe/stripe-js";

import { Elements } from "@stripe/react-stripe-js";

const stripe = loadStripe(process.env.REACT_APP_STRIPE_PK);

function Payment({ secretKey, clientSecretObj }) {
  return (
    <div>
      <h1>Payment</h1>
      <Elements stripe={stripe}>
        <StripeForm secretKey={secretKey} clientSecretObj={clientSecretObj} />
      </Elements>
    </div>
  );
}

export default Payment;
