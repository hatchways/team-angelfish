import React from 'react';

import { Grid, Typography } from '@material-ui/core';

import backgroundImg from '../../assets/images/birdseye-beach.jpeg';
import FlightSearchComponent from '../../component/FlightSearchComponent/FlightSearch';

import useStyles from './styles';

function Flights() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid className={classes.container} container maxwidth='false'>
        <Grid className={classes.titleContainer} item xs={5}>
          <Typography className={classes.header}>
            Find the flights and<br></br> start the holiday.
          </Typography>
        </Grid>
        <Grid className={classes.heroContainer} item xs={7}>
          <img className={classes.heroImg} src={backgroundImg} />
        </Grid>
        <div className={classes.searchDiv}>
          <FlightSearchComponent />
        </div>
      </Grid>
    </div>
  );
}

export default Flights;
