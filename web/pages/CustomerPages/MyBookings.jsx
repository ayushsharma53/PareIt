import React, { useEffect, useState } from 'react';
import { CustomerLayout } from '../../layouts/customerLayout';
import './MyBookings.css';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const BACKEND_URL = "http://localhost:5000/";
  const customerId = localStorage.getItem('userId');
    
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}api/customer-bookings/${customerId}`);
        const data = await res.json();
        setBookings(data);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setLoading(false);
      }
    };
    fetchBookings();
  }, [customerId]);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'confirmed': return { color: '#4caf50', background: 'rgba(76, 175, 80, 0.1)' };
      case 'pending': return { color: '#ff9800', background: 'rgba(255, 152, 0, 0.1)' };
      case 'cancelled': return { color: '#f44336', background: 'rgba(244, 67, 54, 0.1)' };
      default: return { color: '#888', background: '#222' };
    }
  };

  return (
    <CustomerLayout>
      <div className="mb-bookings-container">
        <header className="mb-bookings-header">
          <h1>My Bookings</h1>
          <p>Track your pet care appointments</p>
        </header>

        <div className="mb-scroll-wrapper">
          {loading ? (
            <div className="mb-loader">Loading your appointments...</div>
          ) : bookings.length === 0 ? (
            <div className="mb-no-bookings">No bookings found. Time to find a sitter!</div>
          ) : (
            <div className="mb-bookings-list">
              {bookings.map((booking) => (
                <div key={booking._id} className="mb-booking-card">
                  <div className="mb-booking-info">
                    <img 
                      src={`${BACKEND_URL}${booking.provider?.profilePhoto?.replace(/\\/g, '/')}`} 
                      alt="Provider" 
                    />
                    <div>
                      <h3>{booking.provider?.fullName}</h3>
                      <p className="mb-service-type">{booking.service}</p>
                      <p className="mb-datetime">📅 {new Date(booking.date).toLocaleDateString()} at {booking.time}</p>
                    </div>
                  </div>
                  <div className="mb-booking-status">
                    <span className="mb-status-badge" style={getStatusStyle(booking.status)}>
                      {booking.status.toUpperCase()}
                    </span>
                    {/* <button className="mb-details-btn">View Details</button> */}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </CustomerLayout>
  );
};

export default MyBookings;