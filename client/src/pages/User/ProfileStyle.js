import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
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
    marginLeft: 10,
  },
  badgeIcon: {
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
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
}));

export default useStyles;
