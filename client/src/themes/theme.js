import { createMuiTheme } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import { withStyles } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto"',
    fontSize: 12,
    h1: {
      // could customize the h1 variant as well
    }
  },
  palette: {
    primary: { main: "#DF1B1B" }
  }
});

export const CustomSmallerCheckBox= withStyles({
  root: {
    "& .MuiSvgIcon-root": { width: "15px", height: "15px" },
  },
})(Checkbox)