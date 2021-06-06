const Student = require("../model/student");

exports.createStudent = async (req, res) => {
  try {
    const {
      name,
      username,
      rollNo,
      batch,
      program,
      year,
      bus,
      busStop,
      busFee,
      paymentStatus,
    } = req.body;

    const student = await Student({
      name: name,
      username: username,
      rollNo: rollNo,
      batch: batch,
      program: program,
      year: year,
      bus: bus,
      busStop: busStop,
      busFee: busFee,
      paymentStatus: paymentStatus,
    });

    await student.save();

    // TODO: removed before hosting
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`createStudent API : uses approximately ${used} MB`);

    return res.status(201).json({
      msg: "New Student Added",
      data: student,
    });
  } catch (error) {
    return res.status(500).json({ msg: "Error Occured QQ" ,err:error});
  }
};

exports.listStudents = async (req, res) => {
  try {
    const studentData = await Student.find();

    // TODO: removed before hosting
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`listStudent API : uses approximately ${used} MB`);

    return res.json({
      data: studentData,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      msg: "Error Occured",
    });
  }
};

exports.countStudents = async (req, res) => {
  try {
    const studentData = await Student.estimatedDocumentCount();

    // TODO: removed before hosting
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`listStudent API : uses approximately ${used} MB`);

    return res.json({
      data: studentData,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      msg: "Error Occured",
    });
  }
};

exports.getStudent = async (req, res) => {
  try {
    const studentData = await Student.findById(req.params.studentByID);

    // TODO: removed before hosting
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`GetStudent API : uses approximately ${used} MB`);

    return res.json({
      data: studentData,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      msg: "Error Occured",
    });
  }
};

exports.getStudentByUsername = async (req, res) => {
  try {
    const studentData = await Student.find({
      username: req.params.studentByUser,
    });

    // TODO: removed before hosting
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`GetStudent API : uses approximately ${used} MB`);

    return res.json({
      data: studentData,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      msg: "Error Occured",
    });
  }
};

exports.editStudent = async (req, res) => {
  try {
    let dataBaseBody = {};

    if (req.body.name) {
      dataBaseBody["name"] = req.body.name;
    }

    if (req.body.username) {
      dataBaseBody["username"] = req.body.username;
    }

    if (req.body.rollNo) {
      dataBaseBody["rollNo"] = req.body.rollNo;
    }

    if (req.body.batch) {
      dataBaseBody["batch"] = req.body.batch;
    }

    if (req.body.program) {
      dataBaseBody["program"] = req.body.program;
    }

    if (req.body.year) {
      dataBaseBody["year"] = req.body.year;
    }

    if (req.body.bus) {
      dataBaseBody["bus"] = req.body.bus;
    }

    if (req.body.busStop) {
      dataBaseBody["busStop"] = req.body.busStop;
    }

    if (req.body.busFee) {
      dataBaseBody["busFee"] = req.body.busFee;
    }

    if (req.body.paymentStatus) {
      dataBaseBody["paymentStatus"] = req.body.paymentStatus;
    }

    await Student.updateOne(
      { _id: req.params.studentByID },
      { $set: dataBaseBody }
    );

    return res.json({
      msg: "Student details Upated",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      msg: "Error Occured",
    });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    await Student.remove({ _id: req.params.studentByID });

    // TODO: removed before hosting
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`deleteStudent API : uses approximately ${used} MB`);

    return res.json({
      status: true,
      msg: "Student  Deleted",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      msg: "Error Occured",
    });
  }
};

exports.insertManyStudent = async (req, res) => {
  try {
    const studentData = req.body.studentList;

    await Student.insertMany(studentData, (err) => {
      if (err) {
        console.log(err);
      }
    });

    // TODO: removed before hosting
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`createStudent API : uses approximately ${used} MB`);

    return res.status(201).json({
      msg: "New list of Students Created",
      data: studentData,
    });
  } catch (error) {
    return res.status(500).json({ msg: "Error Occured" });
  }
};
