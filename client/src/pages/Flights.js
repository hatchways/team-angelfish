/** @format */

import React from "react";
import { useDispatchContext } from "../context";

import { Grid, Typography } from "@material-ui/core";
import { useSnackbar } from "notistack";

import backgroundImg from "../assets/images/birdseye-beach.jpeg";
import FlightSearchComponent from "../components/FlightSearch";

import useStyles from "../styles/Flights";

function Flights() {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const dispatch = useDispatchContext();

  const addToCart = () => {
    const flight = {
      name: "FLIGHT001",
      price: 10000,
      details: "Details",
    };
    dispatch({ type: "ADD_TO_CART", item: flight });
    enqueueSnackbar("Added to cart", {
      variant: "success",
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "center",
      },
      autoHideDuration: 2000,
    });
  };

  return (
    <div className={classes.root}>
      <Grid classes={{ container: classes.container }} container>
        <Grid className={classes.titleContainer} item xs={5}>
          <Typography className={classes.header}>
            Find the flights and<br></br> start the holiday.
          </Typography>
        </Grid>
        <Grid className={classes.heroContainer} item xs={7}>
          <img
            className={classes.heroImg}
            src={backgroundImg}
            alt="birds eye beach view"
          />
        </Grid>
      </Grid>
      <div className={classes.searchDiv}>
        <FlightSearchComponent />
        <button onClick={addToCart}>Add to cart</button>
      </div>
    </div>
  );
}

export default Flights;
