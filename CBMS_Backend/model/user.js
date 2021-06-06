const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const uniqueValidator = require("mongoose-unique-validator");

const UsersSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  userType: {
    type: String,
    required: true,
    enum: ["admin", "staff", "student", "busDriver"],
  },
});

UsersSchema.pre("save", function (next) {
  let user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

UsersSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return cb(err);
    else {
      if (!isMatch) return cb(null, isMatch);
      return cb(null, this);
    }
  });
};

UsersSchema.plugin(uniqueValidator, { message: "{PATH} already exists!" });

module.exports = UsersModel = mongoose.model("UsersModel", UsersSchema);
