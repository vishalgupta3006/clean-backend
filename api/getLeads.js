const express = require('express');
const router = express.Router();
const User = require('../model/User');

router.get('/all',(req,res) => {
  User.findOne({FirstName: "Vishal"})
  .populate('Leads')
  .then(response => res.json(response))
  .catch(err => res.json(err));
})

module.exports = router;