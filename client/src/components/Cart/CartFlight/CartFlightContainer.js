import React from "react";

import { Grid, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useStateContext, useDispatchContext } from "../../../context";

import { getCartFlightsTotal } from "../../../utils/utils";

import CartFlightDetails from "./CartFlightDetails";

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
  removBtn: {
    color: "#D3D3D3",
    borderColor: "#D3D3D3",
  },
});

const CartFlightContainer = () => {
  const { cart } = useStateContext();
  const classes = useStyles();
  const dispatch = useDispatchContext();

  const removeFromCart = () => {
    dispatch({ type: "REMOVE_FROM_CART", purchaseType: "flights" });
  };

  return (
    <div className={classes.root}>
      <div className={classes.div}>
        {cart?.flights.map((i, ind) => {
          const {
            type,
            date,
            departureTime,
            duration,
            arrivalTime,
            departurePlace,
            numberOfStops,
            arrivalPlace,
          } = i.departure;
          return (
            <div key={ind}>
              <CartFlightDetails
                name={type}
                date={date}
                departureTime={departureTime}
                duration={duration}
                arrivalTime={arrivalTime}
                departurePlace={departurePlace}
                numberOfStops={numberOfStops}
                arrivalPlace={arrivalPlace}
              />
            </div>
          );
        })}
        {cart?.flights.map((i, ind) => {
          const {
            type,
            date,
            departureTime,
            duration,
            arrivalTime,
            departurePlace,
            numberOfStops,
            arrivalPlace,
          } = i.arrival;
          return (
            <div key={ind}>
              <CartFlightDetails
                name={type}
                date={date}
                departureTime={departureTime}
                duration={duration}
                arrivalTime={arrivalTime}
                departurePlace={departurePlace}
                numberOfStops={numberOfStops}
                arrivalPlace={arrivalPlace}
              />
            </div>
          );
        })}
      </div>
      {cart.flights.length > 0 && (
        <>
          <Grid container className={classes.colContainer}>
            <Grid xs={6} item container justify="flex-start">
              <Typography style={{ fontWeight: 600 }}>Taxes:</Typography>
            </Grid>
            <Grid
              style={{ color: "#6464FF", fontWeight: 600 }}
              xs={6}
              item
              container
              justify="flex-end"
            >
              <Typography style={{ fontWeight: 600 }}>
                $
                {cart.flights[0].arrival.taxes +
                  cart.flights[0].departure.taxes}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid xs={6} item container justify="flex-start">
              <Typography style={{ fontWeight: 600 }}>Total:</Typography>
            </Grid>
            <Grid
              xs={6}
              item
              style={{ color: "#6464FF", fontWeight: 600 }}
              container
              justify="flex-end"
            >
              <Typography style={{ fontWeight: 600 }}>
                ${getCartFlightsTotal(cart)}
              </Typography>
            </Grid>
          </Grid>
        </>
      )}
      <Grid style={{ marginTop: 20 }} container justify="center">
        <Button
          style={{ display: cart?.flights.length > 0 ? "block" : "none" }}
          className={classes.removBtn}
          onClick={removeFromCart}
        >
          Remove Flight
        </Button>
      </Grid>
    </div>
  );
};

export default CartFlightContainer;
