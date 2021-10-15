const router = require("express").Router();
const uuid = require('uuid');
const Lead = require('../model/Lead');
const User = require('../model/User');
const sampleLead = require('./constant');

//Create a lead and assign it to a user
router.post('/create', (req, res) => {
  //Save response of the body
  const lead = {
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
  //Mandatory check of the fields
  if(!lead._id || !lead.FirstName || !lead.EmailAddress || !lead.PhoneNumber || !lead.LeadStage){
    return res.status(400).json('Mandatory fields missing');
  }
  
  //Upload to the database
  const newLead = new Lead(lead);
  newLead.save()
    .then(() => {
      //Check a user and assign him the lead
      User.findOne({ FirstName: "Vishal" })
        .then((user) => {
          user.Leads.push(newLead._id);
          user.save()
            .then(() => res.json('Lead is added'))
            .catch(err => res.status(400).json(err));
        })
    })
    .catch(err => res.status(400).json(err));
})

module.exports = router;
