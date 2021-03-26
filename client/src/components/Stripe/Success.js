import React, { useEffect, useState } from "react";

import "@lottiefiles/lottie-player";
import { Grid, Typography } from "@material-ui/core";
import { useHistory } from "react-router";

const Success = () => {
  const history = useHistory();

  const createItinerary = async () => {
    const itiData = JSON.parse(localStorage.getItem("Itinerary"));
    const userData = JSON.parse(localStorage.getItem("User"));
    const itineraryObj = {
      itiData,
      userData,
    };
    const res = await fetch("/api/checkout/create-itinerary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itineraryObj),
    });
    const resData = await res.json();
    if (resData.status === "Success") {
      setTimeout(() => {
        history.push("/");
        localStorage.removeItem("Itinerary");
        localStorage.removeItem("User");
      }, 3500);
    }
  };

  useEffect(() => {
    createItinerary();
  }, []);
  return (
    <Grid
      container
      style={{ height: "100%", backgroundColor: "#ededed" }}
      justify="center"
      alignItems="center"
      direction="column"
    >
      <Typography variant="h2" style={{ fontWeight: 600 }}>
        Successsful Payment
      </Typography>
      <lottie-player
        src="https://assets2.lottiefiles.com/packages/lf20_mhafn2ws.json"
        background="transparent"
        speed="1"
        style={{ width: 400, height: 400 }}
        loop
        autoplay
      ></lottie-player>
      <Typography>Redirecting to Home....</Typography>
    </Grid>
  );
};

export default Success;
