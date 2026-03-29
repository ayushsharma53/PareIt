import React, { useEffect, useState } from 'react';
import { CustomerLayout } from '../../layouts/customerLayout';
import './customerChats.css';

const CustomerChats = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const customerId = localStorage.getItem('userId');
  const BACKEND_URL = "http://localhost:5000/";

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}api/customer-inquiries/${customerId}`);
        const data = await res.json();
        
        // Filter: Only show pending or confirmed (hide cancelled)
        const activeInquiries = (data || []).filter(iq => iq.status !== 'cancelled');
        
        setInquiries(activeInquiries);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setLoading(false);
      }
    };
    fetchInquiries();
  }, [customerId]);

  const openWhatsApp = (provider, booking) => {
    if (!provider?.phone) return alert("Provider phone number not available.");

    const cleanPhone = provider.phone.replace(/\D/g, '');
    const message = `Hi ${provider.fullName}, I'm checking in regarding my ${booking.service} request for ${new Date(booking.date).toLocaleDateString()}.`;
    
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <CustomerLayout>
      <div className="cc-chat-page-container">
        {/* Sidebar: List of Sitters contacted */}
        <aside className="cc-leads-sidebar">
          <div className="cc-sidebar-header">
            <h2>My Sitters</h2>
            <span>{inquiries.length} Active Requests</span>
          </div>
          
          <div className="cc-scrollable-list">
            {loading ? <div className="cc-loader">Loading...</div> : 
              inquiries.map((iq) => (
                <div key={iq._id} className="cc-lead-item">
                  <img 
                    src={iq.provider?.profilePhoto ? `${BACKEND_URL}${iq.provider.profilePhoto.replace(/\\/g, '/')}` : '/default-avatar.png'} 
                    alt="Sitter" 
                    className="cc-lead-avatar" 
                  />
                  <div className="cc-lead-preview">
                    <h4>{iq.provider?.fullName}</h4>
                    <p>{iq.service} • <span className={`cc-status-small cc-${iq.status}`}>{iq.status}</span></p>
                  </div>
                </div>
              ))
            }
          </div>
        </aside>

        {/* Main View: Detailed Provider Info */}
        <main className="cc-lead-details-view">
          {inquiries.length > 0 ? (
            <div className="cc-details-content">
              {inquiries.map((iq) => (
                <div key={iq._id} className="cc-lead-detail-card">
                  <div className="cc-card-top">
                    <div className="cc-user-info">
                      <h3>{iq.provider?.fullName}</h3>
                      <p>📧 {iq.provider?.email}</p>
                      <p>📍 {iq.provider?.city}, {iq.provider?.pincode}</p>
                      <p className="cc-exp-badge">⭐ {iq.provider?.experience} Years Experience</p>
                    </div>
                    <button 
                      className="cc-whatsapp-btn-customer"
                      onClick={() => openWhatsApp(iq.provider, iq)}
                    >
                      <i className="fab fa-whatsapp"></i> Contact Sitter
                    </button>
                  </div>

                  <div className="cc-request-specs">
                    <div className="cc-spec-item">
                      <label>Service Requested</label>
                      <span>{iq.service}</span>
                    </div>
                    <div className="cc-spec-item">
                      <label>Booking Date</label>
                      <span>{new Date(iq.date).toLocaleDateString()} at {iq.time}</span>
                    </div>
                    <div className="cc-spec-item">
                      <label>Current Status</label>
                      <span className={`cc-status-pill cc-${iq.status}`}>{iq.status.toUpperCase()}</span>
                    </div>
                  </div>
                  
                  <div className="cc-provider-footer-info">
                    <p>Price: <strong>₹{iq.provider?.price}</strong> / session</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="cc-empty-state">
              <h3>No active bookings</h3>
              <p>Find a sitter in the Explore section to get started!</p>
            </div>
          )}
        </main>
      </div>
    </CustomerLayout>
  );
};

export default CustomerChats;