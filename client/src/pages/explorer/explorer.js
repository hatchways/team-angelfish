import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
//Remove the next line when backend data is available.
import Header from '../../component/Header/Header'
import places from "../../database/places";
import Grid from "@material-ui/core/Grid";
import Favorite from "@material-ui/icons/Favorite";
import {CustomSmallerCheckBox} from "../../themes/theme";
import useStyles from './style'


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

const ExplorerPage = () => {
  const classes = useStyles();
  return (
  <Grid container className={classes.pageContainer}>
   <Header />
   <Typography variant="h4" className={classes.title}>
    Explore destinations
   </Typography>
   <Typography
   variant="subtitle2"
   className={classes.title}
   style={{ color: "#c5bec4", fontSize: 12 }}>
   World's top destinations to explore
 </Typography>
  <Grid
   container
   spacing={2}
   justify="center"
   style={{ maxWidth: "75%", marginTop: 32 }} >
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
  );
};

export default ExplorerPage;
