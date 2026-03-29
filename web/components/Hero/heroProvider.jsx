import React,{useContext, useEffect} from 'react';
import './heroProvider.css';
import logo from '../../assets/Logo.png'
import ScrollLinked from '../Animations/ScrollLinked';
import { useToast } from '../ui/Toast';
import { ProfileContext } from '../Context/ProfileContext';
const Hero = () => {
  const toast = useToast()
  const BACKEND_URL = "http://localhost:5000/";
  const userId = localStorage.getItem('userId');
  const {updateProviderStatus} = useContext(ProfileContext)
  useEffect(() => {
    const fetchProvider = async()=>{
    try {
      const res = await fetch(`${BACKEND_URL}api/provider/${userId}`);
      const data = await res.json();
      console.log(data.profile)
      if(data.profile == false){
        updateProviderStatus(false);
        return;
      }
      updateProviderStatus(true);
    } catch (err) {
      console.error("Fetch error:", err);
    }
} 
fetchProvider()
},[])
  
  useEffect(() => {
  const checkNewRequests = async () => {
    const providerId = localStorage.getItem('userId');
    
    // STOP if there is no user ID logged in
    if (!providerId) return;

    try {
      const res = await fetch(`${BACKEND_URL}api/provider-requests/${providerId}`);
      if (!res.ok) throw new Error('API Error'); // Handle 500s gracefully
      
      const data = await res.json();
      const pendingCount = data.filter(r => r.status === 'pending').length;
      
      if (pendingCount > 0) {
        toast(`You have ${pendingCount} new pending requests!`, "info");
      }
    } catch (err) {
      console.error("Silent catch: Provider ID probably not logged in or model missing.");
    }
  };

  checkNewRequests();
}, []);
  return (
    <main className="main-content">
      <div className="top-badge">
        <span className="badge-new">new</span>
        <span className="learn-more">learn more &gt;</span>
      </div>

      <div className="hero-section">
        <img src={logo} alt="Dog Logo" className="hero-logo" />
        <h1>PareIt</h1>
        <p className="subtitle">Trusted tails unleashed</p>
        <p className="description">Where quality pups meet caring homes</p>
      </div>
      <div className="scroll-main">
        <div className="scroll-inner">
        <ScrollLinked/>
        </div>
      </div>

    </main>
  );
};

export default Hero;
