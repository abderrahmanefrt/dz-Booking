const mongoose= require('mongoose');
const { default: Email } = require('next-auth/providers/email');

const userscheme = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type :String,
    required: true,

  },
  isAdmin: {
    type: Boolean,
    default: false,
  }
})
module.exports = mongoose.model('Users', userscheme);