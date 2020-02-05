var mongoose = require('mongoose');
var assert = require('assert')
var BloodBankSchema = new mongoose.Schema({
  bloodBank: {
    type: String,
    unique: false,
    required: true,
    trim: true
  },
  address: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  phone: {
    type: Number,
    unique: false,
    required: true,
    trim: true
  },
  stock: {
    type: Number,
    unique: false,
    required: true,
    trim: true
  }
});
var BloodBank = mongoose.model('BankDetails', BloodBankSchema);
module.exports = BloodBank;
var bloodBank = new BloodBank();
bloodBank.save(function(error) {
  assert.equal(error.errors['bloodBank'].message,
    'Path `bloodBank` is required.');

});
