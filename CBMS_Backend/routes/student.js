const express = require("express");
const router = express.Router();

const {
  createStudent,
  listStudents,
  getStudent,
  editStudent,
  deleteStudent,
  insertManyStudent,
  getStudentByUsername,
  countStudents
} = require("../controller/student");

const { studentReq } = require("../validation/student");

router.post("/", studentReq, createStudent);
router.post("/list", insertManyStudent);
router.get("/", listStudents);
router.get("/count", countStudents);
router.get("/:studentByID", getStudent);
router.get("/user/:studentByUser", getStudentByUsername);
router.patch("/:studentByID", editStudent);
router.delete("/:studentByID", deleteStudent);

module.exports = router;
