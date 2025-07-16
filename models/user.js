const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  role: {
    type: String,
    default: 'user',
  },
  totalApprovedLoan: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true, // This option handles createdAt and updatedAt
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = User;