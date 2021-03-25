import React, { useState } from "react";
import {
  Grid,
  Paper,
  TextField,
  Button,
  InputLabel,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import useStyles from "../styles/HotelSearch";

const hotelCities = [
  { title: "Bali" },
  { title: "Tokyo" },
  { title: "Barcelona" },
  { title: "Bangkok" },
];
const curr = new Date();
curr.setDate(curr.getDate());
const date = curr.toISOString().substr(0, 10);

function HotelSearch() {
  const classes = useStyles();

  const [to, setTo] = useState("Bali");
  const [checkIn, setcheckIn] = useState(date);
  const [checkOut, setCheckOut] = useState(date);
  const [travellers, setTravellers] = useState("1 room, 2 travellers");
  

  return (
    <Grid>
      <Grid className={classes.root}>
        <form>
          <Paper className={classes.paperContainer} elevation={7}>
            <Grid className={classes.input} lg={2} sm={3} xs={6} item>
              <InputLabel className={classes.inputLabel}>Going to</InputLabel>
              <Autocomplete
                freeSolo
                id="to"
                name="to"
                options={hotelCities.map((city) => city.title)}
                defaultValue={to}
                value={to}
                onChange={(...[, v]) => setTo(v)}
                style={{ width: 150 }}
                renderInput={ (params) => <TextField name="to"  {...params} />}
              />
            </Grid>
            <Grid className={classes.input} lg={2} sm={3} xs={6} item>
              <InputLabel className={classes.inputLabel}>Check-in</InputLabel>
              <TextField
                id="checkinDate"
                type="date"
                name="Check-In"
                defaultValue={checkIn}
                onChange={(e) => setcheckIn(e.target.value)}
                InputProps={{
                  className: classes.textField,
                  disableUnderline: true,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid className={classes.input} lg={2} sm={3} xs={6} item>
              <InputLabel className={classes.inputLabel}>Check-out</InputLabel>
              <TextField
                id="checkoutDate"
                type="date"
                name="Check-Out"
                defaultValue={checkOut}
                className={classes.textField}
                onChange={(e) => setCheckOut(e.target.value)}
                InputProps={{
                  className: classes.textField,
                  disableUnderline: true,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid className={classes.travelDiv} lg={3} sm={12} xs={12} item>
              <Grid className={classes.guestInfo} item lg={8} sm={3} xs={6}>
                <InputLabel className={classes.inputLabel}>
                  Travellers
                </InputLabel>
                <TextField
                  id="travellers"
                  onChange={(e) => setTravellers(e.target.value)}
                  type="text"
                  name="travellers"
                  value={travellers}
                  InputProps={{
                    className: classes.roomandtravellers,
                    disableUnderline: true,
                  }}
                />
              </Grid>
              <Grid item lg={4} sm={9} xs={6}>
                <Button className={classes.searchBtn}>Search</Button>
              </Grid>
            </Grid>
          </Paper>
        </form>
      </Grid>
    </Grid>
  );
}

export default HotelSearch;
