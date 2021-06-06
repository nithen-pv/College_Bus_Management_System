const UsersModel = require("../model/user");
const JWT = require("jsonwebtoken");
const { mainUserEnums } = require("../config/enums");

const signToken = (userID) => {
  return JWT.sign(
    {
      iss: "SECRET_KEY",
      sub: userID,
    },
    "SECRET_KEY",
    { expiresIn: "1h" }
  );
};

exports.userRegister = async (req, res) => {
  const { username, password, userType } = req.body;
  UsersModel.findOne({ username }, (err, user) => {
    if (err)
      return res
        .status(500)
        .json({ message: { msgBody: "Error has occured 1", msgError: true } });
    if (user)
      return res.status(500).json({
        message: { msgBody: "Username has already taken", msgError: true },
      });
    else {
      const newUser = new UsersModel({ username, password, userType });
      newUser.save((err) => {
        if (err)
          res.status(500).json({
            message: {
              msgBody: "Error has occured 2",
              msgError: true,
              Error: err,
            },
          });
        else
          res.status(201).json({
            message: { msgBody: "User successfully created", msgError: false },
          });
      });
    }
  });
};

exports.userLogin = async (req, res) => {
  if (req.isAuthenticated()) {
    const { _id, username, userType } = req.user;
    const token = signToken(_id);
    res.cookie("access_token", token, { httpOnly: true, sameSite: true });
    res
      .status(200)
      .json({ isAuthenticated: true, user: { username, userType } });
  }
};

exports.userLogout = async (req, res) => {
  res.clearCookie("access_token");
  res.json({ user: { username: "", userType: "" }, success: true });
};

exports.authenticated = async (req, res) => {
  const { username, userType } = req.user;
  res.status(200).json({ isAuthenticated: true, user: { username, userType } });
};

exports.listUsers = async (req, res) => {
  try {
    const userData = await UsersModel.find();

    // TODO: removed before hosting
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`listUsers API : uses approximately ${used} MB`);

    res.json({
      sucess: true,
      data: userData,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error Occured",
    });
  }
};

exports.countStaff = async (req, res) => {
  try {
    const userData = await UsersModel.countDocuments({ userType: 'staff' });

    // TODO: removed before hosting
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`listUsers API : uses approximately ${used} MB`);

    res.json({
      sucess: true,
      data: userData,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error Occured",
    });
  }
};

exports.listStaffs = async (req, res) => {
  try {
    const userData = await UsersModel.find({ userType: "staff" });

    // TODO: removed before hosting
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`listUsers API : uses approximately ${used} MB`);

    res.json({
      sucess: true,
      data: userData,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error Occured",
    });
  }
};

exports.deleteUserByID = async (req, res) => {
  try {
    await UsersModel.remove({ _id: req.params.userID });

    // TODO: removed before hosting
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`deleteuser API : uses approximately ${used} MB`);

    res.json({
      sucess: true,
      msg: "user is deleted",
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error Occured",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await UsersModel.remove({ username: req.params.username });

    // TODO: removed before hosting
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`deleteuser API : uses approximately ${used} MB`);

    res.json({
      sucess: true,
      msg: "user is deleted",
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error Occured",
    });
  }
};

exports.editUser = async (req, res) => {
  try {
    let dataBaseBody = {};

    if (req.body.username) {
      dataBaseBody["username"] = req.body.username;
    }

    if (req.body.password) {
      dataBaseBody["password"] = req.body.password;
    }

    await UsersModel.updateOne(
      { username: req.params.username },
      { $set: dataBaseBody }
    );

    return res.json({
      msg: "User details Upated",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      msg: "Error Occured",
    });
  }
};

// exports.userByID = async (req, res, next, id) => {
//   const userData = await User.findOne({ _id: id });

//   if (!userData)
//     return res.status(403).json({
//       status: false,
//       msg: "User is not found",
//     });

//   req.userIDData = userData;

//   // TODO: removed before hosting
//   const used = process.memoryUsage().heapUsed / 1024 / 1024;
//   console.log(`userByID API : uses approximately ${used} MB`);

//   next();
// };

// exports.userPermission = (req, res, next) => {
//   let flag = 0;
//   req.user.priviliage.forEach((element) => {
//     if (element == mainUserEnums.admin) {
//       flag++;
//     }
//   });

//   if (flag == 0)
//     return res.status(401).json({
//       msg: "This is user is not Authorized",
//     });

//   // TODO: removed before hosting
//   const used = process.memoryUsage().heapUsed / 1024 / 1024;
//   console.log(`userPermission API : uses approximately ${used} MB`);

//   next();
// };
