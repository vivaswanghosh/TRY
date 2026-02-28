const express = require('express');
const router = express.Router();
const { authenticate } = require('../config/authMiddleware');
const notificationController = require('../controllers/notificationController');

router.get('/', authenticate, notificationController.getNotifications);
router.post('/create', authenticate, notificationController.createNotification);

module.exports = router;
