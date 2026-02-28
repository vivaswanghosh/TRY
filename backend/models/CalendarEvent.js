const mongoose = require('mongoose');

const CalendarEventSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  type: { type: String, enum: ['Holiday','StudentHoliday','Exam'], required: true },
  description: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('CalendarEvent', CalendarEventSchema);
