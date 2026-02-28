const express = require('express');
const router = express.Router();
const { authenticate } = require('../config/authMiddleware');
const swapController = require('../controllers/swapController');

router.post('/create', authenticate, swapController.createSwapRequest);
router.get('/', authenticate, swapController.getSwapRequests);
router.post('/respond/:id', authenticate, swapController.respondSwapRequest);

module.exports = router;
