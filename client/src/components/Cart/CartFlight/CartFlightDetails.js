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
    backgroundColor: "#68697f",
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
          <Grid container item xs={2}>
            <Avatar className={classes.avatar} src={mockFlightImg}></Avatar>
          </Grid>
          <Grid
            style={{ fontWeight: 600 }}
            xs={5}
            item
            container
            justify="flex-start"
          >
            <Typography style={{ fontWeight: 600 }}>{name}</Typography>
          </Grid>
          <Grid
            style={{ color: "#6464FF", fontWeight: 600 }}
            xs={5}
            container
            item
            justify="flex-end"
          >
            <Typography>{date}</Typography>
          </Grid>
        </Grid>

        <Grid className={classes.detailsCont} container>
          <Grid justify="flex-start" container item xs={4}>
            <Typography style={{ fontWeight: 600 }}>{departureTime}</Typography>
          </Grid>
          <Grid alignItems="center" container item xs={4}>
            <Grid container justify="center">
              <Typography style={{ color: "#787878" }}>{duration}</Typography>
            </Grid>
          </Grid>
          <Grid justify="flex-end" container item xs={4}>
            <Typography style={{ fontWeight: 600 }}>{arrivalTime}</Typography>
          </Grid>
        </Grid>

        <Grid className={classes.lineAirCont} container justify="center">
          <Grid xs={10} item className={classes.line}></Grid>
          <Grid xs={2} item>
            <FlightIcon
              style={{ color: "#787878" }}
              className={classes.airplaneIcon}
            />
          </Grid>
        </Grid>

        <Grid className={classes.cityCont} container>
          <Grid justify="space-between" container item xs={4}>
            <Typography style={{ fontWeight: 600 }}>
              {departurePlace}
            </Typography>
          </Grid>
          <Grid container item xs={4} justify="center">
            <Typography style={{ color: "#787878" }}>
              {numberOfStops}
            </Typography>
          </Grid>
          <Grid justify="flex-end" container item xs={4}>
            <Typography style={{ fontWeight: 600 }}>{arrivalPlace}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default CartFlightDetails;
