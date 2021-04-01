/** @format */
import React, { useState } from "react";
import { useStyles } from "./ProfileStyle";
import { NavLink, useRouteMatch, Switch, Route, useHistory } from "react-router-dom";
import Notifications from "../Notifications";
import FavoriteDestination from "../FavoriteDestinantions";
import AccountSettings from "./AccountSettings";
import Itinerary from "../Itinerary";
import {
  Avatar,
  Drawer,
  Typography,
  Button,
  Badge,
  Grid,
  ButtonBase,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { useDispatchContext } from "../../context/context";
import { useSnackbar } from "notistack";
import FileUploaderDialog from "../../components/Uploader/FileUploaderDialog";

function Profile() {
	const { path } = useRouteMatch();
  const history = useHistory()
	const { enqueueSnackbar } = useSnackbar();
	const dispatch = useDispatchContext();
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [selectedFile, setSelectedFile] = useState();
	const classes = useStyles();
	const mockUser = {
		avatar:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdX7wWCMOvGYD6_4-MthVKf-DjjgLF_GqQzg&usqp=CAU",
		name: "Devin Jones",
		email: "DevinJones@gmail.com",
	};
	const menuItems = [
		{ name: "Favorite Destinations", link: "favoritedestinations" },
		{ name: "Notifications", link: "notifications" },
		{ name: "Account Settings", link: "accountsettings" },
		{ name: "My Trips", link: "trips" },
	];
	const [avatarImage, setAvatarImage] = useState(mockUser.avatar);
	const handleLogout = async () => {
		try {
			await fetch(`api/users/logout`);
			dispatch({ type: "LOG_OUT" });
      history.push("/")
		} catch (err) {
			console.error();
		}
	};
	const handleClickOpen = () => {
		setSelectedFile(null);
		setLoading(false);
		setOpen(true);
	};
	const openSnack = (errorMessage) => {
		enqueueSnackbar(errorMessage || "Success", {
			variant: errorMessage ? "error" : "success",
			anchorOrigin: {
				vertical: "bottom",
				horizontal: "center",
			},
			autoHideDuration: 2000,
		});
	};
	const handleSubmission = async () => {
		setLoading(true);
		const formData = new FormData();
		formData.append("file", selectedFile);

		try {
			const uploadResponse = await (
				await fetch("/api/file-upload", {
					method: "POST",
					body: formData,
				})
			).json();
			openSnack(!uploadResponse.imageUrl ? "Upload failed!" : null);
			if (uploadResponse.imageUrl) {
				setAvatarImage(uploadResponse.imageUrl);
				setOpen(false);
			}
			setLoading(false);
			setSelectedFile(null);
		} catch (error) {
			setLoading(false);
			openSnack(error.message);
		}
	};
	const handleClose = () => {
		setOpen(false);
	};
	const handleDrop = (files) => {
		files[0].preview = URL.createObjectURL(files[0]);
		setSelectedFile(files[0]);
	};
	return (
		<Grid container className={classes.root}>
			<FileUploaderDialog
				file={selectedFile}
				open={open}
				loading={loading}
				close={handleClose}
				submit={handleSubmission}
				handleDrop={handleDrop}
			/>
			<Grid
				item
				container
				xs={false}
				sm={4}
				lg={3}
				className={classes.profileContainer}
			>
				<Drawer
					variant="permanent"
					classes={{
						root: classes.drawerRoot,
						paper: classes.drawerPaper,
					}}
				>
					<Grid item className={classes.profilePosition}>
          <Badge
			style={{  color: "#FFA000"}}
              component={ButtonBase}
              onClick={handleClickOpen}
              overlap="circle"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              badgeContent={<AddCircleIcon />}
            >
              <Avatar
                component={ButtonBase}
                src={avatarImage}
                className={classes.avatar}
                onClick={handleClickOpen}
              />
            </Badge>
						<Typography variant="h6" className={classes.avatarInfo}>
							{mockUser.name}
						</Typography>
						<Typography className={`${classes.avatarInfo} ${classes.email}`}>
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
			<Grid item xs={12} sm={8} lg={9} className={classes.tripContainer}>
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
