const Notification = require('../models/Notification');

exports.getNotifications = async (req, res) => {
  try {
    const notes = await Notification.find({ user: req.user.id });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createNotification = async (req, res) => {
  try {
    const note = new Notification({
      user: req.body.user,
      message: req.body.message,
    });
    await note.save();
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
