import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import FileUploaderDialog from "../../component/Uploader/FileUploaderDialog";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  }
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function MaxWidthDialog() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState({ type: "", message: "", open: false });
  const [selectedFile, setSelectedFile] = useState();

  const handleClickOpen = () => {
    setSelectedFile(null);
    setLoading(false);
    setOpen(true);
  };

  const handleDrop = (files) => {
    setSelectedFile(files[0]);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const closeSnack = () => {
    setSnack((prevState) => {
      return { ...prevState, open: false };
    });
  };

  const openSnack = (errorMessage) =>{
    if(errorMessage){
      setSnack({ type: "error", message: errorMessage, open: true });
    }else{
      setSnack({ type: "success", message: "Success", open: true });
    }
  }

  const handleSubmission = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    fetch("/api/file-upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        openSnack(result.error);
        setOpen(false);
        setLoading(false);
        setSelectedFile(null);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
        openSnack(error.message);
      });
  };

  return (
    <div className={classes.container}>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open dialog
      </Button>
      <FileUploaderDialog
        file={selectedFile}
        open={open}
        loading={loading}
        close={handleClose}
        submit={handleSubmission}
        handleDrop={handleDrop}
      />
      <Snackbar
        open={snack.open}
        autoHideDuration={1000}
        onClose={closeSnack}
      >
        <Alert severity={snack.type}>
          {snack.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
