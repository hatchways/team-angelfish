import React, { useState } from "react";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import Success from "./Success";

const StripeForm = ({ secretKey, clientSecretObj }) => {
  const [errors, setErrors] = useState();
  const [name, handleName] = useState("");
  const [email, handleEmail] = useState("");
  const [isSavingCard, setSavingCard] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const createNewPayment = (data) => {
    fetch("http://localhost:3001/api/checkout/payment/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    })
      .then((data) => {
        return data;
      })
      .catch((_) => {
        throw new Error();
      });
  };

  const createAPaymentMethod = async () => {
    const card = elements.getElement("card");
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      card,
      type: "card",
    });
    if (error) {
      setErrors(error.message);
    } else {
      setErrors(null);
      createNewPayment({ id: paymentMethod.id });
    }
  };
  const handleChange = (e) => {
    if (e.error) {
      setErrors(e.error.message);
    } else {
      setErrors(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await stripe.confirmCardPayment(secretKey, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: name,
          email: email,
        },
      },
      setup_future_usage: isSavingCard ? "off_session" : "",
    });
    if (result.error) {
      setErrors(result.error.message);
      setLoading(false);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        setLoading(false);
        await createAPaymentMethod();
        setSuccess(true);
      }
    }
  };
  if (success) {
    return <Success clientSecret={secretKey} />;
  }

  const { receipt_email } = clientSecretObj;
  return (
    <>
      {errors ? <div style={{ color: "red" }}>{errors}</div> : null}
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => handleName(e.target.value)}
          value={name}
          placeholder="name"
        ></input>
        <input
          onChange={(e) => handleEmail(e.target.value)}
          value={receipt_email ? receipt_email : email}
          placeholder="email"
        ></input>
        <label>Save card?</label>
        <input
          onChange={() => setSavingCard(!isSavingCard)}
          type="checkbox"
        ></input>
        <CardElement onChange={handleChange}></CardElement>
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Processing..." : "Submit"}
        </button>
      </form>
    </>
  );
};
export default StripeForm;
