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
    padding: 30,
    "@media (max-width:450px)": {
      paddingLeft: 40,
      paddingRight: 20,
      width: "inherit",
    },
  },
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
    marginBottom: 30,
  },
  header: {
    backgroundColor: "#6464ff",
    height: 100,
  },
  cartDiv: {
    height: "100vh",
  },
  footer: {
    backgroundColor: "#6464ff",
    minHeight: 100,
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
      <div style={{ width: 400 }}>
        <Grid container className={classes.cartDiv}>
          <Grid
            item
            xs={12}
            container
            justify="center"
            alignItems="center"
            className={classes.header}
          >
            <Typography style={{ color: "#fff", fontWeight: 600 }} variant="h4">
              Travel Summary
            </Typography>
          </Grid>
          <Grid className={classes.cartContainer} xs={12} item>
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
                  ${totalPrice()}
                </Typography>
              </Grid>
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
          <Grid xs={12} item className={classes.footer}></Grid>
        </Grid>
      </div>
    </>
  );
};

export default CartList;
