const mongoose = require('mongoose');

const ProviderSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  city: String,
  pincode: String,
  experience: String,
  radius: String,
  lat: String,
  long: String,
  price: Number,
  services: [String],
  profilePhoto: String,
  idProof: String,
  gallery: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Provider', ProviderSchema,"PROVIDER DATA");