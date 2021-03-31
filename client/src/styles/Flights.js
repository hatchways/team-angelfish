/** @format */

import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
	rootWithoutResults: {
		height: "92%",
		backgroundColor: "#ededed",
		[theme.breakpoints.down("xs")]: {
			paddingLeft: "4em",
		},
	},
	rootWithResults: {
		height: "80%",
		[theme.breakpoints.down("xs")]: {
			paddingLeft: "4em",
		},
	},
	containerWithoutResults: {
		height: "74%",
	},
	containerWithResults: {
		height: "85%",
	},
	titleContainer: {
		height: "100%",
		backgroundColor: "#fff",
		display: "flex",
		justifyContent: "center",
		textAlign: "center",
		paddingTop: "50px",
		[theme.breakpoints.up("sm")]: {
			paddingTop: "100px",
		},
	},
	header: {
		padding: "0.65em",
		fontSize: "1.75rem",
		[theme.breakpoints.up("sm")]: {
			fontSize: "2.5rem",
		},
		[theme.breakpoints.up("md")]: {
			fontSize: "3rem",
		},
		[theme.breakpoints.up("lg")]: {
			fontSize: "3.5rem",
		},
	},
	heroContainer: {
		height: "100%",
	},
	heroImg: {
		height: "100%",
		objectFit: "cover",
		width: "100%",
	},
	searchDiv: {
		position: "absolute",
		[theme.breakpoints.up("xs")]: {
			width: "88.1%",
			top: "60%",
		},
		[theme.breakpoints.up("sm")]: {
			width: "90%",
			top: "64%",
			left: "50%",
			transform: "translateX(-50%)",
		},
		[theme.breakpoints.up("md")]: {
			top: "68.5%",
		},
		[theme.breakpoints.up("lg")]: {
			width: "85%",
		},
	},
}));
