import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
	rootWithoutResults: {
		height: "92%",
		backgroundColor: '#ededed',
	},
	rootWithResults: {
		height: "80%",
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
		paddingTop: "100px",
		"@media (max-width:1100px)": {
			paddingTop: "100px",
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
		height: "100%",
	},
	heroImg: {
		height: "100%",
		objectFit: "cover",
		width: "100%",
	},
	searchDiv: {
		display: "flex",
		justifyContent: "center",
		width: "100%",
		position: "absolute",
		bottom: "10em",
		"@media (max-width:900px)": {
			position: "initial",
		},
	},
}));
