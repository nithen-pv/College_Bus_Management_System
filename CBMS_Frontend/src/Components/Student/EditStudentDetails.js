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
  CircularProgress,
  makeStyles,
  withStyles,
  InputAdornment,
} from "@material-ui/core";
import axios from "../axios";
import Services from "../Services";

import {
  Person,
  AccountTree,
  DirectionsBus,
  LocationOn,
  DonutLarge,
  Notes,
  Payment,
  AcUnit,
  CalendarToday,
} from "@material-ui/icons/";

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

const StudentFormDetails = (props) => {
  const [studentDetail, setStudentDetail] = useState({
    isLoaded:"",
    name: "",
    rollNo: "",
    batch: "",
    program: "",
    year: "",
    bus: "",
    busStop: "",
    busFee: "",
    paymentStatus: "",
  });

  const [getBusDetail, setGetBusDetail] = useState([]);
  const [getProgramDetail, setGetProgramDetail] = useState([]);

  const yearList = [];
  for (let index = 2018; index < 2035; index++) {
    yearList.push(index);
  }

  useEffect(() => {
    async function fetchData() {
      const program = await axios.get("/program");
      const bus = await axios.get("/bus");
      const student = await axios.get("/student/" + props.studentID);
      console.log(student.data.data);
      setStudentDetail(student.data.data);
      setGetBusDetail(bus.data.data);
      setGetProgramDetail(program.data.data);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event) => {
    setStudentDetail({
      ...studentDetail,
      [event.target.name]: event.target.value,
    });
  };

  const editStudent = async (e) => {
    e.preventDefault();
    const {
      name,
      rollNo,
      batch,
      program,
      year,
      bus,
      busStop,
      busFee,
      paymentStatus,
    } = studentDetail;

    const studentData = {
      name: name,
      username: name + rollNo + "@mes",
      rollNo: Number(rollNo),
      batch: batch,
      program: program,
      year: Number(year),
      bus: bus,
      busStop: busStop,
      busFee: Number(busFee),
      paymentStatus: paymentStatus,
    };

    // const res = await axios.patch("/student/" + studentDetail._id, studentData);
    await Services.editStudent(studentDetail._id, studentData,studentDetail.username);
    props.getStudentDetails();
  };
  const classes = useStyles();
  return (
    <form onSubmit={editStudent}>
      {studentDetail.isLoaded !== "" ? (
        <Card>
          <CardHeader
            // subheader="Enter Student Details"
            title={"Edit " + studentDetail.name + " Details"}
          />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
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
                  label="Name"
                  variant="outlined"
                  name="name"
                  required
                  onChange={handleChange}
                  value={studentDetail.name}
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <ValidationTextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Notes />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                  className={classes.margin}
                  label="Roll Number"
                  name="rollNo"
                  required
                  variant="outlined"
                  onChange={handleChange}
                  value={studentDetail.rollNo}
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <ValidationTextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountTree />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                  className={classes.margin}
                  label="Batch"
                  name="batch"
                  required
                  select
                  SelectProps={{ native: true }}
                  variant="outlined"
                  onChange={handleChange}
                  value={studentDetail.batch}
                >
                  <option>Select Batch</option>
                  <option key="S1" value="S1">
                    S1
                  </option>
                  <option key="S2" value="S2">
                    S2
                  </option>
                  <option key="S3" value="S3">
                    S3
                  </option>
                  <option key="S4" value="S4">
                    S4
                  </option>
                  <option key="S5" value="S5">
                    S5
                  </option>
                  <option key="S6" value="S6">
                    S6
                  </option>
                </ValidationTextField>
              </Grid>

              <Grid item md={6} xs={12}>
                <ValidationTextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AcUnit />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                  className={classes.margin}
                  label="Program"
                  name="program"
                  required
                  select
                  SelectProps={{ native: true }}
                  variant="outlined"
                  onChange={handleChange}
                  value={studentDetail.program}
                >
                  <option>Select Program</option>
                  {getProgramDetail.map((option) => (
                    <option key={option._id} value={option.programName}>
                      {option.programName}
                    </option>
                  ))}
                </ValidationTextField>
              </Grid>

              <Grid item md={6} xs={12}>
                <ValidationTextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarToday />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                  className={classes.margin}
                  label="Year"
                  name="year"
                  required
                  select
                  SelectProps={{ native: true }}
                  variant="outlined"
                  onChange={handleChange}
                  value={studentDetail.year}
                >
                  <option>Choose Year</option>
                  {yearList.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </ValidationTextField>
              </Grid>

              <Grid item md={6} xs={12}>
                <ValidationTextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DirectionsBus />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                  className={classes.margin}
                  label="Bus"
                  name="bus"
                  required
                  select
                  SelectProps={{ native: true }}
                  variant="outlined"
                  onChange={handleChange}
                  value={studentDetail.bus}
                >
                  <option>Select Bus Route</option>
                  {getBusDetail.length !== 0 &&
                    getBusDetail.map((row) => (
                      <option key={row._id} value={row.busRoute}>
                        {row.busRoute}
                      </option>
                    ))}
                </ValidationTextField>
              </Grid>

              <Grid item md={6} xs={12}>
                <ValidationTextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOn />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                  className={classes.margin}
                  label="Bus Stop"
                  name="busStop"
                  required
                  variant="outlined"
                  onChange={handleChange}
                  value={studentDetail.busStop}
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <ValidationTextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Payment />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                  className={classes.margin}
                  label="Bus Fee"
                  name="busFee"
                  required
                  variant="outlined"
                  onChange={handleChange}
                  value={studentDetail.busFee}
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <ValidationTextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DonutLarge />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                  className={classes.margin}
                  label="Payment Status"
                  name="paymentStatus"
                  required
                  select
                  SelectProps={{ native: true }}
                  variant="outlined"
                  onChange={handleChange}
                  value={studentDetail.paymentStatus}
                >
                  <option>Select Payment Status</option>
                  <option key="paid" value="Paid">
                    Paid
                  </option>
                  <option key="not paid" value="Not Paid">
                    Not Paid
                  </option>
                  <option key="Pending" value="Pending">
                    Pending
                  </option>
                </ValidationTextField>
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
        <div style={{ height: "80vh" }}>
          <CircularProgress disableShrink />
        </div>
      )}
    </form>
  );
};

export default StudentFormDetails;
