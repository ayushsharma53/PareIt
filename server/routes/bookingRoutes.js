const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// The POST route we discussed for the full-fledged booking
router.post('/create-booking', async (req, res) => {
  try {
    const { providerId, customerId, service, date, time,customerPhone } = req.body;

    const newBooking = await Booking.create({
      provider: providerId,
      customer: customerId,
      service,
      date,
      time,
      customerPhone
    });

    res.status(201).json({ success: true, data: newBooking });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get('/customer-bookings/:customerId', async (req, res) => {
  try {
    const bookings = await Booking.find({ customer: req.params.customerId })
      .populate('provider', 'fullName profilePhoto city') 
      .sort({ date: -1 }); 
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;