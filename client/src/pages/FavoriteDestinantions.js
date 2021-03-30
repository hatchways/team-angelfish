import React from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import useStyles from "../styles/FavoriteDestinations";

import ExplorePage from "./Explorer/Explore";

function FavoriteDestinantions() {
  const classes = useStyles();
  return (
    <Grid className={classes.root}>
      <Button variant="outlined" style={{ float: "right", marginRight: 25 }}>
        Explore
      </Button>
      <Typography className={classes.title} variant="h5">
        Favorite Destinations
      </Typography>
    </Grid>
  );
}

export default FavoriteDestinantions;
