/** @format */

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: "#f2f2f2",
		height: "92%",
		// will be added for responsiveness
		// [theme.breakpoints.down("xs")]: {
		// 	display: "none",
		// },
	},
	profileContainer: {
		textAlign: "center",
		height: "100%",
	},
	tripContainer: {
		height: "100%",
	},
	drawerRoot: {
		zIndex: 0,
		width: "100%",
	},
	drawerPaper: {
		position: "relative",
	},
	drawerContainer: {
		width: "100%",
	},
	avatar: {
		width: theme.spacing(12),
		height: theme.spacing(12),
		margin: "0 auto",
	},
	profilePosition: {
		marginTop: "4em",
	},
	avatarInfo: {
		marginTop: "0.8em",
		fontSize: "1.2em",
		fontWeight: "bolder",
		"&:last-child": {
			color: "#c5bec4",
			fontSize: "0.8em",
			letterSpacing: ".03em",
			margin: "0 0 2.3em",
		},
	},
	linksContainer: {
		padding: "0 5.3em 0 5em",
		[theme.breakpoints.up("xs")]: {
			"& li": { fontSize: "1em" },
		},
		[theme.breakpoints.up("sm")]: {
			"& li": { fontSize: ".85em" },
			padding: "0 3.3em 0 3em",
		},
		[theme.breakpoints.up("md")]: {
			"& li": { fontSize: "1em" },
		},
	},
	profileLinks: {
		display: "block",
		listStyle: "none",
		fontWeight: "bold",
		textDecoration: "none",
		fontSize: ".9em",
		color: "#c5bec4",
		margin: "1em 0 1em",
		padding: "0.5em 0",
		"&.active": {
			color: "black",
			borderLeft: "3px solid #FFA000",
		},
		"&:last-child": {
			margin: "0 0 6em",
		},
	},
	editBtn: {
		color: "#c5bec4",
		fontSize: ".70em",
		marginBottom: "5.5em",
	},
	logoutBtn: {
		color: "#c5bec4",
		fontSize: "0.8em",
	},
	toolbarIcon: {
		display: "none",
		[theme.breakpoints.up("sm")]: {
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-end",
			padding: "0 8px",
			...theme.mixins.toolbar,
		},
		[theme.breakpoints.up("md")]: {
			display: "none",
		},
	},
}));

export default useStyles;
