const express = require('express');
const router = express.Router();
const { authenticate } = require('../config/authMiddleware');
const calendarController = require('../controllers/calendarController');

router.get('/', authenticate, calendarController.getCalendar);
router.post('/update', authenticate, calendarController.updateCalendar);

module.exports = router;
