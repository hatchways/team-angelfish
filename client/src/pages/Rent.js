import React, { useState} from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import useStyles from "../styles/Rent";
import TextField from "@material-ui/core/TextField";
import { Paper, Typography } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
var classNames = require("classnames");

//Mock Data

const CarList = [
  {
    name: "Fiat 500",
    price: "62",
    total: "125",
    comment: "Or similar / Sedan",
    url: "https://drive.google.com/uc?id=1GuQ-LDMfBnkO5SQY5le0wqq2a8OnwEhl",
  },
  {
    name: "Jeep ",
    price: "25",
    total: "132",
    comment: "Or similar / Sedan",
    url: "https://drive.google.com/uc?id=1COvvFLhKKfSdrthD5vNg9NAq1mPgsJji",
  },
  {
    name: "Peugeot 208",
    price: "67",
    total: "136",
    comment: "Or similar / Sedan",
    url: "https://drive.google.com/uc?id=1dFv1WeIjdbAGO5eiKYM6TbqDsGGAu4rq",
  },
  {
    name: "Peugeot 308",
    price: "69",
    total: "138",
    comment: "Or similar / Sedan",
    url: "https://drive.google.com/uc?id=1sxxaGrfKS3S8XUdG9xim_GdwXlKUfujR",
  },
  {
    name: "Honda civic",
    price: "25",
    total: "132",
    comment: "Or similar / Sedan",
    url: "https://drive.google.com/uc?id=1Feaixf_o87HkyIGYfwupBq6lHl5XmtRk",
  },
  {
    name: "Nissan March Ak12",
    price: "45",
    total: "120",
    comment: "Or similar / Sedan",
    url: "https://drive.google.com/uc?id=1Bk-DvIXkr2B5BfGe_V6oACKHHwegVVZk",
  },
  {
    name: "Mazda",
    price: "25",
    total: "132",
    comment: "Or similar / Sedan",
    url: "https://drive.google.com/uc?id=1BwR493KbJ8Nm2lsqttStrxZxPBT2BCL3",
  },
  {
    name: "Nissan pulsar",
    price: "25",
    total: "132",
    comment: "Or similar / Sedan",
    url: "https://drive.google.com/uc?id=1RNJc5fZTw5Q-yOE_uF4rka6LTT5DekC6",
  },
];

const Rent = () => {
  const classes = useStyles();
  const [checkState, setCheckState] = useState(false);
  const handleChange = (event) => {
    setCheckState(event.target.checked);
  };
  return (
    <Container className={classes.pageContainer}>
      <Grid container className={classes.filterContainer}>
        <div className={classes.filterContainer}>
          <div className={classes.textFieldContainer0}>
            <TextField
              id="standard-read-only-input"
              label="Pick-up"
              defaultValue="Paris CDG Airport"
              disabled
              InputProps={{
                disableUnderline: true,
                classes: {
                  disabled: classes.disabled,
                },
              }}
            />
          </div>
          <div className={classes.textFieldContainer1}>
            <TextField
              id="standard-read-only-input"
              label="Return"
              defaultValue="Paris City Center"
              disabled
              InputProps={{
                disableUnderline: true,
                classes: {
                  disabled: classes.disabled,
                },
              }}
            />
          </div>
        </div>
        <div className={classes.filterContainer}>
          <div className={classes.textFieldContainer0}>
            <TextField
              id="standard-read-only-input"
              label="Pick-up Date"
              defaultValue="Thu, Jan 1 10:00AM"
              disabled
              InputProps={{
                disableUnderline: true,
                classes: {
                  disabled: classes.disabled,
                },
              }}
            />
          </div>
          <div className={classes.textFieldContainer1}>
            <TextField
              id="standard-read-only-input"
              label="Return Date"
              defaultValue="Thu, Jan 3 10:00 PM"
              disabled
              InputProps={{
                disableUnderline: true,
                classes: {
                  disabled: classes.disabled,
                },
              }}
            />
          </div>
        </div>
      </Grid>
      <Grid
        container
        className={classNames(
          classes.filterContainer,
          classes.filterContainer1
        )}
      >
        <Grid item>
          <Typography
            className={classNames(classes.filter0, classes.countResult)}
          >
            8 Offers
          </Typography>
        </Grid>
        <Grid item className={classes.filterContainer}>
          <Grid item className={classNames(classes.filter0, classes.filter01)}>
            <FormControlLabel
              control={
                <Switch onChange={handleChange} color="primary" checked={checkState} name="checkedA" />
              }
              label={
                <Typography className={classes.switchFilterText}>
                  Automatic Only
                </Typography>
              }
              labelPlacement="start"
            />
          </Grid>
          <Grid item className={classes.filter0}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="vehicleType">Vehicle Type</InputLabel>
              <Select
                labelId="vehicleTypeLabel"
                id="vehicleTypeSelect"
                label="vehicleType"
                className={classes.select}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Hatchback</MenuItem>
                <MenuItem value={20}>Convertible</MenuItem>
                <MenuItem value={30}>Sports</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item className={classes.filter0}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="driverFilter">Driver</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                label="Age"
                className={classes.select}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Driver 25+</MenuItem>
                <MenuItem value={20}>Driver 30+</MenuItem>
                <MenuItem value={30}>Driver 50+</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            className={classNames(classes.filter0, classes.filter0Last)}
          >
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                Price
              </InputLabel>
              <Select
                labelId="price"
                id="demo-simple-select-outlined"
                label="Age"
                className={classes.select}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Lower Price First</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={3}
        justify="center"
        className={classes.gridContainer}
      >
        {CarList.map((car) => (
          <Grid item key={car.name} xs={12} sm={3}>
            <Paper elevation={3} className={classes.paperContainer}>
              <div className={classes.headerInformation}>
                <div className={classes.bottomInformationContainer}>
                  <span className={classes.legend1}>{car.name}</span>
                  <span
                    className={classNames(
                      classes.subLegend1,
                      classes.comment
                    )}
                  >
                    {car.comment}
                  </span>
                </div>
              </div>
              <div className={classes.imageContainer}>
                <img className={classes.image} src={car.url} alt="carImage" />
              </div>
              <div className={classes.bottomInformationContainer}>
                <span className={classes.legend1}>
                  ${car.price}
                  <span className={classes.subLegend1}>/per day</span>
                </span>
                <span className={classes.legend2}>${car.total} Total</span>
              </div>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Rent;
