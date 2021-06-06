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
import Services from "../Services";
import EditBusDetails from "./EditBusDetails";
import BusListToolbar from "./BusListToolbar";

const BusListResults = () => {
  const [bus, setBus] = useState([]);
  const [busByID, setBusByID] = useState(0);

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
    const fetchData = async () => {
      const req = await Services.getBusDetails();
      setBus(req.data.data);
    };
    fetchData();
  }, []);

  const handleClickOpen = (busID) => {
    setBusByID(busID);
    console.log(busID);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getBusDetails = async () => {
    setBus([]);
    const req = await Services.getBusDetails();
    req.data.data && setBus(req.data.data);
  };

  const deleteBus = async (busID, username) => {
    await Services.deleteBus(busID, username);
    getBusDetails();
  };

  return (
    <>
      <BusListToolbar getBusDetails={getBusDetails} />
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
                <EditBusDetails
                  busID={busByID}
                  dialogClose={handleClose}
                  getBusDetails={getBusDetails}
                />
              </DialogContent>
            </Dialog>

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
                      Bus Driver
                    </StyledTableCell>
                    <StyledTableCell style={{ color: "white" }} align="center">
                      Username
                    </StyledTableCell>
                    <StyledTableCell style={{ color: "white" }} align="center">
                      Driver PhNo
                    </StyledTableCell>
                    <StyledTableCell style={{ color: "white" }} align="center">
                      Bus Staff
                    </StyledTableCell>
                    <StyledTableCell style={{ color: "white" }} align="center">
                      Staff PhNo
                    </StyledTableCell>
                    <StyledTableCell style={{ color: "white" }} align="center">
                      Actions
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bus === undefined || bus.length === 0
                    ? console.log("Loading Bus list Details")
                    : bus.map((row) => (
                        <StyledTableRow key={row._id}>
                          <StyledTableCell component="th" scope="row">
                            {row.busNo}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.busRoute}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.busDriver}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.username}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.drverPhNo}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.busStaff}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.staffPhNo}
                          </StyledTableCell>

                          <StyledTableCell align="center">
                            <IconButton
                              size="large"
                              onClick={() => handleClickOpen(row._id)}
                              style={{ marginRight: "5px" }}
                            >
                              <EditOutlined color="primary" />
                            </IconButton>
                            <IconButton
                              color="secondary"
                              onClick={() => deleteBus(row._id, row.username)}
                            >
                              <DeleteOutline color="secondary" />
                            </IconButton>
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
    </>
  );
};

export default BusListResults;
