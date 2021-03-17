import React from "react";

import { useDispatchContext, useStateContext } from "../../context";

import { useSnackbar } from "notistack";

const AddToCartTestPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatchContext();
  const { cart } = useStateContext();

  const addToCart = (purchaseType) => {
    // MOCK Data
    const flightData = {
      departure: {
        type: "Departure",
        name: "FLIGHT001",
        price: 10000,
        taxes: 1000,
        date: "03/20/21",
        departureTime: "2:45pm",
        duration: "0h 30m",
        arrivalTime: "4:45pm",
        departurePlace: "YVR",
        numberOfStops: "Non-stop",
        arrivalPlace: "LAX",
      },
      arrival: {
        type: "Arrival",
        name: "FLIGHT001",
        price: 10000,
        taxes: 1000,
        date: "03/20/21",
        departureTime: "2:45pm",
        duration: "0h 30m",
        arrivalTime: "4:45pm",
        departurePlace: "LAX",
        numberOfStops: "Non-stop",
        arrivalPlace: "YVR",
      },
    };

    const hotelData = {
      arrival: "03/20/21",
      departure: "03/20/21",
      numberOfNights: 3,
      numberOfGuests: 2,
      place: "LA cottage",
      city: "LA, USA",
      taxes: 100,
      price: 1000,
    };

    const rentalCarData = {
      arrival: "03/20/21",
      departure: "03/20/21",
      numberOfNights: 3,
      typeOfCar: "Dodge Caravan",
      placeOfRental: "LA Car Service",
      city: "LA, USA",
      taxes: 100,
      price: 1000,
    };

    if (purchaseType === "flights") {
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
    <div>
      <button onClick={() => addToCart("flights")}>Add flight</button>
      <button onClick={() => addToCart("hotels")}>Add hotels</button>
      <button onClick={() => addToCart("rentalCar")}>Add car</button>
    </div>
  );
};

export default AddToCartTestPage;
