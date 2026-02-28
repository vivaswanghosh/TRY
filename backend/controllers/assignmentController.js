const Assignment = require('../models/Assignment');
const Submission = require('../models/Submission');

exports.createAssignment = async (req, res) => {
  try {
    const assignment = new Assignment({
      title: req.body.title,
      description: req.body.description,
      deadline: req.body.deadline,
      createdBy: req.user.id,
    });
    await assignment.save();
    res.status(201).json(assignment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.submitAssignment = async (req, res) => {
  try {
    const submission = new Submission({
      assignment: req.body.assignmentId,
      student: req.user.id,
      filename: req.file.filename,
    });
    await submission.save();
    res.status(201).json(submission);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.gradeSubmission = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    submission.grade = req.body.grade;
    submission.feedback = req.body.feedback;
    await submission.save();
    res.json(submission);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

