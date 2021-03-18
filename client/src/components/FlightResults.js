/** @format */

import React, { useState } from "react";
import {
	Container,
	Grid,
	Typography,
	FormControl,
	Select,
	MenuItem,
	InputLabel,
} from "@material-ui/core";
import useStyles from "../styles/FlightResults";
import FlightAccordion from "./FlightAccordion";

const FlightResults = ({ data }) => {
	const classes = useStyles();

	const prices = {
		default: "Price",
		options: [
			{ min: 50, max: 350, range: "$50 - $350" },
			{ min: 350, max: 650, range: "$350 - $650" },
			{ min: 650, max: 1000, range: "$650 - $1,000" },
			{ min: 1000, range: "$1,000 +" },
		],
	};

	const [price, setPrice] = useState("");
	const [filter, setFilter] = useState("");

	const handlePriceChange = (event) => {
		const range = event.target.value;
		if (range !== "None") {
			const priceRange = prices.options.find((price) => price.range === range);
			const minPrice = priceRange.min;
			const maxPrice = priceRange.max;
			setFilter({ min: minPrice, max: maxPrice });
		}
		setPrice(range);
	};

	return (
		<>
			<Container className={classes.flightInfoContainer}>
				<Typography variant="h4" paragraph className={classes.bottomHeader}>
					Best departing flights
				</Typography>
				<Typography
					variant="subtitle2"
					color="secondary"
					classes={{ root: classes.subtitle }}
				>
					Total price includes taxes + fees for 1 adult. Additional bag fees and
					other fees may apply.
				</Typography>
				<FormControl className={classes.formControl}>
					<InputLabel id="price-filter">Price</InputLabel>
					<Select
						labelId="price-filter"
						id="price"
						value={price}
						classes={{ icon: classes.selectIcon }}
						onChange={handlePriceChange}
					>
						<MenuItem value="">None</MenuItem>
						{prices.options.map((option) => (
							<MenuItem key={option.range} value={option.range}>
								{option.range}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<Grid
					container
					spacing={2}
					classes={{ root: classes.departFlightsContainer }}
				>
					{data.quotes.map((quote) => (
						<>
							{filter && filter.min <= quote.MinPrice <= filter.max && (
								<FlightAccordion
									key={quote.QuoteId}
									quote={quote}
									carrier={data.carriers}
									date={data.date}
								/>
							)}
							{!filter && (
								<FlightAccordion
									key={quote.QuoteId}
									quote={quote}
									carrier={data.carriers}
									date={data.date}
								/>
							)}
						</>
					))}
				</Grid>
			</Container>
		</>
	);
};

export default FlightResults;
