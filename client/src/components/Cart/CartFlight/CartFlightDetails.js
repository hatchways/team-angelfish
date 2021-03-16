import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";

import mockFlightImg from "../../../assets/images/airplanelogo.png";
import FlightIcon from "@material-ui/icons/Flight";

const useStyles = makeStyles({
  line: {
    width: "100%",
    height: ".125rem",
    backgroundColor: "#B8B8B8",
  },
  titleContainer: {
    marginBottom: 15,
    alignItems: "center",
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
  avatar: {
    width: 30,
    height: 30,
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
  img,
}) => {
  const classes = useStyles();
  return (
    <>
      <Grid container className={classes.colContainer}>
        <Grid container justify="center" className={classes.titleContainer}>
          <Grid container xs={2}>
            <Avatar className={classes.avatar} src={mockFlightImg}></Avatar>
          </Grid>
          <Grid
            style={{ fontWeight: 600 }}
            xs={5}
            container
            justify="flex-start"
          >
            {name}
          </Grid>
          <Grid
            style={{ color: "#6464FF", fontWeight: 600 }}
            xs={5}
            container
            justify="flex-end"
          >
            {date}
          </Grid>
        </Grid>

        <Grid className={classes.detailsCont} container>
          <Grid justify="flex-start" container xs={4}>
            <Typography style={{ fontWeight: 600 }}>{departureTime}</Typography>
          </Grid>
          <Grid alignItems="center" container xs={4}>
            <Grid container justify="center">
              <Typography style={{ color: "#B8B8B8" }}>{duration}</Typography>
            </Grid>
          </Grid>
          <Grid justify="flex-end" container xs={4}>
            <Typography style={{ fontWeight: 600 }}>{arrivalTime}</Typography>
          </Grid>
        </Grid>

        <Grid className={classes.lineAirCont} container justify="center">
          <Grid xs={10} className={classes.line}></Grid>
          <Grid xs={2}>
            <FlightIcon
              style={{ color: "#B8B8B8" }}
              className={classes.airplaneIcon}
            />
          </Grid>
        </Grid>

        <Grid className={classes.cityCont} container>
          <Grid justify="space-between" container xs={4}>
            <Typography style={{ fontWeight: 600 }}>
              {departurePlace}
            </Typography>
          </Grid>
          <Grid container xs={4} justify="center">
            <Typography style={{ color: "#B8B8B8" }}>
              {numberOfStops}
            </Typography>
          </Grid>
          <Grid justify="flex-end" container xs={4}>
            <Typography style={{ fontWeight: 600 }}>{arrivalPlace}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default CartFlightDetails;
