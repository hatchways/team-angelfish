/** @format */

import React from "react";
import useStyles from "../styles/Profile";
import { NavLink, useRouteMatch, Switch, Route } from "react-router-dom";
import Notifications from "./Notifications";
import FavoriteDestination from "./FavoriteDestinantions";
import AccountSettings from "./AccountSettings";
import { Avatar, Drawer, Typography, Button, Grid } from "@material-ui/core";
import { useDispatchContext } from "../context";
import Itinerary from "./Itinerary";

function Profile() {
	const { path } = useRouteMatch();
	const dispatch = useDispatchContext();
	const classes = useStyles();
	const menuItems = [
		{ name: "Favorite Destinations", link: "favoritedestinations" },
		{ name: "Notifications", link: "notifications" },
		{ name: "Account Settings", link: "accountsettings" },
		{ name: "My Trips", link: "trips" },
	];
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
		<Grid container className={classes.root}>
			<Grid item container sm={4} lg={3} className={classes.profileContainer}>
				<Drawer
					variant="permanent"
					classes={{
						root: classes.drawerRoot,
						paper: classes.drawerPaper,
					}}
				>
					<Grid item className={classes.profilePosition}>
						<Avatar src={mockUser.avatar} className={classes.avatar} />
						<Typography variant="h6" className={classes.avatarInfo}>
							{mockUser.name}
						</Typography>
						<Typography className={classes.avatarInfo}>
							{mockUser.email}
						</Typography>
					</Grid>
					<Grid item>
						<Button className={classes.editBtn} variant="outlined">
							Edit
						</Button>
					</Grid>
					<Grid item>
						<ul className={classes.linksContainer}>
							{menuItems.map((item) => (
								<NavLink
									key={item.name}
									className={classes.profileLinks}
									to={`/profile/${item.link}`}
								>
									<li>{item.name}</li>
								</NavLink>
							))}
						</ul>
					</Grid>
					<Grid item>
						<Button className={classes.logoutBtn} onClick={handleLogout}>
							Log out
						</Button>
					</Grid>
				</Drawer>
			</Grid>
			<Grid item sm={8} lg={9} className={classes.tripContainer}>
				<Switch>
					<Route
						path={`${path}/favoritedestinations`}
						component={FavoriteDestination}
					/>
					<Route path={`${path}/notifications`} component={Notifications} />
					<Route path={`${path}/accountsettings`} component={AccountSettings} />
					<Route path={`${path}/trips`} component={Itinerary} />
				</Switch>
			</Grid>
		</Grid>
	);
}

export default Profile;
