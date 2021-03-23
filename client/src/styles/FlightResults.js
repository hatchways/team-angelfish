/** @format */

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	departFlightsContainer: {
		"&:not(:empty)": {
			border: "1px solid #ced4da",
			margin: 0,
			width: "100%",
		},
		"&:empty::before": {
			content: '"No results found"',
			color: "gray",
			marginLeft: "0.4em",
			marginTop: "1em",
		},
	},
	bottomHeader: {
		fontWeight: theme.typography.fontWeightMedium,
		fontSize: "1.62em",
	},
	subtitle: {
		color: "#a6a6a6",
		marginBottom: "1.5em",
	},
	divider: {
		marginBottom: "2em",
	},
	flightInfoContainer: {
		padding: "1em 3.2em 2em 2.8em",
		width: "100%",
	},
	margin: {
		marginTop: "3em",
	},
	formControl: {
		minWidth: 120,
		marginBottom: "1em",
	},
}));

export default useStyles;
