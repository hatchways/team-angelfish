
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dropzone from "react-dropzone";
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  dialogContainer: {
    width: "50%",
    background: "#979797",
    color: "white"
  },
  progress: {
    color: "#48ff00",
    position: "absolute",
    top: "50%",
    left: "50%",
  },
  dialogContainer:{
    display: "flex",
    justifyContent: "center"
  }
});

const FileUploaderDialog = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.dialogContainer}>
      <Dialog
        fullWidth="true"
        open={props.open}
        onClose={props.close}
        aria-labelledby="max-width-dialog-title"
        className={classes.dialogContainer}
      >
        <DialogContent>
          <Dropzone onDrop={props.handleDrop}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  {props.file ? (
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdX7wWCMOvGYD6_4-MthVKf-DjjgLF_GqQzg&usqp=CAU" />
                  ) : (
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  )}
                </div>
              </section>
            )}
          </Dropzone>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={!props.file}
            onClick={props.submit}
            color="primary"
          >
            Upload
          </Button>
        </DialogActions>
        {props.loading && <CircularProgress size={50} className={classes.progress} />}
      </Dialog>
    </div>
  );
};

export default FileUploaderDialog;
