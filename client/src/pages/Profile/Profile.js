import React, { useState } from "react";
import useStyles from "./style";
import { NavLink, useRouteMatch, Switch, Route,  } from "react-router-dom";
import Notifications from "../Notifications/Notifications"
import FavouriteDestination from "../FavouriteDestinations/FavouriteDestinantions"
import AccountSettings from "../AccountSettings/AccountSettings"

import {
  AppBar,
  Avatar,
  CssBaseline,
  Toolbar,
  IconButton,
  Menu,
  Drawer,
  Typography,
  MenuItem,
  Button,
  Grid,
} from "@material-ui/core";

export default function ClippedDrawer() {
  
  const [auth, setAuth] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { path } = useRouteMatch();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const classes = useStyles();
  const mockUser = {
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdX7wWCMOvGYD6_4-MthVKf-DjjgLF_GqQzg&usqp=CAU",
    name: "Devin Jones",
    email: "DevinJones@gmail.com",
  };

  return (
    <Grid className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          ></IconButton>
          <Typography variant="h6" className={classes.title}>
            Travel Booking
          </Typography>
          <Grid className={classes.pages}>
            <NavLink
              className={classes.navlinks}
              to="/explore"
              activeStyle={{ color: "#FFA000" }}
            >
              Explore
            </NavLink>

            <NavLink
              className={classes.navlinks}
              to="/flights"
              activeStyle={{ color: "#FFA000" }}
            >
              Flights
            </NavLink>

            <NavLink
              className={classes.navlinks}
              to="/hotel"
              activeStyle={{ color: "#FFA000" }}
            >
              Hotels
            </NavLink>
            <NavLink
              className={classes.navlinks}
              to="/rent"
              activeStyle={{ color: "#FFA000" }}
            >
              Rent
            </NavLink>
          </Grid>

          {auth ? (
            <Grid>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdX7wWCMOvGYD6_4-MthVKf-DjjgLF_GqQzg&usqp=CAU"
                  alt="User profile image"
                />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <NavLink to="/profile">
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                </NavLink>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            </Grid>
          ) : (
            <Button onClick={() => setAuth(true)} className={classes.loginbtn}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <Grid className={classes.profilePosition}>
        <Avatar src={mockUser.avatar} className={classes.avatar} />
        <Typography variant="h6">{mockUser.name}</Typography>
        <Typography
          style={{ color: "#c5bec4", fontSize: 12, letterSpacing: 1 }}
        >
          {mockUser.email}
        </Typography>

        <Grid style={{lineHeight: 8}}>
        <Button>Edit</Button>
        </Grid>
        
        </Grid>
        <Grid className={classes.drawerContainer}>
          <ul>
          <NavLink aria-current="step" activeStyle={{color: "black", left: "yellow"}} className={classes.profileLinks} to="/profile/favouritedestination"><li>Favorite Destinations</li></NavLink>
         <NavLink className={classes.profileLinks} to="/profile/notifications"><li>Notifications</li></NavLink>
         <NavLink className={classes.profileLinks} to="/profile/accountsettings"><li>Account Settings</li></NavLink>
          </ul>
        </Grid>

        <Button style={{ color: "#c5bec4", fontSize: 12 }}>Logout</Button>
      </Drawer>

      <Grid className={classes.content}>
        <Toolbar />
        <h1>Main content</h1>
        <Switch>
        <Route path={`${path}/favouritedestination`} component={FavouriteDestination} />
        <Route path={`${path}/notifications`} component={Notifications} />
        <Route path={`${path}/accountsettings`} component={AccountSettings} />
      </Switch>
      </Grid>
    </Grid>
  );
}
