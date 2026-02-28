const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  auth0Id: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['Admin', 'Teacher', 'Student'], required: true },
});

module.exports = mongoose.model('User', UserSchema);
