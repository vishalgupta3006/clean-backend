const router = require("express").Router();
const uuid = require('uuid');
const Lead = require('../model/Lead');
const User = require('../model/User');
const sampleLead = require('./constant');

//Create a lead and assign it to a user
router.post('/create', (req, res) => {
  const user = {
    _id: uuid.v4(),
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    EmailAddress: req.body.EmailAddress,
    Country: req.body.Country,
    PhoneNumber: req.body.PhoneNumber,
    LeadStage: req.body.LeadStage,
    CreatedOn: Date.now(),
    ModifiedOn: Date.now()
  };
  const newLead = new Lead(user);
  newLead.save()
    .then(() => {
      User.findOne({ FirstName: "Vishal" })
        .populate('Leads')
        .then((user) => {
          console.log("Before length", user.Leads.length)
          user.Leads.push(newLead);
          console.log("After length", user.Leads.length)
          user.save()
            .then(() => res.json('Lead is successfully added'))
            .catch(err => res.json(err));
        })
    })
    .catch(err => res.status(400).json(err));
})

module.exports = router;
