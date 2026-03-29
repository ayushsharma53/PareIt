import React, { useEffect, useState } from 'react';
import { SitterLayout } from '../../layouts/sitterLayout';
import './chatLeads.css';

const ChatLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const providerId = localStorage.getItem('userId');
  const BACKEND_URL = "http://localhost:5000/";

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}api/chat-leads/${providerId}`);
        const data = await res.json();
        const activeLeads = (data || []).filter(lead => lead.status !== 'cancelled');
        setLeads(activeLeads);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchLeads();
  }, [providerId]);

  const openWhatsApp = (lead) => {
    // Use the phone number saved directly in the booking
    const phone = lead.customerPhone;
    const customerName = lead.customer?.fullName || "Customer";
    
    const message = `Hello ${customerName}, I received your request for ${lead.service} on ${new Date(lead.date).toLocaleDateString()}. I'd love to discuss the details!`;
    
    // Clean phone number (remove non-digits) for the URL
    const cleanPhone = phone.replace(/\D/g, '');
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <SitterLayout>
      <div className="chat-page-container">
        <aside className="leads-sidebar">
          <div className="sidebar-header">
            <h2>Customer Requests</h2>
            <span>{leads.length} active leads</span>
          </div>
          
          <div className="scrollable-list">
            {loading ? <div className="loader">Loading...</div> : 
              leads.map((lead) => (
                <div key={lead._id} className="lead-item">
                  <img 
                    src={lead.customer?.profilePhoto ? `${BACKEND_URL}${lead.customer.profilePhoto}` : '/default-avatar.png'} 
                    alt="" 
                    className="lead-avatar" 
                  />
                  <div className="lead-preview">
                    <h4>{lead.customer?.fullName}</h4>
                    <p>{lead.service} • <span className={`status-small ${lead.status}`}>{lead.status}</span></p>
                  </div>
                </div>
              ))
            }
          </div>
        </aside>

        <main className="lead-details-view">
          {leads.length > 0 ? (
            <div className="details-content">
              {leads.map((lead) => (
                <div key={lead._id} className="lead-detail-card">
                  <div className="card-top">
                    <div className="user-info">
                      <h3>{lead.customer?.fullName}</h3>
                      <p>📧 {lead.customer?.email}</p>
                      {/* UPDATED: Now showing the customerPhone from booking */}
                      <p>📞 {lead.customerPhone}</p> 
                    </div>
                    <button 
                      className="whatsapp-btn"
                      onClick={() => openWhatsApp(lead)}
                    >
                      <i className="fab fa-whatsapp"></i> Chat on WhatsApp
                    </button>
                  </div>

                  <div className="request-specs">
                    <div className="spec-item">
                      <label>Service Needed</label>
                      <span>{lead.service}</span>
                    </div>
                    <div className="spec-item">
                      <label>Date & Time</label>
                      <span>{new Date(lead.date).toLocaleDateString()} at {lead.time}</span>
                    </div>
                    <div className="spec-item">
                      <label>Status</label>
                      <span className={`status-pill ${lead.status}`}>{lead.status.toUpperCase()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>No active requests</h3>
              <p>Cancelled requests are hidden. Check your "Requests" tab for history.</p>
            </div>
          )}
        </main>
      </div>
    </SitterLayout>
  );
};

export default ChatLeads;