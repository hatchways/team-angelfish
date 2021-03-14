import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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
  avatar:{
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginLeft: 130,
  },
  profilePosition:{
    textAlign: "center",
    marginTop: 95,
  },
  profileLinks:{
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
  logoutBtn:{
    marginTop: 100, 
    textAlign: "center",
    [theme.breakpoints.up('md')]: {
      marginTop: 70,
    },
    [theme.breakpoints.up('sm')]: {
      marginTop: 50,
    },
  },
  }));

export default useStyles