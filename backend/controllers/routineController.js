const Routine = require('../models/Routine');

exports.getRoutine = async (req, res) => {
  try {
    const routine = await Routine.findOne({ semester: req.query.semester });
    res.json(routine);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateRoutine = async (req, res) => {
  try {
    let routine = await Routine.findOne({ semester: req.body.semester });
    if (!routine) {
      routine = new Routine(req.body);
    } else {
      Object.assign(routine, req.body);
    }
    routine.createdBy = req.user.id;
    await routine.save();
    res.json(routine);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
