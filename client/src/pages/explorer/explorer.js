import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Favorite from "@material-ui/icons/Favorite";
import { CustomSmallerCheckBox } from "../../themes/theme";

const useStyles = makeStyles({
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20,
  },
  paperContainer: {
    height: 250,
    width: 195,
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
    width: "5px",
    height: "5px",
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
});
let userFavoritePlaces = [];
function handleChange(checked, selectedElement) {
  if (checked) {
    //add
    userFavoritePlaces.push(selectedElement.name);
  } else {
    //remove
    const placeIndex = userFavoritePlaces.indexOf(selectedElement.name);
    if (placeIndex >= 0) {
      userFavoritePlaces.splice(placeIndex, 1);
    }
  }
  fetch("/api/users/updateFavoriteCities", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cities: userFavoritePlaces }),
  })
    .then((results) => {
      console.log(JSON.stringify(results));
    })
    .catch((err) => console.error(err.message));
}

function FavoriteCheckBox(props) {
  const classes = useStyles();
  const [checked, setChecked] = useState(props.favorite);
  return (
    <div>
      <CustomSmallerCheckBox
        checked={checked}
        onChange={(e) => {
          handleChange(e.target.checked, props.currentPlace);
          setChecked(e.target.checked);
        }}
        icon={<Favorite style={{ color: "white" }} />}
        checkedIcon={<Favorite style={{ color: "orange" }} />}
        classes={{ root: classes.customCheckBoxRoot }}
      />
    </div>
  );
}

const ExplorerPage = () => {
  const classes = useStyles();
  const [generalData, setGeneralData] = useState({places: [], favorites: []});
  const citiesUrl = "/api/cities/us/?population=1500000";
  const userFavoriteCitiesUrl = "/api/users/favoriteCities";
  useEffect(() => {
    async function getData(){
      try {
        const result1 = await fetch(userFavoriteCitiesUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
        const result2 = await fetch(citiesUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        })
        const places = await result2.json();
        const favorites = await result1.json();
        userFavoritePlaces = Array.isArray(favorites) ? favorites : [];
        setGeneralData({
          places: Array.isArray(places) ? places : [],
          favorites: Array.isArray(favorites) ? favorites : []
        });
      } catch (error) {
         console.log();
      }
    }
    getData();
  }, [userFavoriteCitiesUrl, citiesUrl]);
  return (
    <Container className={classes.pageContainer}>
      <Typography variant="h4" className={classes.title}>
        Explore destinations
      </Typography>
      <Typography
        variant="subtitle2"
        className={classes.title}
        style={{ color: "#c5bec4", fontSize: 12 }}
      >
        World's top destinations to explore
      </Typography>
      <Grid
        container
        spacing={2}
        justify="center"
        style={{ maxWidth: "75%", marginTop: 32 }}
      >
        {generalData.places.map((place) => (
          <Grid item key={place.name}>
            <div
              className={classes.paperContainer}
              style={{
                backgroundImage: `linear-gradient(to bottom, transparent, rgba(52, 52, 52, 0.63)), url(${place.imageUrl})`,
              }}
            >
              <div className={classes.bottomInformationContainer}>
                <span className={classes.bottomInformationSubContainer1}>
                  <span style={{ fontSize: 17, color: "white" }}>
                    {place.name},
                  </span>
                  <span style={{ fontSize: 11, color: "rgb(175 175 175)" }}>
                    {place.country}
                  </span>
                </span>
                <span className={classes.bottomInformationSubContainer2}>
                  <FavoriteCheckBox currentPlace={place} favorite={generalData.favorites.indexOf(place.name) >=0 }/>
                </span>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
export default ExplorerPage;
