import { useState, useEffect } from 'react';
import './heroCustomer.css';
import logo from '../../assets/Logo.png'
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const [selected, setSelected] = useState("I am Looking for!");
  const [selectedLocation, setSelectedLocation] = useState("I am Looking Here!");
  const [locations, setLocations] = useState([]);
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  
  const navigate = useNavigate();
  const BACKEND_URL = "http://localhost:5000/";

  const options = [
    { id: 1, title: "Pet Sitting" },
    { id: 2, title: "Pet Boarding" },
    { id: 3, title: "Pet Walking" },
    { id: 4, title: "Pet Grooming" }
  ];

  // Fetch unique cities for the dropdown on load
  useEffect(() => {
    fetch(`${BACKEND_URL}api/get-locations`)
      .then(res => res.json())
      .then(data => setLocations(data))
      .catch(err => console.error(err));
  }, []);

  const handleSearch = async () => {
    setSearching(true);
    try {
      const res = await fetch(`${BACKEND_URL}api/search-providers?service=${selected}&city=${selectedLocation}`);
      const data = await res.json();
      setResults(data);
      
      // Scroll to results automatically
      setTimeout(() => {
        window.scrollTo({ top: 600, behavior: 'smooth' });
      }, 100);
    } catch (err) {
      console.error(err);
    } 
    finally {
      setSearching(false);
    }
  };

  return (
    <main className="main-content">
      <div className="hero-section">
        <img src={logo} alt="Dog Logo" className="hero-logo" />
        <h1>PareIt</h1>
        <p className="subtitle">Trusted tails unleashed</p>
      </div>

      <div className="search-container">
        <div className="search-box">
          {/* Service Dropdown */}
          <div className="dropdown dropdown-9">
            <span className="drop-down-selected-text">{selected}</span>
            <ul className="dropdown_menu dropdown_menu--animated dropdown_menu-9">
              {options.map((item) => (
                <li key={item.id} onClick={() => setSelected(item.title)}>{item.title}</li>
              ))}
            </ul>
          </div>

          {/* Location Dropdown */}
          <div className="dropdown dropdown-9">
            <span className="drop-down-selected-text">{selectedLocation}</span>
            <ul className="dropdown_menu dropdown_menu--animated dropdown_menu-9">
              {locations.map((item) => (
                <li key={item.id} onClick={() => setSelectedLocation(item.title)}>{item.title}</li>
              ))}
            </ul>
          </div>
          <button className="send-btn" onClick={handleSearch}>↑</button>
        </div>
      </div>

      {/* SEARCH RESULTS SECTION */}
      <div className="results-wrapper">
        {results.length > 0 && (
          <div className="search-results-grid">
            {results.map((sitter) => (
              <div 
                key={sitter._id} 
                className="result-card" 
                onClick={() => navigate(`/view-sitter/${sitter._id}`)}
              >
                <img 
                src={`${BACKEND_URL}${sitter.profilePhoto?.replace(/\\/g, '/')}`} 
                alt={sitter.fullName} 
                />
                <div className="card-info">
                  <h4>{sitter.fullName}</h4>
                  <p>📍 {sitter.city}</p>
                  <span className="price-tag">₹{sitter.price}</span>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {searching && <div className="loader">Searching...</div>}
      </div>
               <div className="glow-on-hover-div">
         <button className="glow-on-hover" onClick={()=>{navigate('/provider')}}>
         Wanna be Helper?
         </button>
       </div>
    </main>
  );
};

export default Hero;

