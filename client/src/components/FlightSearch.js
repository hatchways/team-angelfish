import React, { useState } from "react";

import { Grid, Paper, TextField, Button } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import DateFnsUtils from "@date-io/date-fns";
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from "@material-ui/pickers";
import useStyles from "../styles/FlightSearch";


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
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [travellers, setTravellers] = useState(1);
  const [departDateError, setDepartDateError] = useState(false);
  const [returnDateError, setReturnDateError] = useState(false);
  const [fromError, setFromError] = useState(false);
  const [toError, setToError] = useState(false);
  const [fromCities, setFromCities] = useState([]);
  const [toCities, setToCities] = useState([]);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const newDate = new Date(year, month, day);
    return newDate.toISOString().split("T")[0];
  };

  const handleFromLocation = async (event, value) => {
    if (value === "") {
      return;
    }
    try {
      const response = await fetch(`/api/flights/places/${value}`);
      const data = await response.json();
	  console.log(data)
      setFromCities(data.Places);
    } catch (err) {
      console.error();
    }
    setFromError(false)
  };


  const handleToLocation = async (event, value) => {
    if (value === "") {
		return;
	  }
	  try {
		const response = await fetch(`/api/flights/places/${value}`);
		const data = await response.json();
		setToCities(data.Places);
	  } catch (err) {
		console.error();
	  }
	setToError(false)
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
	  console.log("testing")
  	const fromCity = fromCities.find((city) => from === city.PlaceName).PlaceId;
  	const toCity = toCities.find((city) => to === city.PlaceName).PlaceId;
  	const formattedDepartureDate = formatDate(departureDate);
  	const formattedReturnDate = formatDate(returnDate);
  	if (from && to && departureDate && returnDate) {
  		if (returnDate >= departureDate) {
  			const response = await fetch(
  				`api/flights/quotes/${fromCity}/${toCity}/${formattedDepartureDate}/?inboundDate=${formattedReturnDate}`
  			);
  			const data = await response.json();
  			if (data.status === 200) {
  				submit({
  					date: departureDate.toString(),
  					flights: data,
  				});

				  console.log(response)
  			} else if ("from" in data) {
  				setFromError(true);
  			} else if ("to" in data) {
  				setToError(true);
  			} else if ("outboundDate" in data) {
  				setDepartDateError(true);
  			} else {
  				setReturnDateError(true);
  			}
  		} else {
  			setReturnDateError(true);
  		}
  		// return date is optional
  	} else if (from && to && departureDate) {
  		const response = await fetch(
  			`api/flights/quotes/${from}/${to}/${formattedDepartureDate}`
  		);
  		const data = await response.json();
  		if (data.status === 200) {
  			submit({
  				date: departureDate.toString(),
  				flights: data,
  			});

			  console.log(data)
  		} else if ("from" in data) {
  			setFromError(true);
  		} else if ("to" in data) {
  			setToError(true);
  		} else if ("outboundDate" in data) {
  			setDepartDateError(true);
  		} else {
  			setReturnDateError(true);
  		}
  	} else if (!from) {
  		setFromError(true);
  	} else if (!to) {
  		setToError(true);
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
              value={from}
			  onChange={(_, value)=> setFrom(value)}
              options={fromCities.map((option) => option.PlaceName)}
              onInputChange={handleFromLocation}
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
              options={toCities.map((option) => option.PlaceName)}
			  onChange={(_, value)=> setTo(value)}
			  onInputChange={handleToLocation}
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
              <Button onClick={handleSubmit}  className={classes.searchBtn}>Search</Button>
            </Grid>
          </Grid>
        </Paper>
      </form>
    </div>
  );
};

export default FlightSearch;
