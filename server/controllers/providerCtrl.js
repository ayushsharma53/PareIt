const Provider = require('../models/Provider');
exports.registerProvider = async (req, res) => {
  try {
    const data = req.body;
    const files = req.files;

    const newProvider = new Provider({
      fullName: data.fullName,
      email: data.email,
      phone: data.number, // In your React form, name="number"
      city: data.city,
      pincode: data.pincode,
      
      experience: Number(data.yearOfExperience), 
      radius: Number(data.radius),
      lat: parseFloat(data.lat),
      long: parseFloat(data.long),
      price: Number(data.price),
      services: data.services ? JSON.parse(data.services) : [],

      profilePhoto: files.profilePhoto ? files.profilePhoto[0].path : null,
      idProof: files.idProof ? files.idProof[0].path : null,
      gallery: files.gallery ? files.gallery.map(f => f.path) : []
    });

    await newProvider.save();
    res.status(201).json({ success: true, message: "Registered Successfully",userId: newProvider._id });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};