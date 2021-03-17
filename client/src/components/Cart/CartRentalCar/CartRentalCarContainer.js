import React from "react";

import CartRentalCarDetails from "./CartRentalCarDetails";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Typography } from "@material-ui/core";

import { getCartCarTotal } from "../../../utils/utils";

import { useStateContext, useDispatchContext } from "../../../context";

const useStyles = makeStyles({
  root: {
    marginBottom: 30,
  },
  cartContainer: {
    width: 350,
    paddingLeft: 40,
    paddingRight: 50,
  },
  title: {
    marginBottom: 50,
    marginTop: 30,
  },
  colContainer: {
    marginTop: 10,
  },
  btn: {
    backgroundColor: "#ffb347",
    color: "#fff",
    height: 40,
    width: 100,
  },
});

const CartRentalCarContainer = () => {
  const { cart } = useStateContext();
  const classes = useStyles();
  const dispatch = useDispatchContext();

  const removeFromCart = () => {
    dispatch({ type: "REMOVE_FROM_CART", purchaseType: "rentalCar" });
  };

  return (
    <div className={classes.root}>
      {cart?.rentalCar.map((i, ind) => {
        const {
          arrival,
          departure,
          numberOfNights,
          placeOfRental,
          typeOfCar,
          city,
          price,
          taxes,
        } = i;
        return (
          <div key={ind}>
            <CartRentalCarDetails
              placeOfRental={placeOfRental}
              arrival={arrival}
              departure={departure}
              numberOfNights={numberOfNights}
              typeOfCar={typeOfCar}
              city={city}
              price={price}
              taxes={taxes}
            />
          </div>
        );
      })}
      {cart.rentalCar.length > 0 && (
        <>
          <Grid container className={classes.colContainer}>
            <Grid xs={6} item container justify="flex-start">
              <Typography>Taxes</Typography>
            </Grid>
            <Grid
              style={{ color: "#6464FF", fontWeight: 600 }}
              xs={6}
              item
              container
              justify="flex-end"
            >
              <Typography>${cart.rentalCar[0].taxes}</Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid xs={6} item container justify="flex-start">
              <Typography>Total</Typography>
            </Grid>
            <Grid
              xs={6}
              item
              style={{ color: "#6464FF", fontWeight: 600 }}
              container
              justify="flex-end"
            >
              <Typography>${getCartCarTotal(cart)}</Typography>
            </Grid>
          </Grid>
        </>
      )}
      <Grid container justify="center">
        <Button
          variant="outlined"
          style={{
            display: cart?.rentalCar.length > 0 ? "block" : "none",
            color: "#B8B8B8",
          }}
          onClick={removeFromCart}
        >
          Remove Hotel
        </Button>
      </Grid>
    </div>
  );
};

export default CartRentalCarContainer;
