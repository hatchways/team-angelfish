import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    height: "92%",
    backgroundColor: "#ededed",
  },
  container: {
    height: "75%",
  },
  titleContainer: {
    height: "100%",
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    paddingTop: "100px",
    "@media (max-width:1100px)": {
      paddingTop: "100px",
    },
  },
  header: {
    padding: "10px",
    fontSize: "3.0rem",
    fontWeight: 500,
    "@media (max-width:1100px)": {
      fontSize: "2.8rem",
      paddingTop: "100px",
    },
    "@media (max-width:600px)": {
      fontSize: "2rem",
      paddingTop: "100px",
    },
  },
  heroContainer: {
    height: "100%",
  },
  heroImg: {
    height: "100%",
    objectFit: "cover",
    width: "100%",
  },
  searchDiv: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    position: "absolute",
    bottom: "210px",
    "@media (max-width:900px)": {
      position: "initial",
    },
  },
}));
