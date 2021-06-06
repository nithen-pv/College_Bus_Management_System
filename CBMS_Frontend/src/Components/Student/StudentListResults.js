import { useState, useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
  TableCell,
  CircularProgress,
  Dialog,
  DialogContent,
  IconButton,
} from "@material-ui/core";
import { EditOutlined, DeleteOutline } from "@material-ui/icons";
import EditStudentDetails from "./EditStudentDetails";
import Services from "../Services";
import StudentListToolbar from "./StudentListToolbar";

const StudentListResults = () => {
  const [students, setStudents] = useState([]);
  const [studentByID, setStudentByID] = useState(0);

  const [open, setOpen] = useState(false);

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: "#5664d2",
      color: "rgba(63,63,68,0.15)",
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  const StyledTableRow = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });
  const classes = useStyles();

  useEffect(() => {
    async function fetchData() {
      const req = await Services.getStudents();
      req.data.data && setStudents(req.data.data);
    }
    fetchData();
    console.log(students);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getStudentDetails = async () => {
    setStudents([]);
    const req = await Services.getStudents();
    req.data.data && setStudents(req.data.data);
  };

  // Edit Student Detail
  const handleClickOpen = (studentID) => {
    setStudentByID(studentID);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Delete Student Detail
  const deleteStudent = (studentID, username) => {
    Services.deleteStudent(studentID, username);
    getStudentDetails();
  };

  return (
    <>
      <StudentListToolbar getStudentDetails={getStudentDetails} />
      <br />
      <Card>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Dialog
              fullWidth
              maxWidth="md"
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogContent>
                <EditStudentDetails
                  studentID={studentByID}
                  dialogClose={handleClose}
                  getStudentDetails={getStudentDetails}
                />
              </DialogContent>
            </Dialog>

            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell style={{ color: "white" }} align="center">
                      No
                    </StyledTableCell>
                    <StyledTableCell style={{ color: "white" }} align="center">
                      Name
                    </StyledTableCell>
                    <StyledTableCell style={{ color: "white" }} align="center">
                      Username
                    </StyledTableCell>
                    <StyledTableCell style={{ color: "white" }} align="center">
                      RollNo
                    </StyledTableCell>
                    <StyledTableCell style={{ color: "white" }} align="center">
                      Batch
                    </StyledTableCell>
                    <StyledTableCell style={{ color: "white" }} align="center">
                      Program
                    </StyledTableCell>
                    <StyledTableCell style={{ color: "white" }} align="center">
                      Year
                    </StyledTableCell>
                    <StyledTableCell style={{ color: "white" }} align="center">
                      Bus
                    </StyledTableCell>
                    <StyledTableCell style={{ color: "white" }} align="center">
                      Bus Stop
                    </StyledTableCell>
                    <StyledTableCell style={{ color: "white" }} align="right">
                      Bus Fee
                    </StyledTableCell>
                    <StyledTableCell style={{ color: "white" }} align="center">
                      Payment Status
                    </StyledTableCell>
                    <StyledTableCell style={{ color: "white" }} align="center">
                      Actions
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {students === undefined || students.length === 0
                    ? console.log("Empty Array")
                    : students.map((row, index) => (
                        <StyledTableRow key={row._id}>
                          <StyledTableCell align="center">
                            {index + 1}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.name}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.username}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.rollNo}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.batch}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.program}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.year}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.bus}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.busStop}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.busFee}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.paymentStatus}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <IconButton
                              color="primary"
                              onClick={() => handleClickOpen(row._id)}
                              style={{ marginRight: "5px" }}
                            >
                              <EditOutlined color="primary" />
                            </IconButton>
                            <IconButton
                              color="secondary"
                              onClick={() =>
                                deleteStudent(row._id, row.username)
                              }
                            >
                              <DeleteOutline color="secondary" />
                            </IconButton>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                </TableBody>
              </Table>
            </TableContainer>
            {(students === undefined || students.length === 0) && (
              <div style={{ height: "30vh" }}>
                <CircularProgress style={{ margin: "10px" }} disableShrink />
              </div>
            )}
          </Box>
        </PerfectScrollbar>
      </Card>
    </>
  );
};

export default StudentListResults;
