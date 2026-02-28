const SwapRequest = require('../models/SwapRequest');

exports.createSwapRequest = async (req, res) => {
  try {
    const swap = new SwapRequest({
      fromTeacher: req.user.id,
      toTeacher: req.body.toTeacher,
      date: req.body.date,
    });
    await swap.save();
    res.status(201).json(swap);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.respondSwapRequest = async (req, res) => {
  try {
    const swap = await SwapRequest.findById(req.params.id);
    swap.status = req.body.status;
    await swap.save();
    res.json(swap);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSwapRequests = async (req, res) => {
  try {
    const swaps = await SwapRequest.find({ toTeacher: req.user.id });
    res.json(swaps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
