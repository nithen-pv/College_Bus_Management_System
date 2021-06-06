exports.programReq = async (req, res, next) => {
  req.check("programName", "programName is required").notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({
      status: false,
      error: errors,
    });
  }

  next();
};
