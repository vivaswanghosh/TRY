const mongoose = require('mongoose');

const RoutineSchema = new mongoose.Schema({
  semester: { type: String, required: true },
  entries: [{
    date: { type: Date, required: true },
    classInfo: { type: String },
    cancelled: { type: Boolean, default: false },
    earlyEnd: { type: Boolean, default: false },
  }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Routine', RoutineSchema);
