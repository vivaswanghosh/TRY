const User = require('../models/User');

exports.getTeachers = async (req, res) => {
    try {
        const teachers = await User.find({ role: 'Teacher' });
        res.json(teachers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
