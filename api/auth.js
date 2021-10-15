const router = require('express').Router();
const passport = require('passport');
const logout = require('../middlewares/authMiddleware').logout;

router.post('/login', logout, passport.authenticate('local'), (req, res) => {
  res.status(200).json({message: 'Login success'})
});

router.post('/logout', logout,(req, res) => {
  res.status(200).json({message: 'Logout success'})
})
module.exports = router;