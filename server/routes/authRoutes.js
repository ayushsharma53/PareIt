const express = require('express');
const authController = require('../controllers/authController');
const protect = require('../middleware/authMiddleware');
const authorize = require('../middleware/roleMiddleware')
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.get('/profile', protect, (req, res) => {
  res.json(req.user);
});

// Admin Only Route: Delete a user
router.delete('/user/:id', protect, authorize('admin'), (req, res) => {
  res.json({ message: "User deleted successfully" });
});

// Admin or Moderator Route: Dashboard
router.get('/dashboard', protect, authorize('admin'), (req, res) => {
  res.json({ message: "Welcome to the management dashboard" });
});

// Example of a protected route
router.get('/me', protect, (req, res) => {
  res.status(200).json({ message: `Access granted for user ${req.userId}` });
});

module.exports = router;