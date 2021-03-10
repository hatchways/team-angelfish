import React, { useState } from 'react';

import { Grid, Paper, TextField, Button, InputLabel } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

import useStyles from './styles';

// Mock Data
const cities = [
  { title: 'Vancouver' },
  { title: 'Calgary' },
  { title: 'Toronto' },
  { title: 'Bangkok' },
];

const FlightSearch = () => {
  const classes = useStyles();

  const curr = new Date();
  curr.setDate(curr.getDate());
  const date = curr.toISOString().substr(0, 10);

  const [from, setFrom] = useState('Vancouver');
  const [to, setTo] = useState('Bangkok');
  const [arrival, setArrival] = useState(date);
  const [departure, setDeparture] = useState(date);
  const [travellers, setTravellers] = useState(1);

  const onSelectFrom = (...[, value]) => {
    setFrom(value);
  };

  const onSelectTo = (...[, value]) => {
    setTo(value);
  };

  const handleArrival = (e) => {
    const { value } = e.target;
    setArrival(value);
  };

  const handleDeparture = (e) => {
    const { value } = e.target;
    setDeparture(value);
  };

  const handleTravellers = (e) => {
    const { value } = e.target;
    setTravellers(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchObject = {
      from: from,
      to: to,
      arrival: arrival,
      departure: departure,
      travellers: travellers,
    };
  };

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit}>
        <Paper className={classes.paperContainer} elevation={7}>
          <Grid className={classes.input} lg={2} sm={3} xs={6} item>
            <InputLabel>From</InputLabel>
            <Autocomplete
              freeSolo
              id='from'
              name='from'
              options={cities.map((city) => city.title)}
              defaultValue={from}
              value={from}
              onChange={onSelectFrom}
              style={{ width: 150 }}
              renderInput={(params) => <TextField name='from' {...params} />}
            />
          </Grid>
          <Grid className={classes.input} lg={2} sm={3} xs={6} item>
            <InputLabel>Where to go</InputLabel>
            <Autocomplete
              freeSolo
              id='to'
              name='to'
              options={cities.map((city) => city.title)}
              defaultValue={to}
              value={to}
              onChange={onSelectTo}
              style={{ width: 150 }}
              renderInput={(params) => <TextField name='to' {...params} />}
            />
          </Grid>
          <Grid className={classes.input} lg={2} sm={3} xs={6} item>
            <InputLabel>Arrival</InputLabel>
            <TextField
              id='date'
              type='date'
              name='departure'
              defaultValue={arrival}
              onChange={handleArrival}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid className={classes.input} lg={2} sm={3} xs={6} item>
            <InputLabel>Departure</InputLabel>
            <TextField
              id='date'
              type='date'
              name='departure'
              defaultValue={departure}
              className={classes.textField}
              onChange={handleDeparture}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid className={classes.travelDiv} lg={3} sm={12} xs={12} item>
            <Grid item lg={8} sm={3} xs={6}>
              <InputLabel>Travellers</InputLabel>
              <TextField
                id='travellers'
                onChange={handleTravellers}
                type='number'
                name='travellers'
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
};

export default FlightSearch;
