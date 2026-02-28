const Book = require('../models/Book');

exports.uploadBook = async (req, res) => {
  try {
    const book = new Book({
      title: req.body.title,
      filename: req.file.filename,
      uploadedBy: req.user.id,
    });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
