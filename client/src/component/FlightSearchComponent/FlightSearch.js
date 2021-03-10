import React, { useState, useRef } from 'react';

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
  const ref0 = useRef();
  const curr = new Date();
  curr.setDate(curr.getDate());
  const date = curr.toISOString().substr(0, 10);

  const [state, setState] = useState({
    from: 'Vancouver',
    to: 'Bangkok',
    arrival: date,
    departure: date,
    travellers: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSelect = (e, v, r) => {
    const name = ref0.current.getAttribute('name');
    setState({ ...state, [name]: v });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
              ref={ref0}
              name='from'
              options={cities.map((city) => city.title)}
              defaultValue={state.from}
              value={state.from}
              onChange={onSelect}
              style={{ width: 150 }}
              renderInput={(params) => (
                <TextField name='text-from' {...params} />
              )}
            />
          </Grid>
          <Grid className={classes.input} lg={2} sm={3} xs={6} item>
            <InputLabel>Where to go</InputLabel>
            <Autocomplete
              freeSolo
              id='to'
              ref={ref0}
              name='to'
              options={cities.map((city) => city.title)}
              defaultValue={state.to}
              value={state.to}
              onChange={onSelect}
              style={{ width: 150 }}
              renderInput={(params) => <TextField name='text-to' {...params} />}
            />
          </Grid>
          <Grid className={classes.input} lg={2} sm={3} xs={6} item>
            <InputLabel>Arrival</InputLabel>
            <TextField
              id='date'
              type='date'
              name='departure'
              defaultValue={state.arrival}
              onChange={handleChange}
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
              defaultValue={state.departure}
              className={classes.textField}
              onChange={handleChange}
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
                onChange={handleChange}
                type='number'
                name='travellers'
                value={state.travellers}
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
