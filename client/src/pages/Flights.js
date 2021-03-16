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
    // MOCK Data
    const flight = [
      {
        type: "Departure",
        name: "FLIGHT001",
        price: 10000,
        taxes: 1000,
        date: "03/20/21",
        departureTime: "2:45pm",
        durtion: "0h 30m",
        arrivalTime: "4:45pm",
        departurePlace: "YVR",
        numberOfStops: "Non-stop",
        arrivalPlace: "LAX",
      },
      {
        type: "Arrival",
        name: "FLIGHT001",
        price: 10000,
        taxes: 1000,
        date: "03/20/21",
        departureTime: "2:45pm",
        durtion: "0h 30m",
        arrivalTime: "4:45pm",
        departurePlace: "LAX",
        numberOfStops: "Non-stop",
        arrivalPlace: "YVr",
      },
    ];

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
