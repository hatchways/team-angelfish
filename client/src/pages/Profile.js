import React, {useState} from "react";
import useStyles from "../styles/Profile";
import { NavLink, useRouteMatch, Switch, Route } from "react-router-dom";
import Notifications from "./Notifications";
import FavoriteDestination from "./FavoriteDestinantions";
import AccountSettings from "./AccountSettings";
import { Avatar, Drawer, Typography, Button, Grid, ButtonBase } from "@material-ui/core";
import FileUploaderDialog from "../components/FileUploaderDialog";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Profile() {
  const { path } = useRouteMatch();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [snack, setSnack] = useState({ type: "", message: "", open: false });
  const mockUser = {
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdX7wWCMOvGYD6_4-MthVKf-DjjgLF_GqQzg&usqp=CAU",
    name: "Devin Jones",
    email: "DevinJones@gmail.com",
  };

  const handleClickOpen = () => {
    setSelectedFile(null);
    setLoading(false);
    setOpen(true);
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const openSnack = (errorMessage) =>{
    if(errorMessage){
      setSnack({ type: "error", message: errorMessage, open: true });
    }else{
      setSnack({ type: "success", message: "Success", open: true });
    }
  }

  const handleSubmission = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    fetch("/api/file-upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        openSnack(!result.imageUrl ? "Upload failed!" : null);
        setOpen(false);
        setLoading(false);
        setSelectedFile(null);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
        openSnack(error.message);
      });
  };

  const handleDrop = (files) => {
    setSelectedFile(files[0]);
  };

  const closeSnack = () => {
    setSnack((prevState) => {
      return { ...prevState, open: false };
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid className={classes.root}>
    <FileUploaderDialog
        file={selectedFile}
        open={open}
        loading={loading}
        close={handleClose}
        submit={handleSubmission}
        handleDrop={handleDrop}
      />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Grid className={classes.profilePosition}>
        <Avatar component={ButtonBase} src={mockUser.avatar} className={classes.avatar} onClick={handleClickOpen}/>
          <Typography variant="h6">{mockUser.name}</Typography>
          <Typography className={classes.email}>{mockUser.email}</Typography>

          <Grid className={classes.editBtnContainer}>
            <Button className={classes.editBtn} variant="outlined">
              Edit
            </Button>
          </Grid>
        </Grid>
        <Grid className={classes.drawerContainer}>
          <ul>
            <NavLink
              activeStyle={{ color: "black", borderLeft: "3px solid #FFA000" }}
              className={classes.profileLinks}
              to="/profile/favoritedestinations"
            >
              <li>Favorite Destinations</li>
            </NavLink>
            <NavLink
              activeStyle={{ color: "black", borderLeft: "3px solid #FFA000" }}
              className={classes.profileLinks}
              to="/profile/notifications"
            >
              <li>Notifications</li>
            </NavLink>
            <NavLink
              activeStyle={{ color: "black", borderLeft: "3px solid #FFA000" }}
              className={classes.profileLinks}
              to="/profile/accountsettings"
            >
              <li>Account Settings</li>
            </NavLink>
          </ul>
        </Grid>
        <Grid className={classes.logoutBtn}>
          <Button className={classes.logoutMainBtn}>Logout</Button>
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
      <Snackbar
        open={snack.open}
        autoHideDuration={1000}
        onClose={closeSnack}
      >
        <Alert severity={snack.type}>
          {snack.message}
        </Alert>
      </Snackbar>
    </Grid>
  );
}

export default Profile;
