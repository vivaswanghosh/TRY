const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send('No token provided');
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.decode(token);
    // ideally verify with Auth0 public key, but for placeholder we decode
    const auth0Id = decoded.sub;
    let user = await User.findOne({ auth0Id });
    if (!user) {
      // create default student
      user = new User({ auth0Id, email: decoded.email, role: 'Student' });
      await user.save();
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).send('Invalid token');
  }
};
