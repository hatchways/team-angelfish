/** @format */

import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
	typography: {
		fontFamily: '"Roboto"',
		fontSize: 12,
		h1: {
			// could customize the h1 variant as well
		},
		button: {
			fontSize: "0.875rem",
			textTransform: "none",
		},
	},
	palette: {
		primary: { main: "#DF1B1B" },
		secondary: { main: "#737373" },
	},
});

