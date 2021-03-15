import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& > *': {
      width: '1200px',
    },
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: "70px",
  },
  paperContainer: {
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    alignItems: 'center',
    height: '70%',
    borderRadius: '20px',
  },
  travelDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    '@media (max-width:1280px)': {
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
  },
  searchBtn: {
    backgroundColor: '#FFA000',
    color: '#fff',
    height: '40px',
    width: '100px',
  },
  input: {
    '@media (min-width:1280px)': {
      borderRight: '1px solid lightgray',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'start',
    },
  },
}));
