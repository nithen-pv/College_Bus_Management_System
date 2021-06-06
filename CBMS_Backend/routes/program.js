const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportConfig = require("../auth/passport");

const {
  createProgram,
  listPrograms,
  deleteProgram,
  editProgram,
  countPrograms
} = require("../controller/program");

const { programReq } = require("../validation/program");

router.post("/", programReq, createProgram);
// router.get("/", passport.authenticate("jwt", { session: false }), listPrograms);
router.get("/", listPrograms);
router.get("/count", countPrograms);
router.delete("/:programByID", deleteProgram);
router.patch("/:programByID", editProgram);

module.exports = router;
