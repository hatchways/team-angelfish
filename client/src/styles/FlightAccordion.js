/** @format */

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	departTime: {
		marginLeft: "-0.5em",
	},
	departHeader: {
		fontSize: "15px",
	},
	departSubtitle: {
		color: "#b3b3b3",
		fontWeight: "bolder",
	},
	departDuration: {
		paddingLeft: "2em",
	},
	departStop: {
		paddingLeft: "4em",
	},
	departPriceBold: {
		color: "#8080ff",
		fontSize: "15px",
	},
	departLogo: {
		padding: ".846em 0 .846em .75em",
	},
	departure: {
		borderRight: "1px solid #a6a6a6",
		padding: "0 1em 0 1.2em",
	},
	departureDate: {
		paddingLeft: "1em",
	},
	buttonBox: {
		textAlign: "end",
	},
	button: {
		padding: "0.55rem 2em",
		fontSize: "0.875em",
		backgroundColor: "orange",
		"&:hover": {
			backgroundColor: "orange",
		},
	},
	accordion: {
		borderBottom: "1px solid rgba(0, 0, 0, .105)",
		boxShadow: "none",
		"&$expanded": {
			margin: 0,
		},
		"&:last-child": {
			borderBottom: "none",
		},
		flexGrow: 1,
	},
	summary: {
		padding: "0.5em 2.2em 0.5em 1em",
		minHeight: "48px",
		"&$expanded": {
			minHeight: "48px",
			padding: "0.155em 2.2em 0.155em 1em",
		},
	},
	content: {
		margin: "12px 0",
		"&$expanded": {
			margin: "12px 0",
		},
	},
	timeline: {
		fontSize: "13px",
	},
	timelineItem: {
		"&:before": {
			flex: 0,
			padding: 0,
		},
		minHeight: "55px",
	},
	timelineDot: {
		padding: "3px",
		borderWidth: "1px",
		margin: 0,
	},
	timelineConnector: {
		width: "0.3px",
		backgroundColor: "#ced4da",
	},
	timelineContent: {
		padding: "0 16px",
		marginTop: "-5px",
		fontWeight: "bolder",
	},
	timelineInsert: {
		color: "#a6a6a6",
		marginTop: "0.75em",
		fontSize: "13px",
		fontWeight: "bold",
	},
	timelineAfter: {
		color: "#a6a6a6",
		"&:not(:last-child)": { marginTop: "1.4em" },
		fontSize: "13px",
		fontWeight: "bold",
	},
	timelineLast: {
		fontWeight: "bold",
		color: "black",
	},
	timelineDivider: {
		margin: "1em 0",
	},
	separator: {
		height: "55px",
	},
	expanded: {},
}));

export default useStyles;
