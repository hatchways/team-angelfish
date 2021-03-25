/** @format */

import React, { useState } from "react";

import { Grid, Paper, TextField, Button } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import DateFnsUtils from "@date-io/date-fns";
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from "@material-ui/pickers";

import useStyles from "../styles/FlightSearch";

// Mock Data
const cities = [
	{ title: "Vancouver" },
	{ title: "Calgary" },
	{ title: "Toronto" },
	{ title: "Bangkok" },
];

const FlightSearch = ({ submit }) => {
	const classes = useStyles();

	const [from, setFrom] = useState("Vancouver");
	const [to, setTo] = useState("Bangkok");
	const [departureDate, setDepartureDate] = useState(new Date());
	const [returnDate, setReturnDate] = useState(new Date());
	const [travellers, setTravellers] = useState(1);
	const [departDateError, setDepartDateError] = useState(false);
	const [returnDateError, setReturnDateError] = useState(false);
	const [fromError, setFromError] = useState(false);
	const [toError, setToError] = useState(false);

	const formatDate = (date) => {
		const year = date.getFullYear();
		const month = date.getMonth();
		const day = date.getDate();
		const newDate = new Date(year, month, day);
		return newDate.toISOString().split("T")[0];
	};

	const handleFromLocation = (event, value) => {
		setFrom(value);
		setFromError(false);
	};
	const handleToLocation = (event, value) => {
		setTo(value);
		setToError(false);
	};
	const handleDepartureDate = (date) => {
		setDepartureDate(date);
		setDepartDateError(false);
	};
	const handleReturnDate = (date) => {
		setReturnDate(date);
		setReturnDateError(false);
	};
	const handleTravellers = (event) => setTravellers(event.target.value);
	const handleSubmit = async (event) => {
		event.preventDefault();
		const fromCity = cities.find((city) => from === city.title).title;
		const toCity = cities.find((city) => to === city.title).title;
		const formattedDepartureDate = formatDate(departureDate);

		if (from && to && from !== to && departureDate && returnDate) {
			const formattedReturnDate = formatDate(returnDate);
			if (returnDate >= departureDate) {
				const response = await fetch(
					`api/flights/quotes/${fromCity}/${toCity}/${formattedDepartureDate}/?inboundDate=${formattedReturnDate}`
				);
				const data = await response.json();
				if (response.status === 200) {
					submit({ flights: data });
					console.log(data);
				} else if ("from" in data) {
					setFromError(true);
				} else if ("to" in data) {
					setToError(true);
				} else if ("outboundDate" in data) {
					setDepartDateError(true);
				} else if ("inboundDate" in data) {
					setReturnDateError(true);
				}
			} else {
				setReturnDateError(true);
			}
			// return date is optional
		} else if (from && to && from !== to && departureDate) {
			const response = await fetch(
				`api/flights/quotes/${fromCity}/${toCity}/${formattedDepartureDate}`
			);
			const data = await response.json();
			if (response.status === 200) {
				submit({ flights: data });
			} else if ("from" in data) {
				setFromError(true);
			} else if ("to" in data) {
				setToError(true);
			} else if ("outboundDate" in data) {
				setDepartDateError(true);
			}
		} else if (from === to || !to) {
			setToError(true);
		} else if (!from) {
			setFromError(true);
		}
	};

	return (
		<div className={classes.root}>
			<form onSubmit={handleSubmit}>
				<Paper className={classes.paperContainer} elevation={7}>
					<Grid className={classes.input} lg={2} sm={3} xs={6} item>
						<Autocomplete
							freeSolo
							id="from"
							name="from"
							value={from}
							options={cities.map((option) => option.title)}
							onChange={handleFromLocation}
							renderInput={(params) => (
								<TextField
									{...params}
									label="From"
									color="secondary"
									className={classes.width}
									error={fromError}
									InputLabelProps={{
										shrink: true,
										classes: { root: classes.font },
									}}
								/>
							)}
						/>
					</Grid>
					<Grid className={classes.input} lg={2} sm={3} xs={6} item>
						<Autocomplete
							freeSolo
							id="to"
							name="to"
							value={to}
							options={cities.map((option) => option.title)}
							onChange={handleToLocation}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Where to go"
									color="secondary"
									className={classes.width}
									error={toError}
									InputLabelProps={{
										shrink: true,
										classes: { root: classes.font },
									}}
								/>
							)}
						/>
					</Grid>
					<Grid className={classes.input} lg={2} sm={3} xs={6} item>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<Grid container>
								<KeyboardDatePicker
									className={classes.width}
									disableToolbar
									variant="inline"
									autoOk
									format="MM/dd/yyyy"
									id="departureDate"
									label="Departure"
									value={departureDate}
									onChange={handleDepartureDate}
									disablePast
									KeyboardButtonProps={{ "aria-label": "change date" }}
									InputProps={{
										readOnly: true,
										color: "secondary",
										error: departDateError,
									}}
									InputLabelProps={{
										classes: { root: classes.font },
										color: "secondary",
										shrink: true,
									}}
								/>
							</Grid>
						</MuiPickersUtilsProvider>
					</Grid>
					<Grid className={classes.input} lg={2} sm={3} xs={6} item>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<Grid container>
								<KeyboardDatePicker
									className={classes.width}
									disableToolbar
									variant="inline"
									autoOk
									format="MM/dd/yyyy"
									id="returnDate"
									label="Return"
									value={returnDate}
									onChange={handleReturnDate}
									disablePast
									KeyboardButtonProps={{ "aria-label": "change date" }}
									InputProps={{
										color: "secondary",
										error: returnDateError,
									}}
									InputLabelProps={{
										classes: { root: classes.font },
										color: "secondary",
										shrink: true,
									}}
								/>
							</Grid>
						</MuiPickersUtilsProvider>
					</Grid>
					<Grid
						className={`${classes.travelDiv} ${classes.width}`}
						lg={3}
						sm={12}
						xs={12}
						item
					>
						<Grid item lg={8} sm={3} xs={6}>
							<TextField
								label="Travellers"
								name="travellers"
								id="travellers"
								value={travellers}
								color="secondary"
								onChange={handleTravellers}
								InputLabelProps={{
									shrink: true,
									classes: { root: classes.font },
								}}
							/>
						</Grid>
						<Grid item lg={4} sm={9} xs={6}>
							<Button onClick={handleSubmit} className={classes.searchBtn}>
								Search
							</Button>
						</Grid>
					</Grid>
				</Paper>
			</form>
		</div>
	);
};

export default FlightSearch;
