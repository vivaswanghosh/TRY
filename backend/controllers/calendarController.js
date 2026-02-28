const CalendarEvent = require('../models/CalendarEvent');

exports.getCalendar = async (req, res) => {
  try {
    const events = await CalendarEvent.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCalendar = async (req, res) => {
  try {
    const event = new CalendarEvent({
      date: req.body.date,
      type: req.body.type,
      description: req.body.description,
      createdBy: req.user.id,
    });
    await event.save();
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
