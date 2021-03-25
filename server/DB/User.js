const mongoose = require('mongoose');

const user = new mongoose.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String
  },
  mobile: {
    type: Number
  }
});

module.exports = User = mongoose.model('user', user);
