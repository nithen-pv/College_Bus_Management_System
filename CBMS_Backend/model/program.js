const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const ProgramSchema = new mongoose.Schema({
  programName: { type: String, required: true, unique: true }
});

ProgramSchema.plugin(uniqueValidator, { message: "{PATH} already exists!" });

module.exports = Program = mongoose.model("Program", ProgramSchema);
