import React from "react";
import useStyles from "../styles/Profile";
import { NavLink, useRouteMatch, Switch, Route } from "react-router-dom";
import Notifications from "./Notifications";
import FavoriteDestination from "./FavoriteDestinantions";
import AccountSettings from "./AccountSettings";
import {
  Avatar,
  Drawer,
  Typography,
  Button,
  Grid,
} from "@material-ui/core";

export default function ClippedDrawer() {
  const { path } = useRouteMatch();


  const classes = useStyles();
  const mockUser = {
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdX7wWCMOvGYD6_4-MthVKf-DjjgLF_GqQzg&usqp=CAU",
    name: "Devin Jones",
    email: "DevinJones@gmail.com",
  };

  return (
    <Grid className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Grid className={classes.profilePosition}>
          <Avatar src={mockUser.avatar} className={classes.avatar} />
          <Typography variant="h6">{mockUser.name}</Typography>
          <Typography
            style={{ color: "#c5bec4", fontSize: 12, letterSpacing: 1 }}
          >
            {mockUser.email}
          </Typography>

          <Grid style={{lineHeight: 8 }}>
            <Button style={{ color: "#c5bec4", fontSize: 12,}} variant="outlined">Edit</Button>
          </Grid>
        </Grid>
        <Grid className={classes.drawerContainer}>
          <ul>
            <NavLink
              activeStyle={{ color: "black", borderLeft: "3px solid #FFA000", }}
              className={classes.profileLinks}
              to="/profile/favoritedestinations"
            >
              <li>Favorite Destinations</li>
            </NavLink>
            <NavLink
            activeStyle={{ color: "black", borderLeft: "3px solid #FFA000", }}
              className={classes.profileLinks}
              to="/profile/notifications"
            >
              <li>Notifications</li>
            </NavLink>
            <NavLink
            activeStyle={{ color: "black", borderLeft: "3px solid #FFA000", }}
              className={classes.profileLinks}
              to="/profile/accountsettings"
            >
              <li>Account Settings</li>
            </NavLink>
          </ul>
        </Grid>
        <Grid style={{ marginTop: 130, textAlign: "center" }}>
          <Button  style={{ color: "#c5bec4", fontSize: 12 }}>Logout</Button>
        </Grid>
      </Drawer>

      <Grid className={classes.content}>
        <Switch>
          <Route
            path={`${path}/favoritedestinations`}
            component={FavoriteDestination}
          />
          <Route path={`${path}/notifications`} component={Notifications} />
          <Route path={`${path}/accountsettings`} component={AccountSettings} />
        </Switch>
      </Grid>
    </Grid>
  );
}
