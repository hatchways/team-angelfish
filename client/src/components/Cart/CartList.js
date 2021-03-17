import React, { useState } from "react";

import { useStateContext } from "../../context";
import {
  getCartFlightsTotal,
  getCartHotelTotal,
  getCartCarTotal,
} from "../../utils/utils";

import Stepper from "./Stepper/Stepper";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  cartContainer: {
    width: 400,
    minHeight: "50%",
    padding: 30,
    "@media (max-width:450px)": {
      paddingLeft: 40,
      paddingRight: 20,
      width: "inherit",
    },
  },
  title: { backgroundColor: "#6464ff", padding: 30, marginBottom: 20 },
  colContainer: {
    marginBottom: 40,
    marginTop: 20,
    paddingRight: 20,
    paddingLeft: 20,
    display: "flex",
    justifyContent: "space-between",
  },
  btn: {
    backgroundColor: "#ffb347",
    color: "#fff",
    height: 50,
    width: 150,
  },
  btnCo: {
    marginBottom: 50,
  },
}));

const CartList = ({ closeCart }) => {
  const { cart } = useStateContext();
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  console.log("CARt", cart);

  function getSteps() {
    return [
      "Confirm flight details",
      "Confirm hotel details",
      "Confirm car rental",
    ];
  }
  const totalPrice = () => {
    let total = 0;
    total += getCartFlightsTotal(cart);
    total += getCartHotelTotal(cart);
    total += getCartCarTotal(cart);
    return total;
  };

  return (
    <>
      <div style={{ flex: 1, backgroundColor: "#6464ff" }}>
        <Grid className={classes.title} justify="center" container>
          <Typography style={{ color: "#fff", fontWeight: 600 }} variant="h4">
            Travel Summary
          </Typography>
        </Grid>
        <Grid
          className={classes.cartContainer}
          style={{ backgroundColor: "white" }}
          container
        >
          <Stepper
            closeCart={closeCart}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            steps={steps}
          />
          <Grid container className={classes.colContainer}>
            <Grid item>
              <Typography style={{ fontWeight: 600 }}> Total</Typography>
            </Grid>
            <Grid item>
              <Typography style={{ fontWeight: 600, color: "#6464ff" }}>
                {totalPrice()}
              </Typography>
            </Grid>
          </Grid>
          <Grid className={classes.btnCont} container justify="center">
            <Button
              disabled={activeStep === steps.length ? false : true}
              className={classes.btn}
            >
              Payment
            </Button>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default CartList;
