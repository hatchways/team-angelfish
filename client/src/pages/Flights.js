/** @format */

import React, { useState } from "react";

import { Grid, Typography } from "@material-ui/core";

import backgroundImg from "../assets/images/birdseye-beach.jpeg";
import FlightSearchComponent from "../components/FlightSearch";

import useStyles from "../styles/Flights";
import FlightResults from "../components/FlightResults";

function Flights() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid classes={{ container: classes.container }} container>
        <Grid className={classes.titleContainer} item xs={5}>
          <Typography className={classes.header}>
            Find the flights and<br />start the holiday.
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
      </div>
    </div>
  );
}

export default Flights;
