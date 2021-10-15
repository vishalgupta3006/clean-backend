const uuid = require('uuid');

const sampleLead = {
  _id: uuid.v4(),
  FirstName: "John",
  LastName: "Dow",
  EmailAddress: "johndoe@mailinator.com",
  Country: "US",
  PhoneNumber: 9988776655,
  LeadStage: "Customer",
  CreatedOn: Date.now(),
  ModifiedOn: Date.now()
}
module.exports = sampleLead;