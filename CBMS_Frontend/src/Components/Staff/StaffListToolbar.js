import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  TextField,
  makeStyles,
  withStyles,
  InputAdornment,
} from "@material-ui/core";

import { Person, Lock } from "@material-ui/icons/";
import AuthService from "../../Services/AuthService";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const ValidationTextField = withStyles({
  root: {
    "& input + fieldset": {
      borderColor: "#3f51b5",
      borderWidth: 2,
      borderLeftWidth: 6,
      padding: "4px !important", // override inline-style
    },
    "& input:hover + fieldset": {
      borderColor: "#3f51b5",
    },
    "& input:valid:focus + fieldset": {
      borderLeftWidth: 6,
      padding: "4px !important", // override inline-style
    },
  },
})(TextField);

const StaffListToolbar = (props) => {
  const [open, setOpen] = useState(false);
  const [staffData, setStaffData] = useState({
    staffName: "",
    password: "",
  });

  const handleChange = (event) => {
    setStaffData({
      ...staffData,
      [event.target.name]: event.target.value,
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setStaffData({
      staffName: "",
      password: "",
    });
    setOpen(false);
  };

  const addStaff = async () => {
    const staffInfo = {
      username: staffData.staffName,
      password: staffData.password,
      userType: "staff",
    };
    await AuthService.register(staffInfo).then((data) => {
      console.log("Staff Login Created", data);
    });
    props.getStaffDetails();

    setStaffData({
      staffName: "",
      password: "",
    });

    setOpen(false);
  };
  const classes = useStyles();
  return (
    <Box>
      <Box>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle id="form-dialog-title">Add New Staff</DialogTitle>
          <DialogContent>
            <ValidationTextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
              fullWidth
              className={classes.margin}
              label="Staff Name"
              required
              variant="outlined"
              name="staffName"
              value={staffData.staffName}
              onChange={handleChange}
            />
            <ValidationTextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
              fullWidth
              className={classes.margin}
              label="Password"
              required
              variant="outlined"
              name="password"
              value={staffData.password}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            {staffData.staffName && staffData.password !== "" ? (
              <Button onClick={addStaff} color="primary" variant="contained">
                Add
              </Button>
            ) : (
              <Button disabled color="primary" variant="contained">
                Add
              </Button>
            )}
          </DialogActions>
        </Dialog>

        <Button color="primary" variant="contained" onClick={handleClickOpen}>
          Add Staff
        </Button>
      </Box>
    </Box>
  );
};

export default StaffListToolbar;
