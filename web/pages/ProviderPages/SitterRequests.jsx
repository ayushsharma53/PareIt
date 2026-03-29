import React, { useEffect, useState } from 'react';
import { useToast } from '../../components/ui/Toast';
import './SitterRequests.css';
import { SitterLayout } from '../../layouts/sitterLayout';
const  SitterRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const providerId = localStorage.getItem('userId');
  const BACKEND_URL = "http://localhost:5000/";

  const fetchRequests = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}api/provider-requests/${providerId}`);
      const data = await res.json();
      setRequests(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchRequests(); }, []);

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      const res = await fetch(`${BACKEND_URL}api/update-status/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        toast(`Request ${newStatus} successfully!`, "success");
        fetchRequests(); 
      }
    } catch (err) {
      toast("Action failed", "error");
    }
  };

  return (
    <SitterLayout>
    <div className="requests-container">
      <h2>Incoming Requests</h2>
      <div className="requests-list">
        {requests.length == 0 && <div className="sr-noreq">No Request!!</div>}
        {requests.map(req => (
          <div key={req._id} className="request-card">
            <div className="req-details">
              <h4>{req.customer?.fullName}</h4>
              <p>Service: {req.service}</p>
              <p>📅 {new Date(req.date).toLocaleDateString()} | ⏰ {req.time}</p>
            </div>
            
            <div className="req-status-section">
              {req.status === 'pending' ? (
                <div className="btn-group">
                  <button className="approve-btn" onClick={() => handleStatusUpdate(req._id, 'confirmed')}>Approve</button>
                  <button className="reject-btn" onClick={() => handleStatusUpdate(req._id, 'cancelled')}>Reject</button>
                </div>
              ) : (
                <span className={`status-text ${req.status}`}>{req.status.toUpperCase()}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
    </SitterLayout>
  );
};
export default SitterRequests;