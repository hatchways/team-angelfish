import React from "react";

import { Link } from "react-router-dom";

import { useStateContext } from "../../../context";

import { getCartLength } from "../../../utils/utils";

import CartFlightContainer from "../CartFlight/CartFlightContainer";
import StepIconStyles from "./StepIconStyles";
import CartHotelContainer from "../CartHotel/CartHotelContainer";
import CartRentalCarContainer from "../CartRentalCar/CartRentalCarContainer";

import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  cartContainer: {
    width: 400,
    paddingLeft: 30,
    paddingRight: 30,
    "@media (max-width:400px)": {
      paddingLeft: 40,
      paddingRight: 20,
    },
  },
  title: {
    marginBottom: 15,
    marginTop: 30,
  },
  colContainer: {
    marginBottom: 40,
    marginTop: 20,
  },
  btn: {
    backgroundColor: "#ffb347",
    color: "#fff",
    height: "40px",
    width: "100px",
  },

  root: {
    width: "100%",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

const StepperComponent = ({ closeCart, activeStep, setActiveStep, steps }) => {
  const { cart } = useStateContext();
  const classes = useStyles();

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return cart.flights.length > 0 ? (
          <CartFlightContainer />
        ) : (
          <div>
            <Typography>
              Would you like to choose a{" "}
              <Link onClick={closeCart} to="/flights">
                flight
              </Link>
              ?
            </Typography>
          </div>
        );
      case 1:
        return cart.hotels.length > 0 ? (
          <CartHotelContainer />
        ) : (
          <div>
            <Typography>
              Would you like to choose a{" "}
              <Link onClick={closeCart} to="/hotels">
                hotel
              </Link>
              ?
            </Typography>
          </div>
        );
      case 2:
        return cart.rentalCar.length > 0 ? (
          <CartRentalCarContainer />
        ) : (
          <div>
            <Typography>
              Would you like to choose a{" "}
              <Link onClick={closeCart} to="/rent">
                rental car
              </Link>
              ?
            </Typography>
          </div>
        );

      default:
        return "Unknown step";
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const isCartyEmpty = getCartLength(cart);
  return (
    <div className={classes.root}>
      <Stepper
        style={{ padding: 0 }}
        activeStep={activeStep}
        orientation="vertical"
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel
              StepIconComponent={StepIconStyles}
              style={{ color: "yellow" }}
            >
              {label}
            </StepLabel>
            <StepContent
              style={{ paddingLeft: 15, paddingRight: 15, marginTop: 10 }}
            >
              <div
                style={{
                  border: "1px solid lightgray",
                  padding: 20,
                  borderRadius: 15,
                }}
              >
                {getStepContent(index)}
              </div>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    style={{ backgroundColor: "#ffb347", color: "#fff" }}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>

      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          {isCartyEmpty === 0 ? (
            <Typography>Nothing in cart</Typography>
          ) : (
            <Typography>Complete! Proceed to payment</Typography>
          )}
          <Button onClick={handleReset} className={classes.button}>
            Not done?
          </Button>
        </Paper>
      )}
    </div>
  );
};

export default StepperComponent;
