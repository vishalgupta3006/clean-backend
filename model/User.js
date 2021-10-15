const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id:{
    type: String,
    required: true
  },
  FirstName: {
    type: String,
    required: true,
    maxLength: 12
  },
  LastName: {
    type: String,
    required: true,
    maxLength: 12
  },
  EmailAddress: {
    type: String,
    required: true
  },
  Country: {
    type: String,
    required: true
  },
  PhoneNumber: {
    type: Number,
    required: true
  },
  AssociatedMobileNumbers: [{
    type: Number
  }],
  Age: {
    type: Number,
    min: 16,
    max: 65,
    required: true
  },
  Leads: [{
    type: String,
    ref: 'Lead'
  }],
  CreatedOn: {
    type: Date,
    default: Date.now
  },
  password: {
    hash: {
      type: String,
      required: true
    },
    salt: {
      type: String,
      required: true
    }
  }
})

const User = mongoose.model('User', userSchema);
module.exports = User;