// const mongoose = require('mongoose');

// const bookingSchema = new mongoose.Schema({
//   customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },//customer later
//   provider: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider', required: true },
//   service: { type: String, required: true },
//   date: { type: Date, required: true },
//   time: { type: String, required: true },
//   status: { 
//     type: String, 
//     enum: ['pending', 'confirmed', 'cancelled', 'completed'], 
//     default: 'pending' 
//   },
//   customerPhone: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Booking', bookingSchema,"BOOKINGS");

// models/Booking.js
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