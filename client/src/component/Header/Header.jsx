import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Toolbar,
  IconButton,
  Menu,
  Typography,
  MenuItem,
  Button,
  Grid,
} from "@material-ui/core";

import useStyles from "./style";

function Header() {
  const classes = useStyles();

  const [auth, setAuth] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid container className={classes.root}>
      <AppBar position="fixed" className={classes.appbar}>
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

            <NavLink className={classes.navlinks} to="/flights" activeStyle={{ color: "#FFA000" }}>
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
                  className={classes.avatar}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdX7wWCMOvGYD6_4-MthVKf-DjjgLF_GqQzg&usqp=CAU"
                alt="User profile image"/>
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
                <NavLink to="/profile"><MenuItem onClick={handleClose}>Profile</MenuItem></NavLink>
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
    </Grid>
  );
}

export default Header;