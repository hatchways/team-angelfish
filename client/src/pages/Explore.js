import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Favorite from "@material-ui/icons/Favorite";
import { CustomSmallerCheckBox } from "../themes/theme";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles({
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20,
    paddingTop: 0,
    paddingLeft: 20,
  },
  paperContainer: {
    height: 300,
    borderRadius: 10,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  title: {
    margin: 5,
    textAlign: "center",
  },
  customCheckBoxRoot: {
    width: 5,
    height: 5,
  },
  bottomInformationContainer: {
    display: "flex",
    height: "15%",
    borderTop: "1px solid #a9a9a9",
    padding: 10,
    justifyContent: "space-between",
  },
  bottomInformationSubContainer1: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: 10,
  },
  bottomInformationSubContainer2: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  subtitle2: {
    color: "#c5bec4",
    fontSize: 12,
  },
  favoriteDefaultIcon:{
    color: "white"
  },
  favoriteCheckedIcon:{
    color: "orange"
  },
  gridContainer: {
    marginTop: 32, height: "75%"
  },
  legend1: {
    fontSize: 17,
    color: "white"
  },
  legend2:{
    fontSize: 11,
    color: "rgb(175 175 175)"
  }
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function FavoriteCheckBox({ place, userId, handleFavoriteChange, openSnack}) {
  const classes = useStyles();
  const [checked, setChecked] = useState(place.favorite);
  return (
    <>
      <CustomSmallerCheckBox
        checked={checked}
        onChange={(e) => {
          if(userId){
            setChecked(e.target.checked);
            handleFavoriteChange(e.target.checked, place.name);
          }else{
            //@TODO: display login form
            openSnack();
          }
        }}
        icon={<Favorite className={classes.favoriteDefaultIcon} />}
        checkedIcon={<Favorite className={classes.favoriteCheckedIcon} />}
        classes={{ root: classes.customCheckBoxRoot }}
      />
    </>
  );
}

const Explore = ({userId}) => {
  const classes = useStyles();
  const [favorites, setFavorites] = useState([]);
  const [places, setPlaces] = useState([]);
  const [snack, setSnack] = useState({ type: "", message: "", open: false });
  const closeSnack = () => {
    setSnack((prevState) => {
      return { ...prevState, open: false };
    });
  };

  const openSnack = (errorMessage) =>{
    setSnack({ type: "info", message: "Please signing or signup first!", open: true });
  }
  useEffect(() => {
    async function getData() {
      try {
        let favoriteList = [];
        if(userId){
          const favoriteResponse = await (await fetch(
            `/api/users/${userId}/favorite-cities`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          )).json();
          //Assuming that the explore page can be accessed by both authenticated and unAuthenticated user.
          favoriteList = Array.isArray(favoriteResponse) ? favoriteResponse : [];
          setFavorites(favoriteList);
        }
        const cityListResponse = await fetch("/api/cities", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const cityList = await cityListResponse.json();
        cityList.map(city => {
          city.favorite = favoriteList.indexOf(city.name) >= 0;
          return city;
        });
        setPlaces(cityList);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);
  function handleFavoriteChange(checked, name) {
    const userFavoritePlaces = [...favorites];
    if (checked) {
      //add
      userFavoritePlaces.push(name);
    } else {
      //remove
      const placeIndex = userFavoritePlaces.indexOf(name);
      if (placeIndex >= 0) {
        userFavoritePlaces.splice(placeIndex, 1);
      }
    }
    setFavorites(userFavoritePlaces);
    fetch(`/api/users/${userId}/favorite-cities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cities: userFavoritePlaces }),
    });
  }
  return (
    <Container className={classes.pageContainer}>
      <Typography variant="h4" className={classes.title}>
        Explore destinations
      </Typography>
      <Typography
        variant="subtitle2"
        className={(classes.title, classes.subtitle2)}
      >
        World's top destinations to explore
      </Typography>
      <Grid
        container
        spacing={3}
        justify="center"
        className={classes.gridContainer}
      >
        {places.map((place) => (
          <Grid item key={place.name} xs={12} sm={3}>
            <div
              className={classes.paperContainer}
              style={{
                backgroundImage: `linear-gradient(to bottom, transparent, rgba(52, 52, 52, 0.63)), url(${place.imageUrl})`,
              }}
            >
              <div className={classes.bottomInformationContainer}>
                <span className={classes.bottomInformationSubContainer1}>
                  <span className={classes.legend1}>
                    {place.name},
                  </span>
                  <span className={classes.legend2}>
                    {place.country}
                  </span>
                </span>
                <span className={classes.bottomInformationSubContainer2}>
                  <FavoriteCheckBox
                    place={place}
                    userId={userId}
                    handleFavoriteChange={handleFavoriteChange}
                    openSnack={openSnack}
                  />
                </span>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={closeSnack}
      >
        <Alert severity={snack.type}>
          {snack.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Explore;
