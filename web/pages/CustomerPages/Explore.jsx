import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomerLayout } from '../../layouts/customerLayout';
import './Explore.css';

const Explore = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const BACKEND_URL = "http://localhost:5000/";
  const LIMIT = 6; 

  useEffect(() => {
    const fetchProviders = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${BACKEND_URL}api/get-all-providers?page=${currentPage}&limit=${LIMIT}`);
        const data = await res.json();
        
        setProviders(data.providers);
        setTotalPages(data.totalPages);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching providers:", err);
        setLoading(false);
      }
    };
    fetchProviders();
  }, [currentPage]); 

  return (
    <CustomerLayout>
      <div className="exp-explore-container">
        <header className="exp-explore-header">
          <h1>Find the Perfect Sitter</h1>
          <p>Browse trusted pet care providers near you</p>
        </header>

        {loading ? (
          <div className="exp-loader">Searching for sitters...</div>
        ) : (
          <>
            <div className="exp-providers-grid">
              {providers.map((sitter) => (
                <div 
                  key={sitter._id} 
                  className="exp-provider-card"
                  onClick={() => navigate(`/view-sitter/${sitter._id}`)}
                >
                  <div className="exp-card-image-wrapper">
                    <img 
                      src={sitter.profilePhoto ? `${BACKEND_URL}${sitter.profilePhoto}` : 'default-avatar.png'} 
                      alt={sitter.fullName} 
                    />
                    <div className="exp-price-badge">₹{sitter.price}</div>
                  </div>

                  <div className="exp-card-content">
                    <div className="exp-card-header">
                      <h3>{sitter.fullName}</h3>
                      <span className="exp-exp-label">{sitter.experience} Years Exp.</span>
                    </div>
                    <p className="exp-location">📍 {sitter.city}</p>
                    <div className="exp-services-tags">
                      {sitter.services.slice(0, 3).map((service, i) => (
                        <span key={i} className="exp-mini-tag">{service}</span>
                      ))}
                    </div>
                    <button className="exp-view-btn">View Profile</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="exp-pagination-footer">
              <button 
                disabled={currentPage === 1} 
                onClick={() => setCurrentPage(prev => prev - 1)}
                className="exp-pag-btn"
              >
                Previous
              </button>
              
              <span className="exp-page-info">
                Page <strong>{currentPage}</strong> of {totalPages}
              </span>

              <button 
                disabled={currentPage === totalPages} 
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="exp-pag-btn"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </CustomerLayout>
  );
};

export default Explore;