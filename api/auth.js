const router = require('express').Router();
const passport = require('passport');
const logout = require('../middlewares/authMiddleware').logout;

router.post('/login', logout, passport.authenticate('local'), (req, res) => {
  res.status(200).json({message: 'Login success'})
});

router.post('/logout', logout,(req, res) => {
  res.status(200).json({message: 'Logout success'})
})

router.get('/isLoggedIn', (req, res) => {
  if(req.isAuthenticated())
    res.status(200).json(true);
  else
  res.status(200).json(false);
})
module.exports = router;