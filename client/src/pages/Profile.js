/** @format */

import React from "react";
import useStyles from "../styles/Profile";
import { NavLink, useRouteMatch, Switch, Route } from "react-router-dom";
import Notifications from "./Notifications";
import FavoriteDestination from "./FavoriteDestinantions";
import AccountSettings from "./AccountSettings";
import { Avatar, Drawer, Typography, Button, Grid } from "@material-ui/core";
import { useDispatchContext } from "../context";

function Profile() {
	const { path } = useRouteMatch();
	const dispatch = useDispatchContext();
	const classes = useStyles();
	const mockUser = {
		avatar:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdX7wWCMOvGYD6_4-MthVKf-DjjgLF_GqQzg&usqp=CAU",
		name: "Devin Jones",
		email: "DevinJones@gmail.com",
	};
	const handleLogout = async () => {
		try {
			await fetch(`api/users/logout`);
			dispatch({ type: "LOG_OUT" });
		} catch (err) {
			console.log(err);
		}
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
					<Button className={classes.logoutMainBtn} onClick={handleLogout}>
						Logout
					</Button>
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

export default Profile;
