const express = require('express');
const router = express.Router();
const isAuth = require('../middlewares/authMiddleware').isAuth;
const User = require('../model/User');
const Lead = require('../model/Lead');

//get all leads
router.get('/',isAuth, (req,res) => {
  User.findById(req.session.passport.user)
  .populate('Leads')
  .then(response => res.status(200).json(response.Leads))
  .catch(err => res.status(400).json(err));
});
//Get a single lead
router.get('/:id', isAuth, (req, res) => {
  Lead.findById(req.params.id)
  .then(lead => {
    if(lead.Owner.toString() === req.session.passport.user)
      res.json(lead);
    else
      res.json({message: 'Lead Not Found'})
  })
  .catch(err => res.status(400).json(err));
})

module.exports = router;