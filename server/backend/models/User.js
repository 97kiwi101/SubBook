const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Stored as plain text for now
  name: { type: String, required: true },
  jobRoles: [String], 
  // Optional: Track their shifts
  myShiftIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Shift' }]
});

module.exports = mongoose.model('User', UserSchema);