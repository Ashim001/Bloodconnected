var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: false,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  date_of_birth: {
    type: Date,
    required: false
  },
  age: {
    type: Number,
    unique: false,
    required: true,
    trim: true
  },
  address: {
    type: String,
    unique: false,
    required: true,
    trim: true
  },
  bloodGroup: {
    type: String,
    unique: false,
    required: true,
    trim: true
  },
  password: {
    type: String,
    unique: false,
    required: false,
  },
  phoneNumber: {
    type: String,
    unique: true,
    required: true
  },
  image: {
    type: String
  },
  token: {
    type: String
  },
  group: {
    type: String,
    required: true
  }
});
var User = mongoose.model('User', UserSchema);
module.exports = User;