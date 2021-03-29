/** @format */

import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
	rootWithoutResults: {
		height: "92%",
		backgroundColor: "#ededed",
		flexGrow: 1,
	},
	rootWithResults: {
		height: "69%",
		backgroundColor: "#ededed",
		flexGrow: 1,
		marginBottom: "6em",
	},
	containerWithoutResults: {
		height: "75%",
		"& div:first-child": {
			height: "100%",
			backgroundColor: "#fff",
			flexBasis: "41.67%",
			paddingTop: "10%",
			textAlign: "center",
		},
		"& div:first-child p": {},
		"& div:last-child": {
			height: "100%",
			flexBasis: "58.33%",
			width: "58.33%",
			transition: "flex-basis 7s, max-width 5s",
		},
		"& div:last-child > img": {
			height: "100%",
		},
	},
	containerWithResults: {
		height: "100%",
		"& div:first-child": {
			display: "none",
		},
		"& div:first-child p": {},
		"& div:last-child": {
			flexBasis: "100%",
			maxWidth: "100%",
			height: "100%",
			transition: "max-width 600ms",
		},
		"& div:last-child > img": {
			height: "100%",
		},
	},
	header: {
		padding: "10px",
		fontSize: "3.5rem",
		"@media (max-width:1100px)": {
			fontSize: "2.8rem",
			paddingTop: "100px",
		},
		"@media (max-width:600px)": {
			fontSize: "2rem",
			paddingTop: "100px",
		},
	},
	heroContainer: {
		// height: "100%",
		// flexBasis: "58.33%",
	},
	// heroImg: {
	// 	height: "100%",
	// 	objectFit: "cover",
	// 	width: "100%",
	// },
	searchDiv: {
		// display: "flex",
		// justifyContent: "center",
		width: "100%",
		position: "absolute",
		bottom: "20%",
		// "@media (max-width:900px)": {
		// 	position: "initial",
		// },
	},
}));
