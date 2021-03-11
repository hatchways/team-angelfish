/** @format */

import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
	modalBody: {
		width: "75%",
		margin: "0 auto",
	},
	modalSubmit: {
		padding: "0.65rem 3em",
		margin: "2.75em 0",
		fontSize: "0.875em",
		backgroundColor: "orange",
		"&:hover": {
			backgroundColor: "orange",
		},
	},
	modalFooter: {
		margin: "1.5em 0",
		color: "#a6a6a6",
		fontWeight: "bold",
	},
	modalTitle: {
		fontWeight: "bold",
	},
	modalSubtitle: {
		margin: "1em auto 2.5em",
		width: "90%",
		color: "#a6a6a6",
		fontWeight: "bold",
	},
	link: {
		textDecoration: "none",
		color: "#551A8b",
	},
	icon: {
		color: "#7986cb",
	},
	close: {
		fontSize: "1.75em",
		color: "#bfbfbf",
		fontWeight: "lighter",
	},
});
