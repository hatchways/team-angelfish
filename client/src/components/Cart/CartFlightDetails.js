import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import FlightIcon from "@material-ui/icons/Flight";
import { Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  line: {
    width: "100%",
    height: ".125rem",
    backgroundColor: "#68697f",
  },
  titleContainer: {
    marginBottom: 15,
  },
  airplaneIcon: {
    transform: "rotate(90deg)",
    position: "relative",
    left: 5,
    bottom: 10,
  },
  cityCont: {
    position: "relative",
    bottom: 10,
  },
  lineAirCont: {
    paddingRight: 50,
    paddingLeft: 50,
    position: "relative",
    top: 5,
  },
});

const CartFlightDetails = ({
  name,
  date,
  departureTime,
  duration,
  arrivalTime,
  departurePlace,
  numberOfStops,
  arrivalPlace,
}) => {
  const classes = useStyles();
  return (
    <>
      <Grid container className={classes.colContainer}>
        <Grid container className={classes.titleContainer}>
          <Grid xs={6} container justify="flex-start">
            {name}
          </Grid>
          <Grid xs={6} container justify="flex-end">
            {date}
          </Grid>
        </Grid>

        <Grid className={classes.detailsCont} container>
          <Grid justify="flex-start" container xs={4}>
            <Typography>{departureTime}</Typography>
          </Grid>
          <Grid alignItems="center" container xs={4}>
            <Grid container justify="center">
              <Typography>{duration}</Typography>
            </Grid>
          </Grid>
          <Grid justify="flex-end" container xs={4}>
            <Typography>{arrivalTime}</Typography>
          </Grid>
        </Grid>

        <Grid className={classes.lineAirCont} container justify="center">
          <Grid xs={10} className={classes.line}></Grid>
          <Grid xs={2}>
            <FlightIcon className={classes.airplaneIcon} />
          </Grid>
        </Grid>

        <Grid className={classes.cityCont} container>
          <Grid justify="space-between" container xs={4}>
            <Typography>{departurePlace}</Typography>
          </Grid>
          <Grid container xs={4} justify="center">
            <Typography>{numberOfStops}</Typography>
          </Grid>
          <Grid justify="flex-end" container xs={4}>
            <Typography>{arrivalPlace}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default CartFlightDetails;
