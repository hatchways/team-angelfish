import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    root:{
     marginLeft: 390,
     overflow: "hidden"
    },
  pageContainer: {
    display: "flex",
    alignItems: "center",
  },
  paperContainer: {
    height: 275,
    width: 210,
    borderRadius: 10,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  title: {
    marginTop: 15,
    marginLeft: 20,
    fontWeight: "bold",
  },
  customCheckBoxRoot: {
    width: "5px",
    height: "5px",
  },
  bottomInformationContainer: {
    display: "flex",
    height: "15%",
    borderTop: "1px solid #a9a9a9",
    padding: 10,
    justifyContent: "space-between",
  },
  bottomInformationSubContainer1: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: 10,
  },
  bottomInformationSubContainer2: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
  },
});

export default useStyles