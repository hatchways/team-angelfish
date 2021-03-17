import React from "react";

import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import backgroundImage from "../../../assets/images/birdseye-beach.jpeg";

const useStyles = makeStyles((theme) => ({
  infoDiv: { marginTop: 10 },
  hotelImage: {
    width: 130,
    height: 90,
    objectFit: "cover",
    borderRadius: 10,
  },
}));
const CartRentalCarDetails = ({
  arrival,
  departure,
  numberOfNights,
  typeOfCar,
  placeOfRental,
  city,
  price,
}) => {
  const classes = useStyles();
  return (
    <>
      <Grid className={classes.div} container justify="space-between">
        <Grid item>
          <img className={classes.hotelImage} src={backgroundImage}></img>
        </Grid>
        <Grid item>
          <Typography>{placeOfRental}</Typography>
          <Typography style={{ textAlign: "right", fontSize: 10 }}>
            {city}
          </Typography>
          <Typography style={{ textAlign: "right" }}> *****</Typography>
          <Typography style={{ textAlign: "right" }}>
            ${Math.round(price / numberOfNights)}
          </Typography>
          <Typography style={{ textAlign: "right", fontSize: 10 }}>
            per day
          </Typography>
        </Grid>
        <Grid container className={classes.infoDiv}>
          <Grid container justify="space-between">
            <Grid item>
              <Typography>Check In</Typography>
            </Grid>
            <Grid item>
              <Typography>{arrival}</Typography>
            </Grid>
          </Grid>
          <Grid container justify="space-between">
            <Grid item>
              <Typography>Check Out</Typography>
            </Grid>
            <Grid item>
              <Typography>{departure}</Typography>
            </Grid>
          </Grid>
          <Grid container justify="space-between">
            <Grid item>
              <Typography>Type of Car:</Typography>
            </Grid>
            <Grid item>
              <Typography>{typeOfCar}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default CartRentalCarDetails;
