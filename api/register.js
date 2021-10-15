const router = require("express").Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const genPassword = require('../utils/passwordUtil').genPassword;

router.post('/', (req, res) => {
  const user = {
    ...req.body,
    password: genPassword(req.body.password)
  }
  const newUser = new User(user);
  //Hash Password

  newUser.save()
    .then(() => console.log(newUser))
    .catch(err => console.log(err))

  res.send("Success");

  //.catch(err => console.log(err))
})

module.exports = router;
