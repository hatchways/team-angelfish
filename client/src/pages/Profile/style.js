import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: 'white',
  },
  navlinks:{
    color:'#373737',
    textDecoration: 'none',
  },
  title: {
    flexGrow: 1,
    color: '#6464FF'
  },
  pages:{
    display: 'flex',
    fontSize: '14px',
    fontWeight: 'bold',
    justifyContent: 'space-evenly',
    marginRight: theme.spacing(3),
    width: '45%',
  },
  loginbtn:{
    backgroundColor: '#FFA000',
    color: 'white',
    marginRight: theme.spacing(2),
  },
  drawer: {
    width: 360,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 350,
  },
  drawerContainer: {
    overflow: "auto",
  },
  avatar:{
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginLeft: 130,
  },
  profilePosition:{
    textAlign: "center",
    marginTop: 35,
  },
  profileLinks:{
    display: "block",
   listStyle: "none",
   textAlign: "center",
   fontWeight: "bold",
   textDecoration: "none",
   fontSize: 14,
   lineHeight: 2,
   color: "#c5bec4",
   marginRight: 30,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  }));

export default useStyles