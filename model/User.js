const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  FirstName:{
    type: String,
    required: true,
    maxLength: 12
  },
  LastName:{
    type: String,
    required: true,
    maxLength: 12
  },
  EmailAddress:{
    type: String,
    required: true
  },
  Country:{
    type: String,
    required: true
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
    min: 16,
    max: 65,
    required: true
  },
  Leads:[{
    type: mongoose.Schema.Types.String, ref: 'Lead'
  }],
  CreatedOn:{
    type: Date,
    default: Date.now
  }
})

const User = mongoose.model('User', userSchema);
module.exports = User;