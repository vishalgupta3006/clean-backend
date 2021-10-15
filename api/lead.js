const router = require("express").Router();
const uuid = require('uuid');
const Lead = require('../model/Lead');
const User = require('../model/User');
const isAuth = require('../middlewares/authMiddleware').isAuth;

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
  if(!emailRegex.test(lead.EmailAddress)){
    return res.status(400).json({message: "EmailAddress in not valid"});
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
            .then(() => res.json('Lead is added'))
            .catch(err => res.status(400).json(err));
        })
    })
    .catch(err => res.status(400).json(err));
})


module.exports = router;
