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
  root: {
    width: "100%",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: theme.spacing(2),
    marginTop: 10,
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
  cartDetailDiv: {
    border: "1px solid lightgray",
    padding: 20,
    borderRadius: 15,
  },
  stepCont: {
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 10,
  },
  route: {
    textDecoration: "none",
    color: "#ffb347",
  },
}));

const StepperComponent = ({ closeCart, activeStep, setActiveStep, steps }) => {
  const { cart } = useStateContext();
  const classes = useStyles();
  const isCartyEmpty = getCartLength(cart);

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return cart.flights.length > 0 ? (
          <CartFlightContainer />
        ) : (
          <>
            <Typography>
              Would you like to choose a{" "}
              <Link className={classes.route} onClick={closeCart} to="/flights">
                flight
              </Link>
              ?
            </Typography>
          </>
        );
      case 1:
        return cart.hotels.length > 0 ? (
          <CartHotelContainer />
        ) : (
          <>
            <Typography>
              Would you like to choose a{" "}
              <Link className={classes.route} onClick={closeCart} to="/hotels">
                hotel
              </Link>
              ?
            </Typography>
          </>
        );
      case 2:
        return cart.rentalCar.length > 0 ? (
          <CartRentalCarContainer />
        ) : (
          <>
            <Typography>
              Would you like to choose a{" "}
              <Link className={classes.route} onClick={closeCart} to="/rent">
                rental car
              </Link>
              ?
            </Typography>
          </>
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

  return (
    <div className={classes.root}>
      <Stepper
        style={{ padding: 0 }}
        activeStep={activeStep}
        orientation="vertical"
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel StepIconComponent={StepIconStyles}>{label}</StepLabel>
            <StepContent className={classes.stepCont}>
              <Paper elevation={2} className={classes.cartDetailDiv}>
                {getStepContent(index)}
              </Paper>
              <div className={classes.actionsContainer}>
                <>
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
                </>
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
