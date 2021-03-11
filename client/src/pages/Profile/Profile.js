import React from 'react'
import {
    Avatar,
    IconButton,
    Typography,
    Button,
    Grid,
  } from "@material-ui/core";
import Header from '../../component/Header/Header'
import useStyles from "./style";

const mockUser = {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdX7wWCMOvGYD6_4-MthVKf-DjjgLF_GqQzg&usqp=CAU",
    name: "Devin Jones",
    email: "Devinj@gmail.com"
}
function Profile() {
    const classes = useStyles()
    return (
        <Grid container className={classes.root}>
        <Header />
        <Grid>
        <Avatar src={mockUser.image} alt="User Image"/>
        </Grid>  
        </Grid>
    )
}

export default Profile
