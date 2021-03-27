/** @format */

import React, { useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
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
  Modal,
} from "@material-ui/core";

import useStyles from "../styles/Header";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import Cart from "./Cart/Cart";
import { useDispatchContext, useStateContext } from "../context";

function Header() {
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatchContext();
  const { authenticated } = useStateContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const [modal, setModal] = useState(false); //opens signin page
  const [signup, setSignup] = useState(false); // switches to signup page

  const open = Boolean(anchorEl);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const openModal = () => setModal(true);
  const closeModal = () => {
    setModal(false);
    setSignup(false);
  };
  const handleSignup = () => setSignup(true);
  const handleSignin = () => setSignup(false);
  const handleLogout = async () => {
    await fetch(`api/users/logout`);
    dispatch({ type: "LOG_OUT" });
  };

  const WrappedSignin = React.forwardRef((props, ref) => (
    <Signin {...props} forwardedRef={ref} />
  ));
  const WrappedSignup = React.forwardRef((props, ref) => (
    <Signup {...props} forwardedRef={ref} />
  ));

  return (
    location.pathname !== "/" ? 
    <Grid container className={classes.root}>
      <AppBar position="fixed" className={classes.appbar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          />
          <Typography variant="h6" className={classes.title}>
            Travel Booking
          </Typography>
          <Grid className={classes.pages}>
            <NavLink className={classes.navlinks} to="/explore">
              Explore
            </NavLink>
            <NavLink className={classes.navlinks} to="/flights">
              Flights
            </NavLink>
            <NavLink className={classes.navlinks} to="/hotel">
              Hotels
            </NavLink>
            <NavLink className={classes.navlinks} to="/cars">
              Cars
            </NavLink>
          </Grid>
          {authenticated ? (
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
                <MenuItem onClick={handleClose}>
                  <Link
                    style={{ textDecoration: "none", color: "#000000" }}
                    to="/profile/favoritedestinations"
                  >
                    Profile
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Grid>
          ) : (
            <div>
              <Button onClick={openModal} className={classes.loginbtn}>
                Login
              </Button>
              <Modal
                aria-labelledby="modal-title"
                className={classes.modal}
                open={modal}
                onClose={closeModal}
              >
                {signup ? (
                  <WrappedSignup close={closeModal} signin={handleSignin} />
                ) : (
                  <WrappedSignin close={closeModal} signup={handleSignup} />
                )}
              </Modal>
            </div>
          )}
          <Cart />
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Grid> : <></>
  );
}

export default Header;
