const express = require('express');
const router = express.Router();
const { authenticate } = require('../config/authMiddleware');
const routineController = require('../controllers/routineController');

router.get('/', authenticate, routineController.getRoutine);
router.post('/update', authenticate, routineController.updateRoutine);

module.exports = router;
