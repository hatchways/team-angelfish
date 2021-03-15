import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
//Remove the next line when backend data is available.
import places from "../../database/places";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Favorite from "@material-ui/icons/Favorite";
import {CustomSmallerCheckBox} from "../../themes/theme";

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

function FavoriteCheckBox() {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  return (
    <div>
      <CustomSmallerCheckBox
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        icon={<Favorite style={{ color: "white" }} />}
        checkedIcon={<Favorite style={{ color: "orange" }} />}
        classes={{ root: classes.customCheckBoxRoot }}
      />
    </div>
  );
}

const Explore = () => {
  const classes = useStyles();
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
        {places.map((place) => (
          <Grid item>
            <div
              className={classes.paperContainer}
              style={{
                backgroundImage: `linear-gradient(to bottom, transparent, rgba(52, 52, 52, 0.63)), url(${place.imageUrl})`,
              }}
            >
              <div className={classes.bottomInformationContainer}>
                <span className={classes.bottomInformationSubContainer1}>
                  <span style={{ fontSize: 17, color: "white" }}>
                    {place.townName},
                  </span>
                  <span style={{ fontSize: 11, color: "rgb(175 175 175)" }}>
                    {place.countryName}
                  </span>
                </span>
                <span className={classes.bottomInformationSubContainer2}>
                  <FavoriteCheckBox />
                </span>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Explore;
