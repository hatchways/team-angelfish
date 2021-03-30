/** @format */

import React, { useState } from "react";

import { Grid, Typography } from "@material-ui/core";

import backgroundImg from "../assets/images/birdseye-beach.jpeg";
import FlightSearchComponent from "../components/FlightSearch";

import useStyles from "../styles/Flights";
import FlightResults from "../components/FlightResults";
import clsx from "clsx";

function Flights() {
	const classes = useStyles();
	const [showResults, setShowResults] = useState(false);
	const [data, setData] = useState();

	const handleResults = (childData) => {
		setData(childData);
		setShowResults(true);
	};

	return (
		<>
			<div
				className={clsx({
					[classes.rootWithResults]: showResults,
					[classes.rootWithoutResults]: !showResults,
				})}
			>
				<Grid
					className={clsx({
						[classes.containerWithResults]: showResults,
						[classes.containerWithoutResults]: !showResults,
					})}
					container
				>
					<Grid className={classes.titleContainer} item xs={5}>
						<Typography className={classes.header}>
							Find the flights and
							<br /> start the holiday.
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
					<FlightSearchComponent submit={handleResults} />
				</div>
				{showResults ? <FlightResults data={data} /> : null}
			</div>
		</>
	);
}

export default Flights;
