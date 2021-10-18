const router = require("express").Router();
const uuid = require('uuid');
const url = require('url');
const Lead = require('../model/Lead');
const User = require('../model/User');
const isEmailValid = require('../utils/emailValidation');
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
  if (!isEmailValid(lead.EmailAddress)) 
    return res.status(400).json({ message: "EmailAddress in not valid" });

  //Upload to the database
  const newLead = new Lead(lead);
  newLead.save()
    .then(() => User.findById(req.session.passport.user))
    .then(user => {
      user.Leads.push(newLead._id)
      return user.save()
    })
    .then(() => res.status(201).json({ message: 'Lead is added' }))
    .catch(err => res.status(400).json(err));
})

//Updates the lead
router.post('/update', isAuth, doesExists, isOwner, (req, res) => {
  const leadId = url.parse(req.url, true).query.leadId;
  const updates = {
    ...req.body,
    ModifiedOn: Date.now()
  }
  if (!isEmailValid(updates.EmailAddress))
    return res.status(400).json({ message: "EmailAddress in not valid" });
    
  Lead.findByIdAndUpdate(leadId, updates, { runValidators: true })
    .then(() => res.status(200).json({ message: 'Lead updated' }))
    .catch(err => res.status(400).json(err))
})

//Delete the lead
router.post('/delete', isAuth, doesExists, isOwner, (req, res) => {
  const leadId = url.parse(req.url, true).query.leadId;
  Lead.findByIdAndDelete(leadId)
    .then(() => User.findById(req.session.passport.user))
    .then(user => {
      for (let i = 0; i < user.Leads.length; i++)
        if (user.Leads[i] === leadId)
          user.Leads.splice(i, 1);
      res.status(200).json({ message: 'Lead Deleted' })
    })
    .catch(err => res.status(400).json(err))
})

module.exports = router;
