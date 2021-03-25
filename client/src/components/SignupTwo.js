/** @format */

import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  InputBase,
} from "@material-ui/core";
import { useStyles } from "../styles/Signup_in";

import { Link } from "react-router-dom";

import { useStateContext } from "../context";

import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { Autocomplete } from "@material-ui/lab";

const SignupTwo = ({ dash, close, user }) => {
  const classes = useStyles();
  const { cities } = useStateContext();
  const [travelList, setTravelList] = useState([]);
  const [destination, setDestination] = useState("");
  const [selectCityError, setSelectCityError] = useState(false);
  const [open, setOpen] = useState(false);

  const handleTextChange = (_, value) => {
    setDestination(value);
  };
  const openAdd = () => {
    setSelectCityError(false);
    setOpen(!open);
    setDestination("");
  };

  const handleAdd = () => {
    const newAdd = destination.trim();
    const isInList = travelList.includes(newAdd);

    if (destination.length === 0) {
      setSelectCityError(true);
    } else {
      if (isInList) {
        setDestination("");
        setOpen(!open);
      } else {
        setTravelList((prevState) => [...prevState, newAdd]);
        setDestination("");
        setOpen(!open);
      }
    }
  };

  const handleDelete = (place) => {
    const newList = travelList.filter(
      (t) => t.toLowerCase() !== place.toLowerCase(),
    );
    setTravelList(newList);
  };

  const handleSubmit = async (event) => {
    const userId = user?._id;
    event.preventDefault();
    try {
      const res = await fetch(`/api/users/${userId}/favorite-cities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cities: travelList }),
      });
      const resData = await res.json();
      if (resData.message === "Updated") {
        window.location.href = "/explore";
      } else {
        dash();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container
      id="modal-content"
      maxWidth="xs"
      className={classes.paper}
      classes={{ root: classes.contain }}
    >
      <Box textAlign="right" className="modal-header">
        <IconButton onClick={() => close()}>
          <CloseIcon classes={{ root: classes.closeModal }} />
        </IconButton>
      </Box>
      <div className={`modal-body ${classes.modalBody}`}>
        <Typography
          component="h1"
          variant="h4"
          align="center"
          className={classes.modalTitle}
        >
          Success!
        </Typography>
        <Typography
          component="p"
          variant="subtitle1"
          align="center"
          className={classes.modalSubtitle}
        >
          Please select your favorite travel destinations
        </Typography>
        <Grid container spacing={1}>
          {travelList.map((place) => (
            <Grid key={place} item xs={12}>
              <InputBase
                name={place}
                id={place}
                value={place}
                readOnly
                fullWidth
                classes={{ root: classes.inputBase, input: classes.input }}
                startAdornment={
                  <InputAdornment position="start">
                    <LocationOnOutlinedIcon
                      classes={{ root: classes.locationIcon }}
                    />
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={`remove ${place}`}
                      onClick={() => handleDelete(place)}
                      size="small"
                    >
                      <CloseIcon classes={{ root: classes.closeIcon }} />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Grid>
          ))}
        </Grid>
        <Box textAlign="center" mt={3} mb={2}>
          {open ? (
            <Autocomplete
              freeSolo
              id="add-destination"
              name="add-destination"
              value={destination}
              options={cities?.map((option) => option.name)}
              onChange={handleTextChange}
              classes={{ inputRoot: classes.inputRoot }}
              renderInput={(params) => {
                params.InputProps.startAdornment = (
                  <InputAdornment position="start">
                    <HighlightOffIcon
                      style={{ cursor: "pointer" }}
                      onClick={openAdd}
                    />
                  </InputAdornment>
                );
                params.InputProps.endAdornment = (
                  <InputAdornment position="end">
                    <AddIcon
                      onClick={handleAdd}
                      style={{ cursor: "pointer" }}
                    />
                  </InputAdornment>
                );
                return (
                  <TextField
                    {...params}
                    color="secondary"
                    helperText={selectCityError ? "Please enter city" : ""}
                    error={selectCityError}
                  />
                );
              }}
            />
          ) : (
            <Button
              disabled={travelList.length === 3 ? true : false}
              className={classes.link}
              onClick={openAdd}
            >
              Add more
            </Button>
          )}
        </Box>
        <Box textAlign="center">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            classes={{ root: classes.modalSubmit }}
            onClick={handleSubmit}
          >
            Continue
          </Button>
        </Box>
      </div>
      {/* Need to change the footer if user is automatically signed in. */}
      <div className="modal-footer">
        <Typography
          component="p"
          variant="subtitle1"
          align="center"
          className={classes.modalFooter}
        >
          Already have an account?{" "}
          <Link to="/signin" className={classes.link}>
            Sign In
          </Link>
        </Typography>
      </div>
    </Container>
  );
};
export default SignupTwo;
