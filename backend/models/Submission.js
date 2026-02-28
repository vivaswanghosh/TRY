const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  assignment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  filename: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
  grade: { type: Number },
  feedback: { type: String },
});

module.exports = mongoose.model('Submission', SubmissionSchema);
