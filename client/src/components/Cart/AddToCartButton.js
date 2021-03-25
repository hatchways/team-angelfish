import React from "react";

import { nanoid } from "nanoid";
import { useSnackbar } from "notistack";

import { Button } from "@material-ui/core";

import { useDispatchContext, useStateContext } from "../../context";
import useStyles from "../../styles/FlightAccordion";

// MOCK Data
const hotelData = {
  id: nanoid(),
  arrival: "03/20/21",
  departure: "03/20/21",
  numberOfNights: 3,
  numberOfGuests: 2,
  place: "LA cottage",
  city: "LA, USA",
  taxes: 100,
  price: 1000,
  rating: 4,
};

const rentalCarData = {
  id: nanoid(),
  arrival: "03/20/21",
  departure: "03/20/21",
  numberOfNights: 3,
  typeOfCar: "Dodge Caravan",
  placeOfRental: "LA Car Service",
  city: "LA, USA",
  taxes: 100,
  price: 1000,
  rating: 3,
};

const AddToCartButton = ({
  title,
  quote,
  cities,
  purchaseType,
  variant,
  color,
  size,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const dispatch = useDispatchContext();
  const { cart } = useStateContext();

  const addToCart = (purchaseType) => {
    if (purchaseType === "flights") {
      const { OutboundLeg, InboundLeg } = quote;
      const { from, to } = cities;
      const flightData = {
        departure: {
          id: nanoid(),
          type: "Departure",
          price: quote.MinPrice,
          taxes: 1000,
          date: OutboundLeg.DepartureDate,
          departureTime: OutboundLeg.DepartureTime,
          duration: OutboundLeg.Duration,
          arrivalTime: OutboundLeg.ArrivalTime,
          departurePlace: from,
          numberOfStops: `${
            OutboundLeg.Stops && OutboundLeg.Stops.length > 0
              ? OutboundLeg.Stops.length
              : "Non"
          }-stop`,
          arrivalPlace: to,
        },
        arrival: {
          id: nanoid(),
          type: "Arrival",
          price: quote.MinPrice,
          taxes: 1000,
          date: InboundLeg.DepartureDate,
          departureTime: InboundLeg.DepartureTime,
          duration: InboundLeg.Duration,
          arrivalTime: InboundLeg.ArrivalTime,
          departurePlace: from,
          numberOfStops: `${
            InboundLeg.Stops && InboundLeg.Stops.length > 0
              ? InboundLeg.Stops.length
              : "Non"
          }-stop`,
          arrivalPlace: to,
        },
      };

      if (cart.flights.length > 0) {
        enqueueSnackbar("Limited to 1 flight", {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
          },
          autoHideDuration: 2000,
        });
      } else {
        dispatch({
          type: "ADD_TO_CART",
          item: flightData,
          purhcaseType: purchaseType,
        });
        enqueueSnackbar("Added to cart", {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
          },
          autoHideDuration: 2000,
        });
      }
    }

    if (purchaseType === "hotels") {
      if (cart.hotels.length > 0) {
        enqueueSnackbar("Limited to 1 hotel", {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
          },
          autoHideDuration: 2000,
        });
      } else {
        dispatch({
          type: "ADD_TO_CART",
          item: hotelData,
          purhcaseType: purchaseType,
        });
        enqueueSnackbar("Added to cart", {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
          },
          autoHideDuration: 2000,
        });
      }
    }

    if (purchaseType === "rentalCar") {
      if (cart.rentalCar.length > 0) {
        enqueueSnackbar("Limited to 1 rentalCar", {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
          },
          autoHideDuration: 2000,
        });
      } else {
        dispatch({
          type: "ADD_TO_CART",
          item: rentalCarData,
          purhcaseType: purchaseType,
        });
        enqueueSnackbar("Added to cart", {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
          },
          autoHideDuration: 2000,
        });
      }
    }
  };

  return (
    <>
      <Button
        variant={variant}
        color={color}
        size={size}
        classes={{ root: classes.button }}
        onClick={() => addToCart(purchaseType)}
      >
        {title}
      </Button>
    </>
  );
};

export default AddToCartButton;
