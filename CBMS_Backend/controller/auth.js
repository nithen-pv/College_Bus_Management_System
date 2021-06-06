require("dotenv").config();

const UsersModel = require("../model/user");
const StudentModel = require("../model/student");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//! base  API
exports.signup = async (req, res) => {
  try {
    let userData = new UsersModel({
      username: req.body.username,
      password: req.body.password,
    });

    await userData.save();

    // TODO: removed before hosting
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`signUp API : uses approximately ${used} MB`);

    return res.status(201).json({
      msg: "user Created",
      data: userData,
    });
  } catch (error) {
    return res.status(403).json({
      msg: "Error Occured"+error,
    });
  }
};

exports.signin = async (req, res) => {
  try {
    let userData = await UsersModel.findOne({ username: req.body.username });

    let studentData = await StudentModel.findOne({ name: req.body.username });

    if (userData) {
      bcrypt.compare(
        req.body.password,
        userData.password,
        function (err, result) {
          if (!result) {
            return res
              .status(403)
              .json({ errors: "User credentials is wrong" });
          }

          // * for JWT token
          const username = {
            username: userData["username"],
            password: userData["password"],
          };
          const acessToken = jwt.sign(username, process.env.ACESS_TOKEN_SECRET);

          // TODO: removed before hosting
          const used = process.memoryUsage().heapUsed / 1024 / 1024;
          console.log(`signIn API : uses approximately ${used} MB`);

          return res.json({
            sucess: true,
            data: {
              user: userData,
              acesstoken: acessToken,
              userType: "admin",
            },
          });
        }
      );
    }

    // Student Sugn In
    else if (studentData) {
      let userData = studentData;
      bcrypt.compare(
        req.body.password,
        userData.password,
        function (err, result) {
          if (!result) {
            return res
              .status(403)
              .json({ errors: "User credentials is wrong" });
          }

          // * for JWT token
          const username = {
            username: userData["name"],
            password: userData["password"],
          };
          const acessToken = jwt.sign(username, process.env.ACESS_TOKEN_SECRET);

          // TODO: removed before hosting
          const used = process.memoryUsage().heapUsed / 1024 / 1024;
          console.log(`signIn API : uses approximately ${used} MB`);

          return res.json({
            sucess: true,
            data: {
              user: userData,
              acesstoken: acessToken,
              userType: "student",
            },
          });
        }
      );
    } else {
      return res.status(401).json({
        msg: "User not found",
      });
    }
  } catch (error) {
    return res.status(403).json({
      msg: "Error Occured",
    });
  }
};

// ! middlewares

exports.jwtAuthVerification = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    return res.status(401).json({
      msg: "This  user is not Authorized",
    });

  jwt.verify(token, process.env.ACESS_TOKEN_SECRET, async (err, user) => {
    if (err)
      return res.status(401).json({
        msg: "This  user is not Authorized First",
      });

    const userData = await UsersModel.findOne({ username: user.username });

    if (!userData)
      return res.status(401).json({
        msg: "This  user is not Authorized Second",
      });

    req.user = userData;

    // TODO: removed before hosting
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`JWTAUthVerification API : uses approximately ${used} MB`);

    next();
  });
};
