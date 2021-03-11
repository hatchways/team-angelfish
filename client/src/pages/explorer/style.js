import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  paperContainer: {
    height: 270,
    width: 210,
    borderRadius: 10,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  title: {
    margin: 5,
    textAlign: "center",
    marginTop: 40,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  subtitle:{
    letterSpacing: 1,
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