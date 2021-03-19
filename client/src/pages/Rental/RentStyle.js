import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: 20,
    paddingTop: 0,
    paddingLeft: 20,
  },
  paperContainer: {
    height: 300,
    borderRadius: 10,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    overflow: "hidden",
    backgroundPosition: "center",
  },
  title: {
    margin: 5,
    textAlign: "center",
  },
  customCheckBoxRoot: {
    width: 5,
    height: 5,
  },
  bottomInformationContainer: {
    display: "flex",
    height: "20%",
    padding: 10,
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: 25,
  },
  headerInformation: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  bottomInformationSubContainer2: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
  },
  image: {
    maxWidth: 170,
    minWidth: 120,
  },
  subtitle2: {
    color: "#c5bec4",
    fontSize: 12,
  },
  favoriteDefaultIcon: {
    color: "black",
  },
  favoriteCheckedIcon: {
    color: "orange",
  },
  gridContainer: {
    marginTop: 23,
    height: "75%",
  },
  legend1: {
    fontSize: 15,
    color: "black",
    fontWeight: "bold"
  },
  legend2: {
    fontSize: 11,
    color: "black",
    fontWeight: "bold"
  },
  filterContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  filterContainer1: {
    marginTop: 30,
    alignItems: "center",
  },
  textFieldContainer0: {
    border: "1px solid #cdcaca",
    borderRadius: "7px 0px 0px 7px",
    padding: "10px 0px 10px 10px",
    width: 200,
    height: 35,
  },
  textFieldContainer1: {
    border: "1px solid #cdcaca",
    padding: "10px 0px 10px 10px",
    borderRadius: "0px 7px 7px 0px",
    borderLeft: "none",
    width: 200,
    height: 35,
  },
  disabled: {
    color: "black",
    fontWeight: "bold",
    textDecoration: "none",
  },
  select: {
    width: 150,
  },
  filter0: {
    margin: 10,
  },
  filter01: {
    marginRight: 25,
    display: "flex",
  },
  filter0Last: {
    marginRight: "0px!important",
  },
  formControl: {
    [`& fieldset`]: {
      borderRadius: 30,
    },
  },
  countResult: {
    fontSize: 20,
    fontWeight: "bold"
  },
  switchFilterText:{
    color: "#4d4d4d"
  },
  subLegend1:{
    color: "grey",
    fontSize: 10,
    fontWeight: "bold"
  },
  comment:{
    fontSize: 11
  }
}));
