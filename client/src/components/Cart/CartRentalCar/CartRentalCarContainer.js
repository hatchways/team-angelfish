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
  colContainer: {
    marginTop: 20,
  },
  div: {
    paddingBottom: 20,
    borderBottom: "1px solid #B8B8B8",
  },
  price: {
    fontWeight: 600,
    color: "#6464FF",
  },
  title: {
    fontWeight: 600,
  },
  removBtn: {
    color: "#D3D3D3",
    borderColor: "#D3D3D3",
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
      <div className={classes.div}>
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
            rating,
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
                rating={rating}
              />
            </div>
          );
        })}
      </div>
      {cart.rentalCar.length > 0 && (
        <>
          <Grid container className={classes.colContainer}>
            <Grid xs={6} item container justify="flex-start">
              <Typography className={classes.title}>Taxes:</Typography>
            </Grid>
            <Grid
              className={classes.price}
              xs={6}
              item
              container
              justify="flex-end"
            >
              <Typography className={classes.price}>
                ${cart.rentalCar[0].taxes}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid xs={6} item container justify="flex-start">
              <Typography className={classes.title}>Total:</Typography>
            </Grid>
            <Grid
              xs={6}
              item
              className={classes.price}
              container
              justify="flex-end"
            >
              <Typography className={classes.price}>
                ${getCartCarTotal(cart)}
              </Typography>
            </Grid>
          </Grid>
        </>
      )}

      <Grid style={{ marginTop: 20 }} container justify="center">
        <Button
          style={{
            display: cart?.rentalCar.length > 0 ? "block" : "none",
          }}
          className={classes.removBtn}
          onClick={removeFromCart}
        >
          Remove Hotel
        </Button>
      </Grid>
    </div>
  );
};

export default CartRentalCarContainer;
