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

  const changeTitle = (titleName) => {
    if (titleName === "flights") return "flight";
    if (titleName === "hotels") return "hotel";
    if (titleName === "rentalCar") return "rental car";
  };

  const addToCart = (purchaseType) => {
    const { OutboundLeg, InboundLeg } = quote;
    const { from, to } = cities;

    const flightData = {
      departure: {
        id: OutboundLeg.CarrierId,
        type: "Outbound",
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
        id: InboundLeg.CarrierId,
        type: "Inbound",
        price: quote.MinPrice,
        taxes: 1000,
        date: InboundLeg.ReturnDate,
        departureTime: InboundLeg.DepartureTime,
        duration: InboundLeg.Duration,
        arrivalTime: InboundLeg.ArrivalTime,
        departurePlace: to,
        numberOfStops: `${
          InboundLeg.Stops && InboundLeg.Stops.length > 0
            ? InboundLeg.Stops.length
            : "Non"
        }-stop`,
        arrivalPlace: from,
      },
    };

    if (cart[purchaseType].length > 0) {
      enqueueSnackbar(`Limited to 1 ${changeTitle(purchaseType)}`, {
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
        item:
          purchaseType === "flights"
            ? flightData
            : purchaseType === "hotels"
            ? hotelData
            : rentalCarData,
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
