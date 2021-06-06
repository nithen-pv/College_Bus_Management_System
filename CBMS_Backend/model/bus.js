const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const BusSchema = new mongoose.Schema({
  busNo: { type: Number, required: true, unique: true },
  busRoute: { type: String, required: true, unique: true },
  busDriver: { type: String, required: true },
  username:{ type: String, required: true },
  drverPhNo: { type: Number, required: true },
  busStaff: { type: String, required: true },
  staffPhNo: { type: Number, required: true },
  busLocation: { type: String, required: false },
});


BusSchema.plugin(uniqueValidator, { message: "{PATH} already exists!" });

module.exports = Bus = mongoose.model("Bus", BusSchema);
