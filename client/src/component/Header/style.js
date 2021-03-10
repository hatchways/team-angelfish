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
    }
  }));

export default useStyles