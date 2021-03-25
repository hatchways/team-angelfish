import React from "react";
import { SnackbarContent, Grid, Typography } from "@material-ui/core";

function Notifications() {
  //Flight variables
  const departureDate = new Date("March 27, 2021");
  const currentDate = new Date();
  const Destination = "Toronto"
  const message1 = `Your Trip to ${Destination} is in 1 day`
  const message2 = "Your Car rental in Toronto has been booked"
  const message3 = "Your Hotel rental has been booked in the Toraz Hotel in Toronto"

  const notification = Math.round(
    (departureDate - currentDate) / 1000 / 60 / 60 / 24
  );
  console.log(`${notification} day left to trip`);


  return (
    <Grid style={{ marginLeft: 390 }}>
      <Typography style={{fontWeight: "bold"}} gutterBottom={6}  variant="h5">Notifications</Typography>
      {notification === 1 ? (
        <Grid style={{width: "100px"}}>
          <SnackbarContent message={message1} />
          <br/>
          <SnackbarContent message={message2} />
           <br/>
          <SnackbarContent message={message3} />
        </Grid>
      ) : null}
    </Grid>
  );
}

export default Notifications;
