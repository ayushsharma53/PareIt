const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const Provider = require('../models/Provider')
const providerCtrl = require('../controllers/providerCtrl');
const Booking = require('../models/Booking')

router.post(
  '/formsubmit-provider', 
  upload.fields([
    { name: 'profilePhoto', maxCount: 1 },
    { name: 'idProof', maxCount: 1 },
    { name: 'gallery', maxCount: 10 }
  ]), 
  providerCtrl.registerProvider
);

router.get('/provider/:id', async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.id);
    if (!provider) return res.status(404).json({profile:false, message: "Provider not found" });
    res.json({profile:true,provider});
  } catch (err) {
    res.status(500).json({ profile:false,error: err.message });
  }
});

router.get('/view-sitter/:id', async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.id);
    if (!provider) return res.status(404).json({ message: "Provider not found" });
    res.json(provider);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/get-all-providers', async (req, res) => {
    try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    const total = await Provider.countDocuments();
    const providers = await Provider.find()
      .skip(skip)
      .limit(limit);

    res.json({
      providers,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get bookings for a specific provider
router.get('/provider-requests/:providerId', async (req, res) => {
  try {
    const requests = await Booking.find({ provider: req.params.providerId })
      .populate('customer', 'fullName email') 
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update booking status (Approve/Reject)
router.patch('/update-status/:bookingId', async (req, res) => {
  try {
    const { status } = req.body; // 'confirmed' or 'cancelled'
    const booking = await Booking.findByIdAndUpdate(
      req.params.bookingId, 
      { status }, 
      { new: true }
    );
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add gallery images to existing provider
router.patch('/add-gallery-images/:id', upload.array('gallery', 10), async (req, res) => {
  try {
    const newImages = req.files.map(file => file.path); 
    const provider = await Provider.findByIdAndUpdate(
      req.params.id,
      { $push: { gallery: { $each: newImages } } }, 
      { new: true }
    );
    res.json(provider);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/chat-leads/:providerId', async (req, res) => {
  try {
    const leads = await Booking.find({ provider: req.params.providerId })
      .populate('customer', 'fullName phone email profilePhoto') 
      .sort({ createdAt: -1 });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/customer-inquiries/:customerId', async (req, res) => {
  try {
    const inquiries = await Booking.find({ customer: req.params.customerId })
      .populate('provider', 'fullName email profilePhoto phone price experience city pincode') 
      .sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch customer inquiries" });
  }
});

// Get unique cities from all registered providers
router.get('/get-locations', async (req, res) => {
  try {
    const cities = await Provider.distinct("city");
    // Format for frontend: [{id: 1, title: "Mumbai"}, ...]
    const formattedCities = cities.map((city, index) => ({ id: index, title: city }));
    res.json(formattedCities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Search providers based on service and location
router.get('/search-providers', async (req, res) => {
  try {
    const { service, city } = req.query;
    let query = {};
    
    if (service && service !== "I am Looking for!") {
      query.services = { $in: [new RegExp(`^${service}$`, 'i')] };
    }  
    if (city && city !== "I am Looking Here!") {
      query.city = { $regex: new RegExp(`^${city}$`, 'i') };
    }
    const results = await Provider.find(query);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to update price
router.patch('/update-provider-price/:id', async (req, res) => {
  try {
    const { price } = req.body;
    await Provider.findByIdAndUpdate(req.params.id, { price });
    res.status(200).json({ message: "Price updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update price" });
  }
});

// Route to delete image
router.delete('/delete-gallery-image/:id', async (req, res) => {
  try {
    const { imagePath } = req.body;
    // Remove the specific image from the gallery array
    await Provider.findByIdAndUpdate(req.params.id, {
      $pull: { gallery: imagePath }
    });
    res.status(200).json({ message: "Image deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete image" });
  }
});
module.exports = router;
