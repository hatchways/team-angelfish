import React from "react";

import { useStateContext, useDispatchContext } from "../../context";

import CartFlightDetails from "./CartFlightDetails";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button } from "@material-ui/core";

const useStyles = makeStyles({
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
    marginBottom: 40,
  },
  btn: {
    backgroundColor: "#ffb347",
    color: "#fff",
    height: "40px",
    width: "100px",
  },
});

const CartList = () => {
  const { cart } = useStateContext();
  const dispatch = useDispatchContext();
  const classes = useStyles();
  console.log("CARt", cart);

  const removeFromCart = (ind) => {
    dispatch({ type: "REMOVE_FROM_CART", index: ind });
  };

  return (
    <>
      <Grid className={classes.cartContainer} container>
        <Grid className={classes.title} justify="center" xs={12} container>
          <Typography variant="h4">Flight Summary</Typography>
        </Grid>

        <CartFlightDetails
          name={"Departure"}
          date={"03/20/21"}
          departureTime={"2:45pm"}
          duration={"0h 30m"}
          arrivalTime={"4:45pm"}
          departurePlace={"YVR"}
          numberOfStops={"Non-stop"}
          arrivalPlace={"LAX"}
        />
        <CartFlightDetails
          name={"Arrival"}
          date={"03/20/21"}
          departureTime={"2:45pm"}
          duration={"0h 30m"}
          arrivalTime={"4:45pm"}
          departurePlace={"LAX"}
          numberOfStops={"Non-stop"}
          arrivalPlace={"YVR"}
        />
        <Grid container className={classes.colContainer}>
          <Grid xs={6} container justify="flex-start">
            Taxes
          </Grid>
          <Grid xs={6} container justify="flex-end">
            Date
          </Grid>
        </Grid>
        <Grid container className={classes.colContainer}>
          <Grid xs={6} container justify="flex-start">
            Fees
          </Grid>
          <Grid xs={6} container justify="flex-end">
            Date
          </Grid>
        </Grid>
        <Grid container className={classes.colContainer}>
          <Grid xs={6} container justify="flex-start">
            Total
          </Grid>
          <Grid xs={6} container justify="flex-end">
            Date
          </Grid>
        </Grid>
        <Grid container justify="center">
          <Button className={classes.btn}>Search</Button>
        </Grid>
        {cart.map((i, ind) => (
          <div key={ind}>
            <p>{i.name}</p>
            <button onClick={() => removeFromCart(ind)}>x</button>
          </div>
        ))}
      </Grid>
    </>
  );
};

export default CartList;
