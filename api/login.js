const router = require('express').Router();
const passport = require('passport');

router.get('/',(req, res, next) => {
  console.log(res.session);
  passport.authenticate('local')(req, res, next);

});

module.exports = router;