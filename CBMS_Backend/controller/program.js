const Program = require("../model/program");

exports.createProgram = async (req, res) => {
  try {
    const { programName } = req.body;

    const program = await Program({
      programName: programName
    });

    await program.save();

    // TODO: removed before hosting
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`createProgram API : uses approximately ${used} MB`);

    return res.status(201).json({
      msg: "New Program created",
      data: program,
    });
  } catch (error) {
    if (error.errors.name) {
      return res.status(403).json({
        msg: error.errors.name.properties.message,
      });
    }

    return res.status(500).json({
      status: false,
      msg: "Error Occured",
    });
  }
};

exports.listPrograms = async (req, res) => {
  try {
    const programData = await Program.find();

    // TODO: removed before hosting
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`listProgram API : uses approximately ${used} MB`);

    return res.json({
      data: programData,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      msg: "Error Occured",
    });
  }
};

exports.countPrograms = async (req, res) => {
  try {
    const programData = await Program.estimatedDocumentCount();

    // TODO: removed before hosting
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`listProgram API : uses approximately ${used} MB`);

    return res.json({
      data: programData,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      msg: "Error Occured",
    });
  }
};

exports.deleteProgram = async (req, res) => {
  try {
    await Program.remove({ _id: req.params.programByID });

    // TODO: removed before hosting
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`deleteProgram API : uses approximately ${used} MB`);

    return res.json({
      status: true,
      msg: "Program Deleted",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      msg: "Error Occured",
    });
  }
};

exports.editProgram = async (req, res) => {
  try {
    let dataBaseBody = {};

    if (req.body.programName) {
      dataBaseBody["programName"] = req.body.programName;
    }

    await Program.updateOne({ _id: req.params.programByID }, { $set: dataBaseBody });

    return res.json({
      msg: "Program details Upated",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      msg: "Error Occured",
    });
  }
};
