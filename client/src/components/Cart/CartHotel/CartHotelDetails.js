import React from "react";

import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";

import backgroundImage from "../../../assets/images/hotel.jpeg";

const useStyles = makeStyles(() => ({
  infoDiv: { marginTop: 10 },
  hotelImage: {
    width: 130,
    height: 100,
    objectFit: "cover",
    borderRadius: 10,
    boxShadow: "0px 0px 4px 1px #888888",
    "@media (max-width:450px)": {
      width: 110,
      height: 80,
    },
  },
  title: {
    fontWeight: 600,
    fontSize: 15,
    textAlign: "right",
  },
  details: {
    textAlign: "right",
    fontSize: 10,
    color: "grey",
  },
  text: {
    fontWeight: 600,
  },
}));

const CartHotelDetails = ({
  arrival,
  departure,
  numberOfNights,
  numberOfGuests,
  place,
  city,
  price,
  taxes,
  rating,
}) => {
  const classes = useStyles();

  return (
    <>
      <Grid className={classes.div} container justify="space-between">
        <Grid item>
          <img
            alt="hotelImage"
            className={classes.hotelImage}
            src={backgroundImage}
          ></img>
        </Grid>
        <Grid item>
          <Typography className={classes.title}>{place}</Typography>
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
          <Typography className={classes.details}>per night</Typography>
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
              <Typography className={classes.text}> Guests:</Typography>
            </Grid>
            <Grid item>
              <Typography>{numberOfGuests}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default CartHotelDetails;
