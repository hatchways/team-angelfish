import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    height: '100vh',
    backgroundColor: '#ededed',
  },
  container: {
    '@media (max-width:1000px)': {
      height: '80%',
    },
  },
  titleContainer: {
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    paddingTop: '100px',
    '@media (max-width:1100px)': {
      paddingTop: '100px',
    },
  },
  header: {
    padding: '10px',
    fontSize: '3.5rem',
    '@media (max-width:1100px)': {
      fontSize: '2.8rem',
      paddingTop: '100px',
    },
    '@media (max-width:600px)': {
      fontSize: '2rem',
      paddingTop: '100px',
    },
  },
  heroContainer: {
    height: '700px',
  },
  heroImg: {
    height: '100%',
    objectFit: 'cover',
    width: '100%',
  },
  searchDiv: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    position: 'relative',
    bottom: '63px',
    '@media (max-width:900px)': {
      position: 'initial',
    },
  },
}));
