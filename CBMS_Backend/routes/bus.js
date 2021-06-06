const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportConfig = require("../auth/passport");
const { checkUserType } = require("../auth/checkUserType");

const {
  createBusInfo,
  listBusDetails,
  editBusDetails,
  deleteBusInfo,
  busByID,
  getBusDetails,
  getBusByName,
  countBus,
  getBusByDriver
} = require("../controller/bus");

const { busReq } = require("../validation/bus");

router.post("/", busReq, createBusInfo);
// router.get("/",passport.authenticate("jwt", { session: false }),checkUserType, listBusDetails);
// router.get("/:busByID",passport.authenticate("jwt", { session: false }), getBusDetails);
router.get("/", listBusDetails);
router.get("/count", countBus);
router.get("/:busByID", getBusDetails);
router.get("/busDriver/:username", getBusByDriver);
router.get("/busdetails/:busRoute", getBusByName);
router.patch("/:busByID", editBusDetails);
router.delete("/:busByID", deleteBusInfo);

router.param("busByID", busByID);

module.exports = router;
