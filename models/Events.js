var mongoose = require('mongoose');
var EventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    unique: false,
    required: true,
    trim: true
  },
  address: {
    type: String,
    unique: false,
    required: true,
    trim: true,
    required: false,
  },
  phone: {
    type: Number,
    unique: false,
    required: true,
    trim: true
  },
  slogan: {
    type: String,
    unique: false,
    required: true,
    trim: true
  },
  date: {
    type: String,
    unique: false,
    required: true,
    trim: true
  },
  time: {
    type: String,
    unique: false,
    required: false,
  },
  users: {
    type: Array,
    required: false
  }
});
var Events = mongoose.model('Events', EventSchema);
module.exports = Events;
