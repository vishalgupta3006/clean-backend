const url = require('url');
const Lead = require('../model/Lead');
module.exports.isOwner = (req, res, next) => {
  const leadId = url.parse(req.url, true).query.leadId;
  Lead.findById(leadId)
  .then(lead => {
    if(lead.Owner.toString() === req.session.passport.user)
      next();
    else
      res.status(404).json({message: 'The lead does not exists'});
  })
  .catch(err => console.log(err));
}