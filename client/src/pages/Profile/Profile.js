import React, { useState } from "react";
import useStyles from "./style";
import { NavLink } from "react-router-dom";
import {
  AppBar,
  Avatar,
  CssBaseline,
  Toolbar,
  IconButton,
  Menu,
  Drawer,
  ListItem,
  List,
  ListItemText,
  Typography,
  MenuItem,
  Button,
  Grid,
} from "@material-ui/core";

export default function ClippedDrawer() {
  const [auth, setAuth] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

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
        <Button>Edit</Button>
        </Grid>
        <Grid className={classes.drawerContainer}>
          <List>
            {[
              "Favourite Destinations",
              "Notifications",
              "Account Settings",
            ].map((text, index) => (
              <ListItem button key={text}>
                <ListItemText style={{textAlign: "center"}} primary={text} />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
      </main>
    </Grid>
  );
}
