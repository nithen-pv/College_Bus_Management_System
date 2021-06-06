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
  IconButton,
} from "@material-ui/core";
import { DeleteOutline } from "@material-ui/icons";
import StaffListToolbar from "./StaffListToolbar";
import Services from "../Services";

const StaffListResult = () => {
  const [staff, setStaff] = useState([]);

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
      const req = await Services.getStaffs();
      setStaff(req.data.data);
    }
    fetchData();
  }, []);

  const getStaffDetails = async () => {
    setStaff([]);
    const req = await Services.getStaffs();
    req.data.data && setStaff(req.data.data);
  };

  const deleteStaff = async (staffID) => {
    await Services.deleteStaff(staffID);
    getStaffDetails();
  };

  return (
    <>
      <StaffListToolbar getStaffDetails={getStaffDetails} />
      <br />
      <Card>
        <PerfectScrollbar>
          <Box style={{ minWidth: 1050 }}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table" size="small">
                <TableHead>
                  <TableRow>
                    <StyledTableCell style={{ color: "white" }}>
                      No
                    </StyledTableCell>
                    <StyledTableCell style={{ color: "white" }} align="center">
                      Staffs
                    </StyledTableCell>
                    <StyledTableCell style={{ color: "white" }} align="center">
                      Actions
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {staff === undefined || staff.length === 0
                    ? console.log("Empty Array")
                    : staff.map((row, index) => (
                        <StyledTableRow key={row._id}>
                          <StyledTableCell component="th" scope="row">
                            {index + 1}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.username}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <IconButton
                              color="secondary"
                              onClick={() => deleteStaff(row._id)}
                            >
                              <DeleteOutline color="secondary" />
                            </IconButton>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                </TableBody>
              </Table>
            </TableContainer>
            {(staff === undefined || staff.length === 0) && (
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

export default StaffListResult;
