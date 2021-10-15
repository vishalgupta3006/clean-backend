const mongoose = require('mongoose');
const uuid = require('uuid');
const leadSchema = mongoose.Schema({
  _id:{
    type: String,
    required: true
  },
  FirstName:{
    type: String,
    required: true,
    maxLength: 12
  },
  LastName:{
    type: String,
    maxLength: 12
  },
  EmailAddress:{
    type: String,
    required: true
  },
  Country:{
    type: String
  },
  PhoneNumber:{
    type: Number,
    required: true
  },
  AssociatedMobileNumbers:[{
    type: Number
  }],
  Age:{
    type: Number,
    min: 10,
    max: 120
  },
  LeadStage:{
    type: String,
    enum: ['Prospect', 'Opportunity', 'Customer', 'Invalid'],
    required: true
  },
  LeadScore:{
    type: Number,
    default: 0
  },
  Notes:{
    type: String
  },
  Files:[{
    FileType: String,
    FileName: String,
    FilePath: String
  }],
  CreatedOn:{
    type: Date,
    required: true
  },
  ModifiedOn:{
    type: Date,
    required: true
  },
  Owner: {
    type: String,
    ref: 'Lead'
  }
})
const Lead = mongoose.model('Lead', leadSchema);
module.exports = Lead;