import React, {useState, useEffect} from "react";
import { Typography, Grid, Button } from "@material-ui/core";
import useStyles from "../styles/FavoriteDestinations";
import FavoriteCheckBox from "../components/FavoriteCheckBox";

function FavoriteDestinantions() {
  const classes = useStyles();
  const [places, setPlaces] = useState([])



  useEffect(() => {
    async function getData() {
      try {
        const cityListResponse = await fetch("/api/cities", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const cityList = await cityListResponse.json();
        setPlaces(cityList);
      } catch (error) {
        console.error();
      }
    }
    getData();
  }, []);


  
  return (
    <Grid className={classes.root}>
      <Button variant="outlined" style={{ float: "right", marginRight: 25 }}>
        Explore
      </Button>
      <Typography className={classes.title} variant="h5">
        Favorite Destinations
      </Typography>
      <Grid container spacing={3} justify="center" style={{ marginTop: 10 }}>
        {places.map((place, id) => (
          <Grid item key={id}>
            <Grid
              className={classes.paperContainer}
              style={{
                backgroundImage: `linear-gradient(to bottom, transparent, rgba(52, 52, 52, 0.63)), url(${place.imageUrl})`,
              }}
            >
              <Grid className={classes.bottomInformationContainer}>
                <span className={classes.bottomInformationSubContainer1}>
                  <span style={{ fontSize: 17, color: "white" }}>
                    {place.name},
                  </span>
                  <span style={{ fontSize: 11, color: "rgb(175 175 175)" }}>
                    {place.country}
                  </span>
                </span>
                <span className={classes.bottomInformationSubContainer2}>
                  <FavoriteCheckBox />
                </span>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

export default FavoriteDestinantions;
