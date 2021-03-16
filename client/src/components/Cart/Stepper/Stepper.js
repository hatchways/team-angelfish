import React, { useState } from "react";

import { Link } from "react-router-dom";

import { useStateContext } from "../../../context";

import CartFlightContainer from "../CartFlight/CartFlightContainer";

import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Paper from "@material-ui/core/Paper";
import { Typography, Button } from "@material-ui/core";

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

const StepperComponent = ({ closeCart }) => {
  const { cart } = useStateContext();
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  function getSteps() {
    return [
      "Confirm flight details",
      "Confirm hotel details",
      "Confirm car rental",
    ];
  }

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return cart.flights.length > 0 ? (
          <CartFlightContainer />
        ) : (
          <div>
            <p>
              Would you like to choose a{" "}
              <Link onClick={closeCart} to="/flights">
                flight
              </Link>
              ?
            </p>
          </div>
        );
      case 1:
        return <CartFlightContainer />;
      case 2:
        return <CartFlightContainer />;
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
            <StepLabel>{label}</StepLabel>
            <StepContent style={{ paddingLeft: 15, paddingRight: 15 }}>
              <Typography>{getStepContent(index)}</Typography>
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
                    color="primary"
                    onClick={handleNext}
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
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
    </div>
  );
};

export default StepperComponent;
