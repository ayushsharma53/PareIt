import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CustomerLayout } from '../../layouts/customerLayout';
import { useToast } from '../../components/ui/Toast';
import './viewProfile.css';

const ViewProfile = () => {
  const { id } = useParams();
  const toast = useToast();
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [bookingData, setBookingData] = useState({ date: '', time: '', service: '', phone: ''});
  
  const BACKEND_URL = "http://localhost:5000/";

  const handleConfirmBooking = async () => {
    const customerId = localStorage.getItem('userId');
    
    if (!bookingData.date || !bookingData.time) {
      toast("Please select both date and time", "error");
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URL}api/create-booking`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          providerId: id,
          customerId: customerId,
          service: bookingData.service || provider.services[0],
          date: bookingData.date,
          time: bookingData.time,
          customerPhone: bookingData.phone
        })
      });
      if (res.ok) {
        toast("Booking request sent successfully!", "success");
        setShowModal(false);
      } else {
        const errorData = await res.json();
        toast(errorData.message || "Booking failed", "error");
      }
    } catch (err) {
      toast("Connection error", "error");
    }
  };

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}api/provider/${id}`);
        const data = await res.json();
        setProvider(data.provider);
        setLoading(false);
      } catch (err) {
        console.error("Error:", err);
        setLoading(false);
      }
    };
    fetchProvider();
  }, [id]);

  if (loading) return <div className="vp-loader">Loading Profile...</div>;
  if (!provider) return <div className="vp-loader">Profile not found.</div>;

  const handleWhatsApp = () => {
    const message = `Hello ${provider.fullName}, I saw your profile on PareIt and would like to inquire about your services.`;
    const whatsappUrl = `https://wa.me/${provider.phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <CustomerLayout>
      <div className="vp-view-profile-container">
        <div className="vp-profile-hero">
          <img 
            src={`${BACKEND_URL}${provider.profilePhoto?.replace(/\\/g, '/')}`} 
            alt={provider.fullName} 
            className="vp-profile-avatar"
          />
          <div className="vp-profile-main-info">
            <h1>{provider.fullName}</h1>
            <p className="vp-location-tag">📍 {provider.city}, {provider.pincode}</p>
            <div className="vp-stats-row">
              <span>⭐ 4.8 Rating</span>
              <span>💼 {provider.experience} Yrs Exp</span>
            </div>
          </div>
          <div className="vp-action-card">
            <h2>₹{provider.price}<small>/session</small></h2>
            <button className="vp-btn-book" onClick={() => setShowModal(true)}>Book Now</button>
            <button className="vp-btn-whatsapp" onClick={handleWhatsApp}>
              <i className="fab fa-whatsapp"></i> Chat on WhatsApp
            </button>
          </div>
        </div>

        <div className="vp-profile-details-grid">
          <section className="vp-about-section">
            <h3>About & Services</h3>
            <p>Providing professional care with over {provider.experience} years of experience.</p>
            <div className="vp-tags-container">
              {provider.services.map((s, i) => (
                <span key={i} className="vp-service-pill">{s}</span>
              ))}
            </div>
          </section>

          <section className="vp-gallery-section">
            <h3>Gallery</h3>
            <div className="vp-gallery-grid">
              {provider.gallery?.map((img, i) => (
                <img key={i} src={`${BACKEND_URL}${img.replace(/\\/g, '/')}`} alt="work" />
              ))}
            </div>
          </section>
        </div>
      </div>

      {showModal && (
        <div className="vp-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="vp-booking-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Book {provider.fullName}</h2>

            <label>Select Date</label>
            <input 
              type="date" 
              min={new Date().toISOString().split("T")[0]} 
              onChange={(e) => setBookingData({...bookingData, date: e.target.value})} 
            />

            <label>Select Time</label>
            <input 
              type="time" 
              onChange={(e) => setBookingData({...bookingData, time: e.target.value})} 
            />
            <label>WhatsApp Number</label>
            <input 
              type="tel" 
              placeholder="Enter your phone number"
              value={bookingData.phone}
              onChange={(e) => setBookingData({...bookingData, phone: e.target.value})} 
            />

            <label>Select Service</label>
            <select onChange={(e) => setBookingData({...bookingData, service: e.target.value})}>
              <option value="">Select a service</option>
              {provider.services.map(s => <option key={s} value={s}>{s}</option>)}
            </select>

            <div className="vp-modal-actions">
              <button className="vp-btn-confirm" onClick={handleConfirmBooking}>Confirm Booking</button>
              <button className="vp-btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </CustomerLayout>
  );
};

export default ViewProfile;