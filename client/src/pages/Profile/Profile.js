import React from "react";
import { Avatar, Typography, Button, Grid } from "@material-ui/core";
import Header from "../../component/Header/Header";
import useStyles from "./style";

const mockUser = {
  image:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdX7wWCMOvGYD6_4-MthVKf-DjjgLF_GqQzg&usqp=CAU",
  name: "Devin Jones",
  email: "Devinj@gmail.com",
};
function Profile() {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Header />

      <Grid className={classes.sideNav}>
        <Grid className={classes.navItemPosition}>
          <Avatar
            src={mockUser.image}
            alt="User Image"
            className={classes.avatar}
          />
          <Typography variant="h6">{mockUser.name}</Typography>
          <Typography
            variant="subtitle2"
            className={classes.subtitle}
            style={{ color: "#c5bec4", fontSize: 12 }}
          >
            {mockUser.email}
          </Typography>
          <Button>Edit</Button>
        </Grid>
        <li>About</li>
      </Grid>

      <Grid className={classes.mainContent}>
        <h1>Main content</h1>
      </Grid>
    </Grid>
  );
}

export default Profile;
