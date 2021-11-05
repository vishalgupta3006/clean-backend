const express = require('express');
const router = express.Router();

router.get('/',(req, res) => {
  console.log('API Triggered', req.sessionID);
  res.send({
    "textArea": "This data is from a API",
    "textBox":"this is a textbos data",
    "numInt":  "123",
    "numDec": "123.32321",
    "email": "hakuna@matata.com",
    "phone2": "8767676767676767676",
    "phone": "1234567890",
    "website": "www.newwebsite.com",
    "date": "2020-01-22",
    "dateTime": "2020-01-31 05:15:07",
    "time": "02:34:07",
    "bool": "true",
    "dropdown":"5",
    "dropdown2":"f",
    "dropdown3":"ganga",
    "dropdown4":"Punjab;Haryana"
    })
})

module.exports = router;