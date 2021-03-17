import React from "react";

import CartHotelDetails from "./CartHotelDetails";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Typography } from "@material-ui/core";

import { getCartHotelTotal } from "../../../utils/utils";

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

const CartHotelContainer = () => {
  const { cart } = useStateContext();
  const classes = useStyles();
  const dispatch = useDispatchContext();

  const removeFromCart = () => {
    dispatch({ type: "REMOVE_FROM_CART", purchaseType: "hotels" });
  };

  return (
    <div className={classes.root}>
      <div className={classes.div}>
        {cart?.hotels.map((i, ind) => {
          const {
            arrival,
            departure,
            numberOfNights,
            numberOfGuests,
            place,
            city,
            price,
            rating,
            taxes,
          } = i;
          return (
            <div key={ind}>
              <CartHotelDetails
                place={place}
                arrival={arrival}
                departure={departure}
                numberOfNights={numberOfNights}
                numberOfGuests={numberOfGuests}
                city={city}
                price={price}
                taxes={taxes}
                rating={rating}
              />
            </div>
          );
        })}
      </div>
      {cart.hotels.length > 0 && (
        <>
          <Grid container className={classes.colContainer}>
            <Grid xs={6} item container justify="flex-start">
              <Typography className={classes.title}>Taxes:</Typography>
            </Grid>
            <Grid
              xs={6}
              className={classes.price}
              item
              container
              justify="flex-end"
            >
              <Typography className={classes.price}>
                ${cart.hotels[0].taxes}
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
                ${getCartHotelTotal(cart)}
              </Typography>
            </Grid>
          </Grid>
        </>
      )}

      <Grid style={{ marginTop: 20 }} container justify="center">
        <Button
          className={classes.removBtn}
          style={{
            display: cart?.hotels.length > 0 ? "block" : "none",
          }}
          onClick={removeFromCart}
        >
          Remove Hotel
        </Button>
      </Grid>
    </div>
  );
};

export default CartHotelContainer;