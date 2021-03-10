import React, {useState} from 'react'
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import useStyles from './style'

function Header() {
    const classes = useStyles();
  const [loggedIn, setLoggedIn] = useState(true)
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  
  const handleLogOut = () =>{
    handleMenuClose();
    setLoggedIn(false)
  }
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
    {!loggedIn ? <div> <MenuItem onClick={()=> setLoggedIn(true)}>Login</MenuItem></div> :  <div><MenuItem onClick={handleLogOut}>Logout</MenuItem>
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem></div>}
     

    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <p>Explore</p>
      </MenuItem>

      <MenuItem>
        <p>Flights</p>
      </MenuItem>

      <MenuItem>
        <p>Hotel</p>
      </MenuItem>

      <MenuItem>
        <p>Rent</p>
      </MenuItem>

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <Avatar className={classes.avatar} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdX7wWCMOvGYD6_4-MthVKf-DjjgLF_GqQzg&usqp=CAU"/> 
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

    return (
        <div className={classes.grow}>
        <AppBar position="static" className={classes.appbar}>
          <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
              Travel Booking
            </Typography>
            
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
            
             <div className={classes.menuButton}>
             <p>Explore</p>
              <p>Flights</p>
              <p>Hotel</p>
              <p>Rent</p>
             </div>
           
              <IconButton
                edge="end"
                aria-label="account of current user" 
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Avatar className={classes.avatar} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdX7wWCMOvGYD6_4-MthVKf-DjjgLF_GqQzg&usqp=CAU"/>
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="Mobile List"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </div>
    )
}

export default Header


{/* <Avatar className={classes.avatar} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdX7wWCMOvGYD6_4-MthVKf-DjjgLF_GqQzg&usqp=CAU" onClick={handleMenu}/> */}