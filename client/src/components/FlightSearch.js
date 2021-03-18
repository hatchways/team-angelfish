import React, { useState, useEffect } from "react";
import { Grid, Paper, TextField, Button, InputLabel } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

import useStyles from "../styles/FlightSearch";


const FlightSearch = () => {
  const classes = useStyles();
  const curr = new Date();
  curr.setDate(curr.getDate());
  const date = curr.toISOString().substr(0, 10);
  const [from, setFrom] = useState("Vancouver");
  const [to, setTo] = useState("Bangkok");
  const [arrival, setArrival] = useState(date);
  const [cities, setCities] = useState([])
  const [departure, setDeparture] = useState(date);
  const [travellers, setTravellers] = useState(1);


  useEffect(()=>{
    const getCities = async () =>{
      try{
       const cityListResponse = await fetch("/api/cities", {
         method: "GET",
         headers: {
           "Content-Type": "application/json",
         },
       });
       const cityList = await cityListResponse.json();
       setCities(cityList)
      } catch(err){
        console.log(err)
      }
    }
    getCities()
   }, [])

   console.log(cities)

  const handleSubmit = (e) => {
    e.preventDefault();
   console.log("submitted form")
  };

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
              options={cities.map((city) => city.name)}
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
              options={cities.map((city) => city.name)}
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
};

export default FlightSearch;
