const express = require('express');
const router = express.Router();
const multer = require('multer');
const { authenticate } = require('../config/authMiddleware');
const assignmentController = require('../controllers/assignmentController');

const upload = multer({ dest: 'uploads/assignments/' });

router.get('/', authenticate, assignmentController.getAssignments);
router.post('/create', authenticate, assignmentController.createAssignment);
router.post('/submit', authenticate, upload.single('file'), assignmentController.submitAssignment);
router.post('/grade/:id', authenticate, assignmentController.gradeSubmission);

module.exports = router;
