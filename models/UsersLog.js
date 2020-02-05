var mongoose = require('mongoose');
var UserLog = new mongoose.Schema({
  name: {
    type: String,
    unique: false,
    required: true,
    trim: true
  },
  message: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  rating: {
    type: String,
    unique: false,
    required: false,
    trim: true
  },
  image: {
    type: String,
    required: false
  }
});
var UserLog = mongoose.model('UserLog', UserLog);
module.exports = UserLog;