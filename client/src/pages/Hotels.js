/** @format */
import React from "react";
import { Grid, Typography } from "@material-ui/core";
import HotelRoom from "../assets/images/hotel-room.png"
import HotelSearch from "../components/HotelSearch"
import useStyles from "../styles/Hotel"

function Hotels() {
	const classes = useStyles()
	return (
		<Grid className={classes.root}>
		<Grid classes={{ container: classes.container }} container>
		  <Grid className={classes.titleContainer} item xs={5}>
			<Typography className={classes.header}>
			  Find the best hotels <br /> around the world.
			</Typography>
		  </Grid>
		  <Grid className={classes.heroContainer} item xs={7}>
			<img
			  className={classes.heroImg}
			  src={HotelRoom}
			  alt="Hotel Room"
			/>
		  </Grid>
		</Grid>
		<Grid className={classes.searchDiv}>
		  <HotelSearch />
		</Grid>
	  </Grid>
	);
}

export default Hotels;
