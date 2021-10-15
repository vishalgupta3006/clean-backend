const router = require("express").Router();
const User = require('../model/User');

router.post('/',(req, res) => {
  const id = '004b03d5-6b4c-4d48-9106-24c878de5a14';
  const user = {
    FirstName: "Vishal",
    LastName: "Gupta",
    EmailAddress: "vishalgupta@mailinator.com",
    Country: "India",
    PhoneNumber: 9877398773,
    Age: 22,
    Leads:[id]
  }
  const newUser = new User(user);
  newUser.save()
  .then(()=>console.log(newUser))
  .catch(err => console.log(err))

  res.send("Success");
})

module.exports = router;
