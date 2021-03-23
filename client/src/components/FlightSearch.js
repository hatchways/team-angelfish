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

const mockData = {
	Quotes: [
		{
			QuoteId: 1,
			MinPrice: 381,
			Direct: true,
			OutboundLeg: {
				CarrierIds: [29],
				OriginId: 68033,
				DestinationId: 42833,
				DepartureDate: "2021-04-03",
			},
			InboundLeg: {
				CarrierIds: [29],
				OriginId: 42833,
				DestinationId: 68033,
				DepartureDate: "2021-04-03",
			},
			QuoteDateTime: "2021-03-19",
		},
		{
			QuoteId: 2,
			MinPrice: 398,
			Direct: true,
			OutboundLeg: {
				CarrierIds: [173],
				OriginId: 45108,
				DestinationId: 52843,
				DepartureDate: "2021-04-03",
			},
			InboundLeg: {
				CarrierIds: [173],
				OriginId: 52843,
				DestinationId: 45108,
				DepartureDate: "2021-04-03",
			},
			QuoteDateTime: "2021-03-19",
		},
		{
			QuoteId: 3,
			MinPrice: 187,
			Direct: false,
			OutboundLeg: {
				CarrierIds: [173],
				OriginId: 45108,
				DestinationId: 52843,
				DepartureDate: "2021-04-03",
			},
			InboundLeg: {
				CarrierIds: [173],
				OriginId: 52843,
				DestinationId: 45108,
				DepartureDate: "2021-04-03",
			},
			QuoteDateTime: "2021-03-19",
		},
	],
	Carriers: [
		{
			CarrierId: 29,
			Name: "Mombasa Air Safari",
		},
		{
			CarrierId: 173,
			Name: "Silver Airways",
		},
		{
			CarrierId: 870,
			Name: "jetBlue",
		},
	],
};

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

<<<<<<< HEAD
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [arrival, setArrival] = useState(date);
  const [departure, setDeparture] = useState(date);
  const [travellers, setTravellers] = useState(1);
||||||| 0306caa
  const [from, setFrom] = useState("Vancouver");
  const [to, setTo] = useState("Bangkok");
  const [arrival, setArrival] = useState(date);
  const [departure, setDeparture] = useState(date);
  const [travellers, setTravellers] = useState(1);
=======
	const formatDate = (date) => {
		const year = date.getFullYear();
		const month = date.getMonth();
		const day = date.getDate();
		const newDate = new Date(year, month, day);
		return newDate.toISOString().split("T")[0];
	};
>>>>>>> 9dcc6febb6386bfe6eabea80a4ef6d54162b7a9d

<<<<<<< HEAD
   const handleSubmit = ()=>{
     console.log("Hello")
   }
||||||| 0306caa
  const handleSubmit = (e) => {
    e.preventDefault();  
   console.log("submitted form")
  };
=======
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
			// const fromCity = cities.find((city) => from === city.title).placeId;
			// const toCity = cities.find((city) => to === city.title).placeId;
			// const arriveDate = formatDate(arrivalDate);
			// const leaveDate = formatDate(departDate);
			// const response = await fetch(
			// 	`api/flights/quotes/${fromCity}/${toCity}/${arriveDate}/?inboundDate=${leaveDate}`
			// );
			// const data = await response.json();
			// submit({
			// 	date: arrivalDate.toString(),
			// 	quotes: data.Quotes,
			// 	carriers: data.Carriers,
			// });
			submit({
				date: arrivalDate.toString(),
				quotes: mockData.Quotes,
				carriers: mockData.Carriers,
			});
		} else if (!from) {
			setFromError(true);
		} else if (!to) {
			setToError(true);
		} else {
			setDateError(true);
		}
	};
>>>>>>> 9dcc6febb6386bfe6eabea80a4ef6d54162b7a9d

<<<<<<< HEAD
  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit}>
        <Paper className={classes.paperContainer} elevation={7}>
          <Grid className={classes.input} lg={2} sm={3} xs={6} item>
            <InputLabel className={classes.inputLabel}>From</InputLabel>
            <Autocomplete
              freeSolo
              id="from"
              name="from"
              options={cities.map((city) => city.title)}
              defaultValue={from}
              value={from}
              onChange={(e)=> setFrom(e.target.value)}
              style={{ width: 150 }}
              renderInput={(params) => <TextField name="from" {...params} />}
            />
          </Grid>
          {/* <Grid className={classes.input} lg={2} sm={3} xs={6} item>
            <InputLabel className={classes.inputLabel}>Where to go</InputLabel>
            <Autocomplete
              freeSolo
              id="to"
              name="to"
              options={cities.map((city) => city.title)}
              defaultValue={to}
              value={to}
              onChange={(_, newValue) => {
                setTo((v) => ({ ...v, to: newValue }));
              }}
              style={{ width: 150 }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid> */}
          <Grid className={classes.input} lg={2} sm={3} xs={6} item>
            <InputLabel className={classes.inputLabel}>Arrival</InputLabel>
            <TextField
              id="date"
              type="date"
              name="departure"
              defaultValue={arrival}
              onChange={(e) => setArrival(e.target.value)}
              className={classes.textField}
              InputProps={{
                className: classes.textField,
                disableUnderline: true
            }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid className={classes.input} lg={2} sm={3} xs={6} item>
            <InputLabel className={classes.inputLabel}>Departure</InputLabel>
            <TextField
              id="date"
              type="date"
              name="departure"
              defaultValue={departure}
              className={classes.textField}
              onChange={(e) => setDeparture(e.target.value)}
              InputProps={{
                className: classes.textField,
                disableUnderline: true
            }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid className={classes.travelDiv} lg={3} sm={12} xs={12} item>
            <Grid item lg={8} sm={3} xs={6}>
              <InputLabel className={classes.inputLabel}>Travellers</InputLabel>
              <TextField
                id="travellers"
                onChange={(e) => setTravellers(e.target.value)}
                type="number"
                name="travellers"
                InputProps={{
                  className: classes.textField,
                  disableUnderline: true
              }}
                value={travellers}
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
||||||| 0306caa
  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit}>
        <Paper className={classes.paperContainer} elevation={7}>
          <Grid className={classes.input} lg={2} sm={3} xs={6} item>
            <InputLabel className={classes.inputLabel}>From</InputLabel>
            <Autocomplete
              freeSolo
              id="from"
              name="from"
              options={cities.map((city) => city.title)}
              defaultValue={from}
              value={from}
              onChange={(...[, v]) => setFrom(v)}
              style={{ width: 150 }}
              renderInput={(params) => <TextField name="from" {...params} />}
            />
          </Grid>
          <Grid className={classes.input} lg={2} sm={3} xs={6} item>
            <InputLabel className={classes.inputLabel}>Where to go</InputLabel>
            <Autocomplete
              freeSolo
              id="to"
              name="to"
              options={cities.map((city) => city.title)}
              defaultValue={to}
              value={to}
              onChange={(...[, v]) => setTo(v)}
              style={{ width: 150 }}
              renderInput={(params) => <TextField name="to" {...params} />}
            />
          </Grid>
          <Grid className={classes.input} lg={2} sm={3} xs={6} item>
            <InputLabel className={classes.inputLabel}>Arrival</InputLabel>
            <TextField
              id="date"
              type="date"
              name="departure"
              defaultValue={arrival}
              onChange={(e) => setArrival(e.target.value)}
              className={classes.textField}
              InputProps={{
                className: classes.textField,
                disableUnderline: true
            }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid className={classes.input} lg={2} sm={3} xs={6} item>
            <InputLabel className={classes.inputLabel}>Departure</InputLabel>
            <TextField
              id="date"
              type="date"
              name="departure"
              defaultValue={departure}
              className={classes.textField}
              onChange={(e) => setDeparture(e.target.value)}
              InputProps={{
                className: classes.textField,
                disableUnderline: true
            }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid className={classes.travelDiv} lg={3} sm={12} xs={12} item>
            <Grid item lg={8} sm={3} xs={6}>
              <InputLabel className={classes.inputLabel}>Travellers</InputLabel>
              <TextField
                id="travellers"
                onChange={(e) => setTravellers(e.target.value)}
                type="number"
                name="travellers"
                InputProps={{
                  className: classes.textField,
                  disableUnderline: true
              }}
                value={travellers}
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
=======
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
>>>>>>> 9dcc6febb6386bfe6eabea80a4ef6d54162b7a9d
};

export default FlightSearch;
