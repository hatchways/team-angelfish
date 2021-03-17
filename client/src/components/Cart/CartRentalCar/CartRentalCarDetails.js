import React from "react";

import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Rating from "@material-ui/lab/Rating";

import backgroundImage from "../../../assets/images/car.jpeg";

import { carDetailsStyle } from "./styles";

const CartRentalCarDetails = ({
  arrival,
  departure,
  numberOfNights,
  typeOfCar,
  placeOfRental,
  city,
  price,
  rating,
}) => {
  const classes = carDetailsStyle();
  return (
    <>
      <Grid className={classes.div} container justify="space-between">
        <Grid item>
          <img
            alt="rentalCar"
            className={classes.image}
            src={backgroundImage}
          ></img>
        </Grid>
        <Grid item>
          <Typography className={classes.title}>{placeOfRental}</Typography>
          <Typography className={classes.details}>{city}</Typography>
          <Typography style={{ textAlign: "right" }}>
            {" "}
            <Rating
              name="customized-empty"
              defaultValue={rating}
              precision={0.5}
              emptyIcon={<StarBorderIcon fontSize="inherit" />}
            />
          </Typography>
          <Typography className={classes.title}>
            ${Math.round(price / numberOfNights)}
          </Typography>
          <Typography className={classes.details}>per day</Typography>
        </Grid>
        <Grid container className={classes.infoDiv}>
          <Grid container justify="space-between">
            <Grid item>
              <Typography className={classes.text}>Check In:</Typography>
            </Grid>
            <Grid item>
              <Typography>{arrival}</Typography>
            </Grid>
          </Grid>
          <Grid container justify="space-between">
            <Grid item>
              <Typography className={classes.text}>Check Out:</Typography>
            </Grid>
            <Grid item>
              <Typography>{departure}</Typography>
            </Grid>
          </Grid>
          <Grid container justify="space-between">
            <Grid item>
              <Typography className={classes.text}>Type of Car:</Typography>
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
