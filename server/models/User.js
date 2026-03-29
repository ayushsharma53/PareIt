const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
    role: { 
    type: String, 
    enum: ['customer', 'admin', 'provider'], 
    default: 'customer' 
  }
}, { timestamps: true });

userSchema.pre('save', async function() {
  // 1. Check if the password was modified
  if (!this.isModified('password')) return;

  try {
    // 2. Hash the password
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    
    // No next() needed! The function ends, the Promise resolves, and Mongoose saves.
  } catch (err) {
    // If you need to stop the save on error, throw it
    throw new Error(err);
  }
});

module.exports = mongoose.model('User', userSchema,'AUTHDATA');