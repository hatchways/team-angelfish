import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    appbar:{
      backgroundColor: 'white',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      color: '#6464FF'
    },
    loginbtn:{
      backgroundColor: '#FFA000',
      color: 'white',
      marginRight: theme.spacing(2),
    },
    pages:{
      display: 'flex',
      fontSize: '14px',
      fontWeight: 'bold',
      justifyContent: 'space-evenly',
      marginRight: theme.spacing(3),
      width: '45%',
    },
    navlinks:{
      color:'#373737',
      textDecoration: 'none',
    },
  }));

export default useStyles