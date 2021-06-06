const Bus = require("../model/bus");

exports.createBusInfo = async (req, res) => {
  try {
    const {
      busNo,
      busRoute,
      busDriver,
      username,
      drverPhNo,
      busStaff,
      staffPhNo,
      busLocation,
    } = req.body;

    const bus = await Bus({
      busNo: busNo,
      busRoute: busRoute,
      busDriver: busDriver,
      username: username,
      drverPhNo: drverPhNo,
      busStaff: busStaff,
      staffPhNo: staffPhNo,
      busLocation: busLocation,
    });

    await bus.save();

    // TODO: removed before hosting
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`createBus API : uses approximately ${used} MB`);

    return res.status(201).json({
      msg: "New Bus Info created",
      data: bus,
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

exports.listBusDetails = async (req, res) => {
  try {
    const busData = await Bus.find();

    // TODO: removed before hosting
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`listBus API : uses approximately ${used} MB`);

    return res.json({
      data: busData,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      msg: "Error Occured",
    });
  }
};

exports.countBus = async (req, res) => {
  try {
    const busData = await Bus.estimatedDocumentCount();

    // TODO: removed before hosting
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`listBus API : uses approximately ${used} MB`);

    return res.json({
      data: busData,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      msg: "Error Occured",
    });
  }
};

exports.getBusDetails = async (req, res) => {
  try {
    const busData = await Bus.findById(req.params.busByID);

    // TODO: removed before hosting
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`getBusDetail API : uses approximately ${used} MB`);

    return res.json({
      data: busData,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      msg: "Error Occured",
    });
  }
};

exports.getBusByName = async (req, res) => {
  try {
    const busData = await Bus.find({ busRoute: req.params.busRoute });

    // TODO: removed before hosting
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`getBusDetail API : uses approximately ${used} MB`);

    return res.json({
      data: busData,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      msg: "Error Occured",
    });
  }
};

exports.getBusByDriver = async (req, res) => {
  try {
    const busData = await Bus.find({ username: req.params.username });

    // TODO: removed before hosting
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`getBusDetail API : uses approximately ${used} MB`);

    return res.json({
      data: busData,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      msg: "Error Occured",
    });
  }
};

exports.editBusDetails = async (req, res) => {
  try {
    let dataBaseBody = {};

    if (req.body.busNo) {
      dataBaseBody["busNo"] = req.body.busNo;
    }

    if (req.body.busRoute) {
      dataBaseBody["busRoute"] = req.body.busRoute;
    }

    if (req.body.busDriver) {
      dataBaseBody["busDriver"] = req.body.busDriver;
    }

    if (req.body.username) {
      dataBaseBody["username"] = req.body.username;
    }

    if (req.body.drverPhNo) {
      dataBaseBody["drverPhNo"] = req.body.drverPhNo;
    }

    if (req.body.busStaff) {
      dataBaseBody["busStaff"] = req.body.busStaff;
    }

    if (req.body.staffPhNo) {
      dataBaseBody["staffPhNo"] = req.body.staffPhNo;
    }

    if (req.body.busLocation) {
      dataBaseBody["busLocation"] = req.body.busLocation;
    }

    await Bus.updateOne({ _id: req.params.busByID }, { $set: dataBaseBody });

    return res.json({
      msg: "Bus details Upated",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      msg: "Error Occured",
    });
  }
};

exports.deleteBusInfo = async (req, res) => {
  try {
    await Bus.remove({ _id: req.params.busByID });

    // TODO: removed before hosting
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`deleteBus API : uses approximately ${used} MB`);

    return res.json({
      status: true,
      msg: "Bus Details Deleted",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      msg: "Error Occured",
    });
  }
};

exports.busByID = async (req, res, next, id) => {
  const busData = await Bus.findOne({ _id: id });

  if (!busData)
    return res.status(401).json({
      msg: "This Bus doesn't exist",
    });

  req.bus = busData;

  // TODO: removed before hosting
  const used = process.memoryUsage().heapUsed / 1024 / 1024;
  console.log(`busByID API : uses approximately ${used} MB`);

  next();
};
