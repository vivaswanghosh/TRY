const express = require('express');
const router = express.Router();
const { authenticate } = require('../config/authMiddleware');
const userController = require('../controllers/userController');

router.get('/teachers', authenticate, userController.getTeachers);
router.get('/me', authenticate, userController.getMe);

module.exports = router;
