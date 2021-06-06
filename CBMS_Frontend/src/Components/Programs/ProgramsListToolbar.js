import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { useState } from "react";
import Services from "../Services";

const ProgramsListToolbar = (props) => {
  const [open, setOpen] = useState(false);
  const [programName, setProgramName] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setProgramName("");
    setOpen(false);
  };

  const addProgram = async () => {
    await Services.createProgram(programName);
    setOpen(false);
    setProgramName("");
    props.getProgramDetails();
  };
  return (
    <Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="form-dialog-title">Add New Programs</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Program Name"
            type="text"
            fullWidth
            name="program"
            value={programName}
            onChange={(e) => setProgramName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          {programName !== "" ? (
            <Button
              type="submit"
              onClick={addProgram}
              color="primary"
              variant="contained"
            >
              Add
            </Button>
          ) : (
            <Button disabled variant="contained">
              Add
            </Button>
          )}
        </DialogActions>
      </Dialog>

      <Button color="primary" variant="contained" onClick={handleClickOpen}>
        Add Prgrams
      </Button>
    </Box>
  );
};

export default ProgramsListToolbar;
