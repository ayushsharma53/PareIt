const express = require('express');
const router = express.Router();
const User = require('../models/User')
const Booking = require('../models/Booking')
const Provider = require('../models/Provider')
// routes/adminRoutes.js
router.get('/admin/stats', async (req, res) => {
  const totalUsers = await User.countDocuments({ role: 'customer' });
  const totalProviders = await Provider.countDocuments();
  const totalBookings = await Booking.countDocuments();
  // Simple sum for revenue
  const revenue = await Booking.aggregate([{ $group: { _id: null, total: { $sum: "$price" } } }]);
  
  res.json({ totalUsers, totalProviders, totalBookings, revenue: revenue[0]?.total || 0 });
});

router.get('/admin/providers', async (req, res) => {
  const providers = await Provider.find().sort({ createdAt: -1 });
  res.json(providers);
});

//  Verify Provider
router.put('/admin/verify-provider/:id', async (req, res) => {
  try {
    await Provider.findByIdAndUpdate(req.params.id, { isVerified: true });
    res.status(200).json({ message: "Provider verified successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Verification failed" });
  }
});

// Delete Provider
router.delete('/admin/delete-provider/:id', async (req, res) => {
  try {
    await Provider.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Provider account deleted" });
  } catch (error) {
    res.status(500).json({ message: "Deletion failed" });
  }
});

router.get('/admin/all-users', async (req, res) => {
  try {
    // Fetches all users and selects only necessary fields
    const users = await User.find({}, 'fullName email role city profilePhoto');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

// Get only Authentication Users (Customers/Admins/etc)
router.get('/admin/users-list', async (req, res) => {
    try {
        const users = await User.find({ role: 'customer' }).sort({ createdAt: -1 });
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: "Error fetching users" });
    }
});

// Get only Professional Provider Profiles
router.get('/admin/providers-list', async (req, res) => {
    try {
        const providers = await Provider.find().sort({ createdAt: -1 });
        res.json(providers);
    } catch (err) {
        res.status(500).json({ message: "Error fetching providers" });
    }
});

// GET specific provider by their direct Provider ID
router.get('/admin/provider-details/:id', async (req, res) => {
    try {
        const provider = await Provider.findById(req.params.id);
        if (!provider) return res.status(404).json({ message: "Not found" });
        res.json(provider);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

router.get('/admin/activity-logs', async (req, res) => {
  try {
    // 1. Fetch latest data with LEAN for performance
    // Note: We use 'customer' in populate because that is the field name in Booking Schema
    const [recentUsers, recentProviders, recentBookings] = await Promise.all([
      User.find({}, 'email role createdAt').sort({ createdAt: -1 }).limit(10).lean(),
      Provider.find({}, 'fullName services createdAt').sort({ createdAt: -1 }).limit(10).lean(),
      Booking.find({})
        .populate('customer', 'email') // User schema only has email, not fullName
        .sort({ createdAt: -1 })
        .limit(10)
        .lean()
    ]);

    // 2. Format Logs
    const userLogs = recentUsers.map(u => ({
      type: 'USER_REGISTRATION',
      message: `New account created: ${u.email} (${u.role})`,
      time: u.createdAt,
      color: '#10b981'
    }));

    const providerLogs = recentProviders.map(p => ({
      type: 'PROVIDER_CREATED',
      message: `Professional profile created by ${p.fullName} for ${p.services?.join(', ') || 'services'}`,
      time: p.createdAt,
      color: '#4a90e2'
    }));

    const bookingLogs = recentBookings.map(b => ({
      type: 'BOOKING_EVENT',
      message: `New booking for ${b.service} placed by ${b.customer?.email || 'Unknown User'}`,
      time: b.createdAt,
      color: '#f1c40f'
    }));

    // 3. Combine and sort by newest first
    const allLogs = [...userLogs, ...providerLogs, ...bookingLogs]
      .sort((a, b) => new Date(b.time) - new Date(a.time));

    res.status(200).json(allLogs);
  } catch (error) {
    console.error("Activity Log Error:", error);
    res.status(500).json({ message: "Failed to fetch logs", error: error.message });
  }
});

module.exports = router;