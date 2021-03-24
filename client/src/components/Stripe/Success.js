import React, { useEffect } from "react";

import "@lottiefiles/lottie-player";
import { Grid, Typography } from "@material-ui/core";
import { useHistory } from "react-router";

const Success = () => {
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      history.push("/");
    }, 2000);
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
