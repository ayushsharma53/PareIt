const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Provider = require('../models/Provider')
const signToken = (id,role) => {
  return jwt.sign({ id,role }, process.env.JWT_SECRET||"thisIsSecretKey", { expiresIn: process.env.JWT_EXPIRES_IN||'1h' });
};

exports.signup = async (req, res) => {
  try {
    const newUser = await User.create({
      email: req.body.email,
      password: req.body.password,
      role: req.body.role
    });
    const token = signToken(newUser._id,newUser.role);
   res.status(201).json({
      status: 'success',
      token,
      // data: { user: newUser },
      userId:newUser.id,
      role:newUser.role
    });
}
   catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// exports.login = async (req, res) => {
//  try {
//     const { email, password, role } = req.body;
    
//     // 1. Check if user exists with this email AND role
//     const user = await User.findOne({ email, role });
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(401).json({ message: 'Incorrect email, password, or role' });
//     }
//     const provider = await Provider.findOne({ email });
//     if (!provider) {
//       return res.status(404).json({ success: false, message: "Provider account not found" });
//     }
//     // 2. Generate token
//     const token = signToken(user._id,user.role);
//     // 3. Send response
//     res.status(200).json({
//       status: 'success',user,userId: provider._id,
//       token
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // STEP 1: Find the User in the main account collection
    const user = await User.findOne({ email, role });
    
    // If account doesn't exist or password fails, STOP HERE.
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Incorrect email, password, or role' });
    }

    // STEP 2: Initialize the ID we will send to the frontend
    let finalId = user._id; 

    // STEP 3: ONLY if they are a sitter, try to find their Provider Profile
    if (role === 'provider') {
      const providerProfile = await Provider.findOne({ email: email.toLowerCase() });
      
      if (providerProfile) {
        // If profile found, we use THIS ID so the frontend can show their bio/gallery
        finalId = providerProfile._id;
      } else {
        // Logged in as sitter, but hasn't filled the form yet
        return res.status(200).json({
          status: 'success',
          needsOnboarding: true, // Tell frontend to show the "Fill Form" page
          token: signToken(user._id, user.role),
          userId: user._id,
          role:user.role
        });
      }
    }

    // STEP 4: Success Response
    const token = signToken(user._id, user.role);
    res.status(200).json({
      status: 'success',
      token,
      userId: finalId, // This will be the Provider ID for sitters
      role: user.role
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};