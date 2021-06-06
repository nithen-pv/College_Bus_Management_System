exports.checkUserType = async (req, res, next) => {

  if(req.user.userType === 'admin' || req.user.userType === 'staff'){
      next();
  }
  else{
    res.status(200).json({message:"Not Authorized User"});
  }
  };
  