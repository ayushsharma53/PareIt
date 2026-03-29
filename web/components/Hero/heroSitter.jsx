import React, { useContext, useState } from 'react';
import './heroSitter.css';
import { useToast } from '../ui/Toast';
import { useNavigate } from 'react-router-dom';
import { ProfileContext } from '../Context/ProfileContext';
const heroSitter = () => {
  const navigate = useNavigate()
  const toast = useToast()
  const {updateProviderStatus} = useContext(ProfileContext)
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    pincode: '',
    experience: '',
    radius: '5',
    lat: '',
    long: '',
    price: '',
    services: [],
    availableDays: []
  });

  const [files, setFiles] = useState({
    profilePhoto: null,
    idProof: null,
    gallery: []
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleServiceChange = (service) => {
    setFormData(prev => ({
      ...prev,services: prev.services.includes(service) 
        ? prev.services.filter(s => s !== service) 
        : [...prev.services, service]
    }));
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.gallery.length < 3) {
      alert("Please upload at least 3 photos.");
      return;
    }

    // 1. Create FormData object
    const data = new FormData();

    // 2. Append text fields
    Object.keys(formData).forEach(key => {
      if (key === 'services') {
        data.append(key, JSON.stringify(formData[key])); // Arrays must be stringified
      } else {
        data.append(key, formData[key]);
      }
    });

    // 3. Append files
    data.append('profilePhoto', files.profilePhoto);
    data.append('idProof', files.idProof);
    files.gallery.forEach(file => data.append('gallery', file));

    try {
      const res = await fetch("http://localhost:5000/api/formsubmit-provider", {
        method: "POST",
        // Do NOT set 'Content-Type' header; the browser sets it automatically for FormData
        body: data
      });
      const result = await res.json();
      if (res.ok) {
        localStorage.setItem('userId', result.userId);
        updateProviderStatus(true);
        toast("Registered Successfully","success")
        navigate(`/profile/${result.userId}`);
      }
      console.log("Success:", result);
    } catch (err) {
      toast("Error occured","error")
      console.error("Upload error:", err);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="provider-onboarding-form">
        <h2>Become a Service Provider</h2>
        
        {/* SECTION 1: Personal Details */}
        <section>
          <h3>1. Personal Information</h3>
          <div className="input-group">
            <input type="text" placeholder="Full Name" name="fullName" onChange={handleChange} required />
            <input type="email" placeholder="Email Address" name="email" onChange={handleChange}  required />
            <input type="tel" placeholder="Phone Number" name="number" onChange={handleChange} required />
          </div>
          <div className="file-input">
            <label>Profile Photo:</label>
            <input type="file" accept="image/*" name="profilePhoto" onChange={(e) => setFiles({ ...files, profilePhoto: e.target.files[0] })} required />
          </div>
        </section>

        {/* SECTION 2: Services & Experience */}
        <section>
          <h3>2. Service Expertise</h3>
          <div className="services-grid">
            {['Boarding', 'Grooming', 'Dog Walking', 'Pet Sitting'].map(s => (
              <label key={s} className="checkbox-card">
                <input type="checkbox" name={s} onChange={() => handleServiceChange(s)} />
                {s}
              </label>
            ))}
          </div>
          <input type="number" placeholder="Years of Experience" name="yearOfExperience" className="full-width"  onChange={handleChange} />
        </section>

        {/* SECTION 3: Location & Pricing */}
        <section>
          <h3>3. Location & Pricing</h3>
          <div className="input-group">
            <input type="text" placeholder="City" name="city"  onChange={handleChange} />
            <input type="text" placeholder="Pincode" name="pincode"  onChange={handleChange} />
          </div>
          <div className="geo-group">
            <input type="text" placeholder="Latitude (e.g. 28.6139)" name="lat" onChange={handleChange} />
            <input type="text" placeholder="Longitude (e.g. 77.2090)" name="long" onChange={handleChange} />
          </div>
          <div className="range-group">
            <label>Service Radius: {formData.radius}km</label>
            <input type="range" min="1" max="50" value={formData.radius} 
              onChange={(e) => setFormData({...formData, radius: e.target.value})} name="radius"/>
          </div>
          <input type="number" placeholder="Base Pricing (₹ per session/day)" className="full-width" name="price" onChange={handleChange} />
        </section>

        {/* SECTION 4: Documents & Photos */}
        <section>
          <h3>4. Verification & Gallery</h3>
          <div className="file-input">
            <label>ID Proof (Aadhar/PAN):</label>
            <input type="file" required name="idProof" onChange={(e) => setFiles({ ...files, idProof: e.target.files[0] })} />
          </div>
          <div className="file-input">
            <label>Service Photos (Min 3 - Mandatory):</label>
            <input type="file" multiple accept="image/*" 
              onChange={(e) => setFiles({...files, gallery: [...e.target.files]})} name="gallary" required />
            <p className="hint">Selected: {files.gallery.length} photos</p>
          </div>
        </section>

        <button type="submit" className="submit-btn">Register as Provider</button>
      </form>
    </div>
  );
};

export default heroSitter;