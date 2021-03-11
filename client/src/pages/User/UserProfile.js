import React, {useState}from "react";
import Button from "@material-ui/core/Button";
import FileUploaderDialog from '../../component/Uploader/FileUploaderDialog';
import "./styles.css";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function MaxWidthDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [displaySnack, setDisplaySnack] = useState(false);
  const [displaySnackError, setDisplaySnackError] = useState(false);
  const [selectedFile, setSelectedFile] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDrop = (files) => {
    setSelectedFile(files[0]);
  };


  const handleClose = () => {
    setOpen(false);
  };

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
        console.log("Success:", result);
        setOpen(false);
        setLoading(false);
        setSelectedFile(null);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
        setSelectedFile(null);
      });
  };

  const handleCloseSnack = (event, reason) => {
    setDisplaySnackError(false);
    setDisplaySnack(false);
  };

  return (
    <div class="Container">
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open dialog
      </Button>
      <FileUploaderDialog file={selectedFile} open={open} loading={loading} close={handleClose} submit={handleSubmission} handleDrop={handleDrop}/>
      <Snackbar
        open={displaySnack}
        autoHideDuration={900}
        onClose={handleCloseSnack}
      >
        <Alert onClose={handleCloseSnack} severity="success">
          Success
        </Alert>
      </Snackbar>
      <Snackbar
        open={displaySnackError}
        autoHideDuration={900}
        onClose={handleCloseSnack}
      >
        <Alert onClose={handleCloseSnack} severity="error">
          Upload fail!
        </Alert>
      </Snackbar>
    </div>
  );
}
