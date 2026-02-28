const express = require('express');
const router = express.Router();
const multer = require('multer');
const { authenticate } = require('../config/authMiddleware');
const libraryController = require('../controllers/libraryController');

const upload = multer({ dest: 'uploads/books/' });

router.post('/upload', authenticate, upload.single('file'), libraryController.uploadBook);
router.get('/books', authenticate, libraryController.getBooks);

module.exports = router;
