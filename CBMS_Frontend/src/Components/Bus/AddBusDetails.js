import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles,
  withStyles,
  InputAdornment,
} from "@material-ui/core";

import {
  Person,
  FormatListNumbered,
  Navigation,
  Phone,
} from "@material-ui/icons/";

import AuthService from "../../Services/AuthService";
import Services from "../Services";

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

const AddBusDetails = (props) => {
  const [busDetail, setBusDetail] = useState({
    busNo: "",
    busRoute: "",
    busDriver: "",
    drverPhNo: "",
    busStaff: "",
    staffPhNo: "",
    busLocation: "Not Available",
  });

  const handleChange = (event) => {
    setBusDetail({
      ...busDetail,
      [event.target.name]: event.target.value,
    });
  };

  const createBus = async (e) => {
    e.preventDefault();
    const {
      busNo,
      busRoute,
      busDriver,
      drverPhNo,
      busStaff,
      staffPhNo,
      busLocation,
    } = busDetail;

    const busData = {
      busNo: Number(busNo),
      busRoute: busRoute,
      busDriver: busDriver,
      username: busDriver + busNo + "@mes",
      drverPhNo: Number(drverPhNo),
      busStaff: busStaff,
      staffPhNo: Number(staffPhNo),
      busLocation: busLocation,
    };

    await Services.createBus(busData);

    const userInfo = {
      username: busDriver + busNo + "@mes",
      password: busDriver + busNo,
      userType: "busDriver",
    };
    await AuthService.register(userInfo).then((data) => {
      console.log("User Login Created", data);
    });

    props.getBusDetails();
  };
  const classes = useStyles();
  return (
    <form onSubmit={createBus}>
      <Card>
        <CardHeader
          // subheader="Enter Student Details"
          title="Add Bus Details"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <ValidationTextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FormatListNumbered />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                className={classes.margin}
                label="Bus Number"
                name="busNo"
                required
                variant="outlined"
                onChange={handleChange}
                value={busDetail.busNo}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <ValidationTextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Navigation />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                className={classes.margin}
                label="Bus Route"
                name="busRoute"
                required
                variant="outlined"
                onChange={handleChange}
                value={busDetail.busRoute}
              />
            </Grid>

            <Grid item md={6} xs={12}>
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
                label="Bus Driver"
                name="busDriver"
                required
                variant="outlined"
                onChange={handleChange}
                value={busDetail.busDriver}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <ValidationTextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                className={classes.margin}
                label="Driver Phone No"
                name="drverPhNo"
                required
                variant="outlined"
                onChange={handleChange}
                value={busDetail.drverPhNo}
              />
            </Grid>

            <Grid item md={6} xs={12}>
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
                label="Bus Staff"
                name="busStaff"
                required
                variant="outlined"
                onChange={handleChange}
                value={busDetail.busStaff}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <ValidationTextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                className={classes.margin}
                label="Staff Phone No"
                name="staffPhNo"
                required
                variant="outlined"
                onChange={handleChange}
                value={busDetail.staffPhNo}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <br />
        <Box
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginRight: "1.6rem",
            marginBottom: "1rem",
          }}
        >
          <Button
            onClick={() => props.dialogClose()}
            style={{ marginRight: "10px" }}
          >
            Close
          </Button>
          {busDetail.busNo &&
          busDetail.busRoute &&
          busDetail.busDriver &&
          busDetail.drverPhNo &&
          busDetail.busStaff &&
          busDetail.staffPhNo !== "" ? (
            <Button
              color="primary"
              variant="contained"
              type="submit"
              onClick={() => props.dialogClose()}
            >
              Save details
            </Button>
          ) : (
            <Button color="primary" variant="contained" disabled>
              Save details
            </Button>
          )}
        </Box>
      </Card>
    </form>
  );
};

export default AddBusDetails;
