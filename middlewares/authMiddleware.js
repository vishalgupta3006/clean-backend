module.exports.isAuth = (req, res, next) => {
  //console.log(req.session)
  if(req.isAuthenticated())
    next();
  else{ 
  res.status(401).json({message:'You are not authorized to access this resource'})}
}

module.exports.logout = (req, res, next) => {
  //console.log(req.session)
  req.logout();
  next();
}