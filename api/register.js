const router = require("express").Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
router.post('/', (req, res) => {
  const id = '004b03d5-6b4c-4d48-9106-24c878de5a14';
  const user = {
    FirstName: "Abhishek",
    LastName: "Sharma",
    EmailAddress: "Abhi@mailinator.com",
    Country: "India",
    PhoneNumber: 1231231231,
    Age: 22,
    Leads: [],
    password: "abcdefgh"
  }
  const newUser = new User(user);
  //Hash Password
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      //if (err) throw err;
      //set password to hashed password
      newUser.password = hash;
      newUser.save()
        .then(() => console.log(newUser))
        .catch(err => console.log(err))

      res.send("Success");
    })
  })
  //.catch(err => console.log(err))
})

module.exports = router;
