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

const CartHotelContainer = () => {
  const { cart } = useStateContext();
  const classes = useStyles();
  const dispatch = useDispatchContext();

  const removeFromCart = () => {
    dispatch({ type: "REMOVE_FROM_CART", purchaseType: "hotels" });
  };

  return (
    <div className={classes.root}>
      {cart?.hotels.map((i, ind) => {
        const {
          arrival,
          departure,
          numberOfNights,
          numberOfGuests,
          place,
          city,
          price,
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
            />
          </div>
        );
      })}
      {cart.hotels.length > 0 && (
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
              <Typography>${cart.hotels[0].taxes}</Typography>
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
              <Typography>${getCartHotelTotal(cart)}</Typography>
            </Grid>
          </Grid>
        </>
      )}
      <Grid container justify="center">
        <Button
          variant="outlined"
          style={{
            display: cart?.hotels.length > 0 ? "block" : "none",
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

export default CartHotelContainer;
