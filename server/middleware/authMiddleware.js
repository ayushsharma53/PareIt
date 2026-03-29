const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Not logged in' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET||"thisIsSecretKey");
    
    // Fetch the user and attach to the request
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) return res.status(401).json({ message: 'User no longer exists' });

    req.user = currentUser; 
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
};