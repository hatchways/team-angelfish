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
    width: 360,
  },
  drawerContainer: {
    overflow: "auto",
  },
  avatar:{
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  }));

export default useStyles