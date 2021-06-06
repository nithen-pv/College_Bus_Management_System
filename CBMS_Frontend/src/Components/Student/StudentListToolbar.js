import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  DialogContentText,
} from "@material-ui/core";
import { Backup } from "@material-ui/icons/";
import { useState } from "react";
import StudentFormDetails from "./StudentFormDetails";
import * as XLSX from "xlsx";
import axios from "../axios";

const StudentListToolbar = ({ getStudentDetails }) => {
  const [open, setOpen] = useState(false);
  const [openXls, setOpenXls] = useState(false);
  const [file, setFile] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const openImport = () => {
    setOpenXls(true);
  };

  const closeImport = () => {
    setOpenXls(false);
    setFile("");
  };

  const addListOfStudents = async (studentlist) => {
    const studentListData = { studentList: studentlist };
    const res = await axios.post("/student/list", studentListData);
    console.log(res);
  };

  // Excel Sheet to JSON Converter
  const readFile = () => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const arrayBuffer = e.target.result;
        const wb = XLSX.read(arrayBuffer, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
    promise.then((list) => {
      addListOfStudents(list);
      closeImport();
    });
  };

  return (
    <Box>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <StudentFormDetails
            dialogClose={handleClose}
            style={{ display: "flex", alignItems: "center" }}
            getStudentDetails={getStudentDetails}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        fullWidth
        open={openXls}
        onClose={closeImport}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
          <p style={{ display: "flex", alignItems: "center" }}>
            <Backup fontSize="large" style={{ marginRight: "10px" }} />
            {"Import Student List File"}
          </p>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeImport} color="primary">
            Close
          </Button>
          {file ? (
            <Button
              color="primary"
              variant="contained"
              onClick={readFile}
              autoFocus
            >
              Upload
            </Button>
          ) : (
            <Button disabled variant="contained">
              Upload
            </Button>
          )}
        </DialogActions>
      </Dialog>

      <Button style={{marginRight:"10px"}} onClick={openImport}>
        Import
      </Button>
      {/* <Button sx={{ mx: 1 }}>
          Export
      </Button> */}
      <Button color="primary" variant="contained" onClick={handleClickOpen}>
        Add Student
      </Button>
    </Box>
  );
};

export default StudentListToolbar;
