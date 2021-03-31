import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#ededed",
    height: "100%",
  },
  drawer: {
    flexShrink: 0,
  },
  drawerPaper: {
    width: 350,
    zIndex: 0,
    overflowY: "unset",
  },
  drawerContainer: {
    overflowY: "unset",
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginLeft: 130,
  },
  profilePosition: {
    textAlign: "center",
    marginTop: 95,
  },
  email: {
    color: "#c5bec4",
    fontSize: 12,
    letterSpacing: 1,
  },
  profileLinks: {
    display: "block",
    listStyle: "none",
    textAlign: "center",
    fontWeight: "bold",
    textDecoration: "none",
    fontSize: 14,
    color: "#c5bec4",
    marginRight: 30,
    lineHeight: 2.2,
    paddingTop: 2,
  },
  editBtnContainer: {
    lineHeight: 8,
  },
  editBtn: {
    color: "#c5bec4",
    fontSize: 12,
  },
  logoutBtn: {
    paddingTop: 100,
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      paddingTop: 70,
    },
    [theme.breakpoints.down("sm")]: {
      paddingTop: 50,
    },
  },
  logoutMainBtn: {
    color: "#c5bec4",
    fontSize: 12,
  },
  content: {
    backgroundColor: "#ededed",
  },
}));

export const accountStyles = makeStyles(() => ({
  title: {
    fontWeight: 600,
    textAlign: "left",
    marginTop: 20,
    marginBottom: 20,
  },
  paper: {
    padding: 40,
    height: 700,
    borderRadius: 20,
  },
  button: {
    backgroundColor: "#ffb347 !important",
    width: 150,
    height: 40,
  },
  label: {
    fontWeight: 600,
    color: "#000000",
    padding: 5,
  },
  line: { borderBottom: "1px solid lightgrey", marginBottom: 30 },
}));

export default (accountStyles, useStyles);
