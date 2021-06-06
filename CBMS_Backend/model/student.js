const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  rollNo: { type: Number, required: true, unique: true },
  batch: { type: String, required: true},
  program: { type: String, required: true },
  year: { type: Number, required: true },
  bus: { type: String, required: true },
  busStop: { type: String, required: true},
  busFee: { type: Number, required: true },
  paymentStatus: { type: String, required: true },
});

StudentSchema.plugin(uniqueValidator, { message: "{PATH} already exists!" });

module.exports = Student = mongoose.model("Student", StudentSchema);
