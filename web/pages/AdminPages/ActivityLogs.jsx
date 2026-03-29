import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../layouts/adminLayout';
import './ActivityLogs.css';

const ActivityLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Added error state
  const BACKEND_URL = "http://localhost:5000/";

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}api/admin/activity-logs`);
        
        // Handle non-200 responses
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Failed to fetch logs");
        }

        const data = await res.json();
        setLogs(data);
      } catch (err) {
        console.error("Fetch Error:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  return (
    <AdminLayout>
      <main className="actlog-page-container"> 
        <div className="actlog-header-section">
          <h2 className="actlog-title">System Activity Logs</h2>
          <p className="actlog-subtitle">Real-time tracking of users, providers, and bookings</p>
        </div>

        <div className="actlog-timeline-wrapper">
          {loading ? (
            <div className="actlog-loader">Fetching system logs...</div>
          ) : error ? (
            /* New error display section */
            <div className="actlog-error-state">
              <p>⚠️ Error: {error}</p>
              <button onClick={() => window.location.reload()}>Retry</button>
            </div>
          ) : logs.length > 0 ? (
            logs.map((log, index) => (
              <div className="actlog-item-card" key={index}>
                <div 
                  className="actlog-status-bar" 
                  style={{ backgroundColor: log.color }}
                ></div>
                <div className="actlog-body">
                  <div className="actlog-meta">
                    <span className="actlog-category" style={{ color: log.color }}>
                      {log.type ? log.type.replace(/_/g, ' ') : 'GENERAL'}
                    </span>
                    <span className="actlog-timestamp">
                      {log.time ? new Date(log.time).toLocaleString() : 'Just now'}
                    </span>
                  </div>
                  <p className="actlog-text">{log.message}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="actlog-empty">No activity recorded yet.</div>
          )}
        </div>
      </main>
    </AdminLayout>
  );
};

export default ActivityLogs;