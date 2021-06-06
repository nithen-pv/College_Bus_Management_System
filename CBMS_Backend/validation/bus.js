exports.busReq = async (req, res, next) => {
  req.check("busNo", "busNo is required").notEmpty();
  req.check("busRoute", "busRoute is required").notEmpty();
  req.check("busDriver", "busDriver is required").notEmpty();
  req.check("drverPhNo", "drverPhNo is required").notEmpty();
  req.check("busStaff", "busStaff is required").notEmpty();
  req.check("staffPhNo", "staffPhNo is required").notEmpty();
  req.check("username", "username is required").notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({
      status: false,
      error: errors,
    });
  }

  next();
};
