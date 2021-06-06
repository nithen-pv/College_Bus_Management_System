const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportConfig = require("../auth/passport");
const {
  userRegister,
  userLogin,
  userLogout,
  authenticated,
  listUsers,
  deleteUserByID,
  deleteUser,
  editUser,
  listStaffs,
  countStaff
} = require("../controller/user");

router.post("/userRegister", userRegister);
router.post(
  "/userLogin",
  passport.authenticate("local", { session: false }),
  userLogin
);
router.get(
  "/userLogout",
  passport.authenticate("jwt", { session: false }),
  userLogout
);
router.get(
  "/authenticated",
  passport.authenticate("jwt", { session: false }),
  authenticated
);
router.get("/", listUsers);
router.get("/countStaff", countStaff);
router.get("/staff", listStaffs);
router.delete("/:userID", deleteUserByID);
router.delete("/username/:username", deleteUser);
router.patch("/:username", editUser);

module.exports = router;
