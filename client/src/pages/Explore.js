import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Favorite from "@material-ui/icons/Favorite";
import { CustomSmallerCheckBox } from "../themes/theme";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import useStyles from "../styles/Explore";

import { useStateContext } from "../context";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function FavoriteCheckBox({ place, userId, handleFavoriteChange, openSnack }) {
  const classes = useStyles();
  const [checked, setChecked] = useState(place.favorite);
  return (
    <>
      <CustomSmallerCheckBox
        checked={checked}
        onChange={(e) => {
          if (userId) {
            setChecked(e.target.checked);
            handleFavoriteChange(e.target.checked, place.name);
          } else {
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

const Explore = () => {
  const { user, loading } = useStateContext();
  const userId = user?._id;
  const classes = useStyles();
  const [favorites, setFavorites] = useState([]);
  const [places, setPlaces] = useState([]);
  const [snack, setSnack] = useState({ type: "", message: "", open: false });

  console.log(places);
  const shuffleFunction = (array) => {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  const handleShuffleButton = async () => {
    const unLikesPlaceName = places
      .filter((place) => !favorites.includes(place.name))
      .filter(
        (i) =>
          i._id === "6053df6b73bc53b4b4e8f2fd" || "6053df8173bc53b4b4e8f2fe",
      );
    const favoritePlaces = places.filter((place) =>
      favorites.includes(place.name),
    );
    const shuffledArray = await shuffleFunction(unLikesPlaceName);
    const mergedArray = [...favoritePlaces, ...shuffledArray];
    setPlaces(mergedArray);
  };

  const closeSnack = () => {
    setSnack((prevState) => {
      return { ...prevState, open: false };
    });
  };

  const openSnack = (errorMessage) => {
    setSnack({
      type: "info",
      message: "Please signing or signup first!",
      open: true,
    });
  };

  useEffect(() => {
    async function getData() {
      try {
        if (loading) {
          return null;
        } else {
          let favoriteList = [];
          //Assuming that the explore page can be accessed by both authenticated and unAuthenticated user.
          if (userId) {
            favoriteList = await (
              await fetch(`/api/users/${userId}/favorite-cities`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              })
            ).json();
            setFavorites(favoriteList);
          }
          const cityListResponse = await fetch("/api/cities", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const cityList = await cityListResponse.json();
          cityList.map((city) => {
            city.favorite = favoriteList.indexOf(city.name) >= 0;
            return city;
          });
          setPlaces(cityList);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getData();
  }, [loading]);

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
    <>
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
        <Button onClick={handleShuffleButton}>Shuffle</Button>
        <Grid
          container
          spacing={3}
          justify="center"
          className={classes.gridContainer}
        >
          {places.map((place, ind) => (
            <Grid item key={place.name} xs={12} sm={3}>
              <div
                className={classes.paperContainer}
                style={{
                  backgroundImage: `linear-gradient(to bottom, transparent, rgba(52, 52, 52, 0.63)), url(${place.imageUrl})`,
                }}
              >
                <div className={classes.bottomInformationContainer}>
                  <span className={classes.bottomInformationSubContainer1}>
                    <span className={classes.legend1}>{place.name},</span>
                    <span className={classes.legend2}>{place.country}</span>
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
          <Alert severity={snack.type}>{snack.message}</Alert>
        </Snackbar>
      </Container>
    </>
  );
};

export default Explore;
