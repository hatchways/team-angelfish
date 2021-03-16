import React from "react";

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
    paddingLeft: 30,
    paddingRight: 30,
    "@media (max-width:400px)": {
      paddingLeft: 40,
      paddingRight: 20,
    },
  },
  title: {
    marginBottom: 15,
    marginTop: 30,
  },
  colContainer: {
    marginBottom: 40,
    marginTop: 20,
  },
  btn: {
    backgroundColor: "#ffb347",
    color: "#fff",
    height: "40px",
    width: "100px",
  },
}));

const CartList = ({ closeCart }) => {
  const { cart } = useStateContext();
  const classes = useStyles();
  console.log("CARt", cart);

  const totalPrice = () => {
    let total = 0;
    total += getCartFlightsTotal(cart);
    total += getCartHotelTotal(cart);
    total += getCartCarTotal(cart);
    return total;
  };

  return (
    <>
      <Grid className={classes.cartContainer} container>
        <Grid className={classes.title} justify="center" xs={12} container>
          <Typography variant="h4">Travel Summary</Typography>
        </Grid>
        <Stepper closeCart={closeCart} />

        <Grid container className={classes.colContainer}>
          <Grid xs={6} container justify="flex-start">
            Total
          </Grid>
          <Grid xs={6} container justify="flex-end">
            {totalPrice()}
          </Grid>
        </Grid>
        <Grid container justify="center">
          <Button className={classes.btn}>Search</Button>
        </Grid>
      </Grid>
    </>
  );
};

export default CartList;
