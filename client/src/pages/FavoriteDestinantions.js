import React, {useState} from 'react'
import {Typography, Grid, Button} from "@material-ui/core";
import places from "../database/places";
import Favorite from "@material-ui/icons/Favorite";
import {CustomSmallerCheckBox} from "../themes/theme";
import useStyles from '../styles/FavoriteDestinations'


function FavoriteCheckBox() {
    const classes = useStyles();
    const [checked, setChecked] = useState(false);
    return (
      <div>
        <CustomSmallerCheckBox
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          icon={<Favorite style={{ color: "white" }} />}
          checkedIcon={<Favorite style={{ color: "#FFA000" }} />}
          classes={{ root: classes.customCheckBoxRoot }}
        />
      </div>
    );
  }


function FavoriteDestinantions() {

    const classes = useStyles();
    return (
        <Grid className={classes.root}>
          <Button variant="outlined" style={{float: "right", marginRight: 25}}>Explore</Button>
          <Typography className={classes.title} variant="h5">Favorite Destinations</Typography>
            <Grid
   container
   spacing={3}
   justify="center"
   style={{  marginTop: 10 }} >
   {places.map((place, index) => (
     <Grid item key={index}>
       <Grid
         className={classes.paperContainer}
         style={{
           backgroundImage: `linear-gradient(to bottom, transparent, rgba(52, 52, 52, 0.63)), url(${place.imageUrl})`,
         }}
      >
         <Grid className={classes.bottomInformationContainer}>
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
         </Grid>
       </Grid>
     </Grid>
   ))}
 </Grid>
        </Grid>
    )
}

export default FavoriteDestinantions
