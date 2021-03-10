import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 1,
    },
    appbar:{
      backgroundColor: 'white'
    },
    menuButton: {
      marginRight: theme.spacing(2),
      display: 'flex',
      color: 'black',
      justifyContent: 'space -around',
    },
    title: {
      color: 'blue',
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    pages:{
        display: 'flex',
        color: 'black',
        justifyContent: 'space -around',
    },
  }));

export default useStyles