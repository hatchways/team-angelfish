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
	{ title: "Vancouver", placeId: "" },
	{ title: "Calgary", placeId: "" },
	{ title: "Toronto", placeId: "" },
	{ title: "Bangkok", placeId: "" },
];

const FlightSearch = ({ submit }) => {
	const classes = useStyles();

	const [from, setFrom] = useState("Vancouver");
	const [to, setTo] = useState("Bangkok");
	const [arrivalDate, setArrivalDate] = useState(new Date());
	const [departDate, setDepartDate] = useState(new Date());
	const [travellers, setTravellers] = useState(1);
	const [dateError, setDateError] = useState(false);
	const [fromError, setFromError] = useState(false);
	const [toError, setToError] = useState(false);

	const formatDate = (date) => {
		const year = date.getFullYear();
		const month = date.getMonth();
		const day = date.getDate();
		date = new Date(year, month, day);
		return date.toISOString().split("T")[0];
	};

	const handleFromLocation = (event, value) => {
		setFrom(value);
		setFromError(false);
	};
	const handleToLocation = (event, value) => {
		setTo(value);
		setToError(false);
	};
	const handleArrivalDate = (date) => setArrivalDate(date);
	const handleDepartDate = (date) => {
		setDepartDate(date);
		setDateError(false);
	};
	const handleTravellers = (event) => setTravellers(event.target.value);
	const handleSubmit = async (event) => {
		event.preventDefault();
		if (from && to && departDate >= arrivalDate) {
			const fromCity = cities.find((city) => from === city.title).placeId;
			const toCity = cities.find((city) => to === city.title).placeId;
			const arriveDate = formatDate(arrivalDate);
			const leaveDate = formatDate(departDate);
			const response = await fetch(
				`api/flights/quotes/${fromCity}/${toCity}/${arriveDate}/?inboundDate=${leaveDate}`
			);
			const data = await response.json();
			submit({
				date: arrivalDate,
				quotes: data.Quotes,
				carriers: data.Carriers,
			});
		} else if (!from) {
			setFromError(true);
		} else if (!to) {
			setToError(true);
		} else {
			setDateError(true);
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
									id="arrivalDate"
									label="Arrival"
									value={arrivalDate}
									onChange={handleArrivalDate}
									disablePast
									KeyboardButtonProps={{ "aria-label": "change date" }}
									InputProps={{
										readOnly: true,
										color: "secondary",
									}}
									InputLabelProps={{
										classes: { root: classes.font },
										color: "secondary",
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
									id="departDate"
									label="Departure"
									value={departDate}
									onChange={handleDepartDate}
									disablePast
									KeyboardButtonProps={{ "aria-label": "change date" }}
									InputProps={{
										readOnly: true,
										error: dateError,
										color: "secondary",
									}}
									InputLabelProps={{
										classes: { root: classes.font },
										color: "secondary",
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
