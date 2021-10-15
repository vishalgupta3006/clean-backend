const router = require("express").Router();
const uuid = require('uuid');
const User = require('../model/User');
const genPassword = require('../utils/passwordUtil').genPassword;

router.post('/', (req, res) => {

  const user = {
    ...req.body,
    _id: uuid.v4(),
    password: genPassword(req.body.password)
  }
  const newUser = new User(user);
  
  //Check If any user exist with the same email or phone
  User.find({ $or: [
      { EmailAddress: newUser.EmailAddress },
      { PhoneNumber: newUser.PhoneNumber }
    ]})
    .then(users => {
      //If email Exists return
      if (users.length > 0)
        return res.status(409).json({ message: 'An Account with the same email or phone already exists' });

      //Save the user to the DB
      newUser.save()
        .then(() => res.status(200).json({ message: 'User successfully Registered' }))
        .catch(err => res.status(400).json(err));
    })
    .catch(err => res.status(400).json(err));
})

module.exports = router;
