import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
   root:{
     marginTop: 90,
   },
   avatar:{
    width: theme.spacing(12),
    height: theme.spacing(12),
    marginLeft: 130,
   },
   sideNav:{
    height: "100%",
    width: 360, 
    position: "fixed", 
    zIndex: 1, 
    top: 0,
    left: 0,
    backgroundColor: "grey",
    overflowX: "hidden",
    paddingTop: 20,
   },
   navItemPosition:{
     marginTop: 90,
     textAlign: "center"
   },
   mainContent:{
     marginLeft: 370,
     marginTop: 70,
   },
  }));

export default useStyles