
import Dialog from "@material-ui/core/Dialog";
import React, { useState } from "react";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dropzone from "react-dropzone";
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from "@material-ui/core/Button";


const FileUploaderDialog = (props) => {
  return (
    <React.Fragment>
      <Dialog
        fullWidth="true"
        maxWidth="md"
        open={props.open}
        onClose={props.close}
        aria-labelledby="max-width-dialog-title"
        class="Dialog-container"
      >
        <DialogTitle id="max-width-dialog-title">
          Upload Profile picture
        </DialogTitle>
        <DialogContent>
          <Dropzone onDrop={props.handleDrop}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  {props.file ? (
                    <p>{props.file.name}</p>
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
        {props.loading && <CircularProgress size={50} class="Progress" />}
      </Dialog>
    </React.Fragment>
  );
};

export default FileUploaderDialog;
