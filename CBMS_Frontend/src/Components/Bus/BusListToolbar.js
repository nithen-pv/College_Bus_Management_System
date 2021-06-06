import { Box, Button, Dialog, DialogContent } from "@material-ui/core";
import { useState } from "react";
import AddBusDetails from "./AddBusDetails";

const BusListToolbar = (props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Dialog
      fullWidth
      maxWidth="md"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <AddBusDetails dialogClose={handleClose} getBusDetails={props.getBusDetails}/>
        </DialogContent>
      </Dialog>

      <Button color="primary" variant="contained" onClick={handleClickOpen}>
        Add Bus
      </Button>
    </Box>
  );
};

export default BusListToolbar;
