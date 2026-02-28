const mongoose = require('mongoose');

const SwapRequestSchema = new mongoose.Schema({
  fromTeacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  toTeacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['Pending','Accepted','Rejected'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('SwapRequest', SwapRequestSchema);
