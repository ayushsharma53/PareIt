const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  provider: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Provider', // Must match your Provider model name
    required: true 
  },
  customer: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', // Must match your User model name
    required: true 
  },
  service: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  customerPhone: { type: String, required: true }, // The new field we added
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'cancelled', 'completed'], 
    default: 'pending' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema,"BOOKINGS");
