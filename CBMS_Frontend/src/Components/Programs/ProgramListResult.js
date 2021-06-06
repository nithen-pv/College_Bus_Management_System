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
import ProgramsListToolbar from "./ProgramsListToolbar";
import Services from "../Services";

const ProgramListResult = () => {
  const [program, setProgram] = useState([]);

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
      const req = await Services.getProgram();
      req.data.data && setProgram(req.data.data);
    }
    fetchData();
  }, []);

  const getProgramDetails = async () => {
    setProgram([]);
    const req = await Services.getProgram();
    req.data.data && setProgram(req.data.data);
  };

  const deleteProgram = async (programID) => {
    await Services.deleteProgram(programID);
    getProgramDetails();
  };

  return (
    <>
      <ProgramsListToolbar getProgramDetails={getProgramDetails} />
      <br />
      <Card>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table" size="small">
                <TableHead>
                  <TableRow>
                    <StyledTableCell style={{ color: "white" }}>
                      No
                    </StyledTableCell>
                    <StyledTableCell style={{ color: "white" }} align="center">
                      Programs
                    </StyledTableCell>
                    <StyledTableCell style={{ color: "white" }} align="center">
                      Actions
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {program === undefined || program.length === 0
                    ? console.log("Empty Array")
                    : program.map((row, index) => (
                        <StyledTableRow key={row._id}>
                          <StyledTableCell component="th" scope="row">
                            {index + 1}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.programName}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <IconButton
                              color="secondary"
                              onClick={() => deleteProgram(row._id)}
                            >
                              <DeleteOutline color="secondary" />
                            </IconButton>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                </TableBody>
              </Table>
            </TableContainer>
            {(program === undefined || program.length === 0) && (
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

export default ProgramListResult;
