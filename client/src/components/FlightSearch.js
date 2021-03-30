import React, {useState} from "react";

import { Grid, Paper, TextField, Button } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import debounce from "lodash/debounce";
import useStyles from "../styles/FlightSearch";

const cities = [
  { title: "Vancouver" },
  { title: "Calgary" },
  { title: "Toronto" },
  { title: "Bangkok" },
];

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
  const [fromcities, setFromCities] = useState([]);
  const [tocities, setToCities] = useState([]);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const newDate = new Date(year, month, day);
    return newDate.toISOString().split("T")[0];
  };

  const handleFromLocation = async (event, value, reason) => {
    if (value === "") return;
    if (reason === "input") {
      try {
        const response = await fetch(`/api/flights/places/${value}`);
        const data = await response.json();
        setFromCities(data.Places);
      } catch (err) {
        console.error();
      }
    }
    setFromError(false);
  };

  const handleToLocation = async (event, value, reason) => {
    if (value === "") return;
    if (reason === "input") {
      try {
        const response = await fetch(`/api/flights/places/${value}`);
        const data = await response.json();
        setToCities(data.Places);
      } catch (error) {
        console.error();
      }
    }
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
  const handleFetch = async () => {
    const fromCity = cities.find((city) => from === city.title).title;
    const toCity = cities.find((city) => to === city.title).title;
    const formattedDepartureDate = formatDate(departureDate);
    const formattedReturnDate = returnDate ? formatDate(returnDate) : null;
    const response = await fetch(
      `api/flights/quotes/${fromCity}/${toCity}/${formattedDepartureDate}${
        returnDate ? `/?inboundDate=${formattedReturnDate}` : ""
      }`
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
    } else if ("inboundDate" in data) {
      setReturnDateError(true);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (from && to && from !== to && departureDate && returnDate) {
      if (returnDate >= departureDate) {
        handleFetch();
      } else {
        setReturnDateError(true);
      }
      // return date is optional
    } else if (from && to && from !== to && departureDate) {
      handleFetch();
    } else if (from === to || !to) {
      setToError(true);
    } else if (!from) {
      setFromError(true);
    }
  };

  return (
    <div className={classes.root}>
      <form>
        <Paper className={classes.paperContainer} elevation={7}>
          <Grid className={classes.input} lg={2} sm={3} xs={6} item>
            <Autocomplete
              freeSolo
              id="from"
              value={from}
              options={fromcities.map((option) => option.PlaceName)}
              onChange={(_, value) => setFrom(value)}
              onInputChange={debounce(
                (event, value, reason) =>
                  handleFromLocation(event, value, reason),
                500
              )}
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
              options={tocities.map((option) => option.PlaceName)}
              onChange={(_, value) => setTo(value)}
              onInputChange={debounce(
                (event, value, reason) =>
                  handleToLocation(event, value, reason),
                500
              )}
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
