/** @format */

import React from "react";

import { Grid, Typography } from "@material-ui/core";

import backgroundImg from "../assets/images/car-rental.jpg";
import FlightSearchComponent from "../components/FlightSearch";

import useStyles from "../styles/Flights";

function Rent() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Grid classes={{container: classes.container}} container>
				<Grid className={classes.titleContainer} item xs={5}>
					<Typography className={classes.header}>
						Book now with full flexibility
					</Typography>
				</Grid>
				<Grid className={classes.heroContainer} item xs={7}>
					<img
						className={classes.heroImg}
						src={backgroundImg}
						alt="birds eye beach view"
					/>
				</Grid>
			</Grid>
			<div className={classes.searchDiv}>
				<FlightSearchComponent />
			</div>
		</div>
	);
}

export default Rent;
