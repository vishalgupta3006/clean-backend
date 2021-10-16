const router = require("express").Router();
const uuid = require('uuid');
const url = require('url');
const Lead = require('../model/Lead');
const User = require('../model/User');
const isAuth = require('../middlewares/authMiddleware').isAuth;
const isOwner = require('../middlewares/ownerCheck').isOwner;
const doesExists = require('../middlewares/doesExists').doesExists;
//Create a lead and assign it to a user
router.post('/create', isAuth, (req, res) => {

  //Save response of the body
  const lead = {
    ...req.body,
    _id: uuid.v4(),
    CreatedOn: Date.now(),
    ModifiedOn: Date.now(),
    Owner: req.session.passport.user
  };
  //Mandatory check of the fields
  const emailRegex = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$");
  if (!emailRegex.test(lead.EmailAddress)) {
    return res.status(400).json({ message: "EmailAddress in not valid" });
  }

  //Upload to the database
  const newLead = new Lead(lead);
  newLead.save()
    .then(() => {
      //Check a user and assign him the lead
      User.findById(req.session.passport.user)
        .then((user) => {
          user.Leads.push(newLead._id);
          user.save()
            .then(() => res.status(201).json({ message: 'Lead is added' }))
            .catch(err => res.status(400).json(err));
        })
    })
    .catch(err => res.status(400).json(err));
})

//Updates the lead
router.post('/update', isAuth, doesExists, isOwner, (req, res) => {
  const leadId = url.parse(req.url, true).query.leadId;
  const updates = {
    ...req.body,
    ModifiedOn: Date.now()
  }
  Lead.findByIdAndUpdate(leadId, updates, { runValidators: true })
  .then(() => {
    res.status(200).json({ message: 'Lead updated'})
  })
  .catch(err => res.status(400).json(err)) 
})

//Delete the lead
router.post('/delete', isAuth, doesExists, isOwner, (req, res) => {
  const leadId = url.parse(req.url, true).query.leadId;
  Lead.findByIdAndDelete(leadId)
  .then(() => {
    //Delete the lead from user's leads array
    User.findById(req.session.passport.user)
    .then(user => {
      for(let i = 0; i < user.Leads.length; i++)
        if(user.Leads[i] === leadId)
          user.Leads.splice(i, 1);
      res.status(200).json({ message: 'Lead Deleted'})
    })
    .catch(err => res.status(400).json(err))
  })
  .catch(err => res.status(400).json(err)) 
})

module.exports = router;
