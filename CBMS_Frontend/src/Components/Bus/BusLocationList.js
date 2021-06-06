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
} from "@material-ui/core";
import axios from "../axios";

const BusLocationList = () => {
  const [bus, setBus] = useState([]);

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
      const req = await axios.get("/bus");
      console.log(req.data.data);
      setBus(req.data.data);
    }
    fetchData();
  }, []);

  return (
    <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell style={{ color: "white" }}>
                    Bus No
                  </StyledTableCell>
                  <StyledTableCell style={{ color: "white" }} align="center">
                    Bus Route
                  </StyledTableCell>
                  <StyledTableCell style={{ color: "white" }} align="center">
                    Current Bus Location
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {console.log(bus === undefined || bus.length === 0)}
                {bus === undefined || bus.length === 0
                  ? console.log("Empty Array")
                  : bus.map((row) => (
                      <StyledTableRow key={row._id}>
                        <StyledTableCell component="th" scope="row">
                          {row.busNo}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.busRoute}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.busLocation}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
          {(bus === undefined || bus.length === 0) && (
            <div style={{ height: "30vh" }}>
              <CircularProgress style={{ margin: "10px" }} disableShrink />
            </div>
          )}
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

export default BusLocationList;
