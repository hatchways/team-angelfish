import React from "react";

import { loadStripe } from "@stripe/stripe-js";
import { useHistory } from "react-router";

import { Button } from "@material-ui/core";
import { useDispatchContext } from "../../context/context";
import { useStyles } from "../Cart/styles";
import { useStateContext } from "../../context";
import { useSnackbar } from "notistack";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

// Mock data based on if USER is logged and Authenticated
const paymentDetails = {
  details: "Flight00",
  amount: 1000,
  departure: "11/21/21",
  arrival: "11/21/21",
  currency: "usd",
  // email: "1@gmail.com",
  stripeId: "cus_J7JVnU1cvKjMkM",
  id: "604b41b8d7cad7730161bb16",
};

const Checkout = ({ isCartEmpty, activeStep, steps }) => {
  const history = useHistory();
  const classes = useStyles();
  const { user } = useStateContext();
  const dispatch = useDispatchContext();
  const { enqueueSnackbar } = useSnackbar();
  const goToPayment = async (e) => {
    e.preventDefault();
    if(!user?._id){
      dispatch({type: "LOGIN_REQUEST"});
      openSnack();
      return;
    }
    const stripe = await stripePromise;
    const response = await fetch("/api/checkout/checkout-session", {
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
  const openSnack = () => {
    enqueueSnackbar("Please signing or signup to proceed with payment", {
      variant: "info",
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "center",
      },
      autoHideDuration: 3000,
    });
  };

  return (
    <>
      <Button
        onClick={goToPayment}
        disabled={
          isCartEmpty ? true : activeStep === steps.length ? false : true
        }
        className={classes.btn}
      >
        Payment
      </Button>
    </>
  );
};

export default Checkout;
