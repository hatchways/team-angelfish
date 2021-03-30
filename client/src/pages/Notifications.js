import React from "react";
import { SnackbarContent, Grid, Typography } from "@material-ui/core";

function Notifications() {
  //Flight variables
  const departureDate = new Date("March 30, 2021");
  const currentDate = new Date();
  const hotel = "Scrumptious"
  const destination ="Toronto"


  const notification = Math.round(
    (departureDate - currentDate) / 1000 / 60 / 60 / 24
  );

  const mockNotificationData = {
    reminder: `Your Trip to ${Destination} is in ${notification} day`,
    carReminder: "Your Car rental in Toronto has been booked",
    hotelReminder: `Your Hotel rental has been booked in the Toraz Hotel in ${Destination}`,
  }

  return (
    <Grid style={{ marginLeft: 390 }}>
      <Typography style={{fontWeight: "bold"}} gutterBottom={6}  variant="h5">Notifications</Typography>
      {notification === 1 ? (
        <Grid style={{width: "100px"}}>
          <SnackbarContent message={mockNotificationData.reminder} />
          <br/>
          <SnackbarContent message={mockNotificationData.carReminder} />
           <br/>
          <SnackbarContent message={mockNotificationData.hotelReminder} />
        </Grid>
      ) : null}
    </Grid>
  );
}

export default Notifications;
