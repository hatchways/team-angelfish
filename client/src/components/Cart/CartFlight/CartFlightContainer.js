import React from "react";

import { Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useStateContext, useDispatchContext } from "../../../context";

import { getCartFlightsTotal } from "../../../utils/utils";

import CartFlightDetails from "./CartFlightDetails";

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

const CartFlightContainer = () => {
  const { cart } = useStateContext();
  const classes = useStyles();
  const dispatch = useDispatchContext();

  const removeFromCart = () => {
    dispatch({ type: "REMOVE_FROM_CART", purchaseType: "flights" });
  };

  return (
    <div className={classes.root}>
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
      {cart.flights.length > 0 && (
        <>
          <Grid container className={classes.colContainer}>
            <Grid xs={6} container justify="flex-start">
              Taxes
            </Grid>
            <Grid
              style={{ color: "#6464FF", fontWeight: 600 }}
              xs={6}
              container
              justify="flex-end"
            >
              {cart.flights[0].arrival.taxes + cart.flights[0].departure.taxes}
            </Grid>
          </Grid>
          <Grid container>
            <Grid xs={6} container justify="flex-start">
              Total
            </Grid>
            <Grid
              xs={6}
              style={{ color: "#6464FF", fontWeight: 600 }}
              container
              justify="flex-end"
            >
              {getCartFlightsTotal(cart)}
            </Grid>
          </Grid>
        </>
      )}
      <Grid container justify="center">
        <Button
          variant="outlined"
          style={{
            display: cart?.flights.length > 0 ? "block" : "none",
            color: "#B8B8B8",
          }}
          onClick={removeFromCart}
        >
          Remove Flight
        </Button>
      </Grid>
    </div>
  );
};

export default CartFlightContainer;
