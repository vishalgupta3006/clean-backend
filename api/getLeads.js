const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../model/User');

router.get('/all',(req,res) => {
  if(!req.isAuthenticated()){
    return res.send("You need to login first")
  }
  console.log(req.session.passport.user);
  User.findOne({EmailAddress: "vishalgupta@mailinator.com"})
  .populate('Leads')
  .then(response => res.json(response))
  .catch(err => res.json(err));
})

module.exports = router;