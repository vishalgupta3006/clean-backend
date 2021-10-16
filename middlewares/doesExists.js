const Lead = require("../model/Lead")
const url = require('url')
module.exports.doesExists = (req, res, next) => {
  const leadId = url.parse(req.url, true).query.leadId;
  Lead.findById(leadId)
  .then(lead => {
    if(lead !== null)
      next();
    else
      res.status(404).json({message: 'The lead does not exists'});
  })
  .catch(err => console.log(err));
}