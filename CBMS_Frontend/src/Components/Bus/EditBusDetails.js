import { useState, useEffect } from "react";
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
  CircularProgress,
} from "@material-ui/core";
import {
  Person,
  FormatListNumbered,
  Navigation,
  Phone,
} from "@material-ui/icons/";

import Services from "../Services";
import axios from "../axios";

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

const EditBusDetails = (props) => {
  const [busDetail, setBusDetail] = useState({
    isLoaded:"",
    busNo: "",
    busRoute: "",
    busDriver: "",
    drverPhNo: "",
    busStaff: "",
    staffPhNo: "",
  });

  const handleChange = (event) => {
    setBusDetail({
      ...busDetail,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const bus = await axios.get("/bus/" + props.busID);
      setBusDetail(bus.data.data);
      return console.log(bus.data.data);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editBusDetails = async (e) => {
    e.preventDefault();
    const { busNo, busRoute, busDriver, drverPhNo, busStaff, staffPhNo } =
      busDetail;

    const busData = {
      busNo: Number(busNo),
      busRoute: busRoute,
      busDriver: busDriver,
      drverPhNo: Number(drverPhNo),
      busStaff: busStaff,
      staffPhNo: Number(staffPhNo),
      username: busDriver + busNo + "@mes",
    };

    await Services.editBus(props.busID, busData,busDetail.username);
    props.getBusDetails();
  };

  const classes = useStyles();

  return (
    <form onSubmit={editBusDetails}>
      {busDetail.isLoaded !== "" ? (
        <Card>
          <CardHeader
            // subheader="Enter Student Details"
            title="Edit Bus Details"
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
            <Button
              color="primary"
              variant="contained"
              type="submit"
              onClick={() => props.dialogClose()}
            >
              Save details
            </Button>
          </Box>
        </Card>
      ) : (
        <div style={{ height: "50vh" }}>
          <CircularProgress disableShrink />
        </div>
      )}
    </form>
  );
};

export default EditBusDetails;
