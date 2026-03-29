// import React, { useEffect, useState,useContext } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { SitterLayout } from '../../layouts/sitterLayout';
// import './profile.css';
// import { useToast } from '../../components/ui/Toast';
// import { ProfileContext } from '../../components/Context/ProfileContext';
// const ProfilePage = () => {
//   const { id } = useParams();
//   const [provider, setProvider] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedImg, setSelectedImg] = useState(null); // For Image Popup
//   const toast = useToast();
//   const navigate = useNavigate();
//   const BACKEND_URL = "http://localhost:5000/";
//   const {updateProviderStatus} = useContext(ProfileContext)
//   const fetchProvider = async () => {
//     try {
//       const res = await fetch(`${BACKEND_URL}api/provider/${id}`);
//       const data = await res.json();
//       // console.log(data.profile)
//       if(data.profile == false){
//         updateProviderStatus(false);
//         navigate('/errormail')
//         return;
//       }
//       updateProviderStatus(true);
//       setProvider(data.provider);
//       setLoading(false);
//     } catch (err) {
//       console.error("Fetch error:", err);
//       navigate('/errormail');
//     }
//   };

//   useEffect(() => {
//     fetchProvider();
//   }, [id]);

//   // Handle Adding New Images
//   const handleAddImage = async (e) => {
//     const files = e.target.files;
//     if (!files.length) return;

//     const formData = new FormData();
//     for (let i = 0; i < files.length; i++) {
//       formData.append('gallery', files[i]);
//     }

//     try {
//       const res = await fetch(`${BACKEND_URL}api/add-gallery-images/${id}`, {
//         method: 'PATCH',
//         body: formData,
//       });
//       if (res.ok) {
//         toast("Images added successfully!", "success");
//         fetchProvider(); 
//       }
//     } catch (err) {
//       toast("Upload failed", "error");
//     }
//   };

//   if (loading) return <div className="loader">Loading Profile...</div>;

//   return (
//     <SitterLayout>
//       <div className="profile-container">
//         {/* Header Section */}
//         <header className="profile-header">
//           <img 
//             src={`${BACKEND_URL}${provider.profilePhoto}`} 
//             alt="Profile" 
//             className="profile-main-img" 
//           />
//           <div className="header-info">
//             <h1>{provider.fullName}</h1>
//             <p className="badge">⭐ {provider.experience} Years Experience</p>
//             <p className="location-text">📍 {provider.city}, {provider.pincode}</p>
//           </div>
//           <div className="price-tag">
//             <span>₹{provider.price}</span>
//             <small>/ session</small>
//           </div>
//         </header>

//         <div className="profile-grid">
//           {/* Left Column: Details */}
//           <div className="details-col">
//             <section className="info-card">
//               <h3>About My Services</h3>
//               <div className="services-list">
//                 {provider.services.map(service => (
//                   <span key={service} className="service-tag">{service}</span>
//                 ))}
//               </div>
//             </section>

//             <section className="info-card">
//               <h3>Contact Details</h3>
//               <p>📧 {provider.email}</p>
//               <p>📞 {provider.phone}</p>
//               <p>🌐 Radius: {provider.radius}km</p>
//             </section>
//           </div>

//         <div className="gallery-col">
//           <div className="gallery-header">
//             <h3>Workspace & Gallery</h3>
//             <label className="add-img-btn">
//               + Add Photos
//               <input type="file" multiple hidden onChange={handleAddImage} />
//             </label>
//           </div>

//           <div className="photo-grid">
//             {provider.gallery.map((img, index) => (
//               <img 
//                 key={index} 
//                 src={`${BACKEND_URL}${img}`} 
//                 alt="Gallery" 
//                 className="gallery-img"
//                 onClick={() => setSelectedImg(`${BACKEND_URL}${img}`)} // Open Popup
//               />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Image Popup Modal */}
//       {selectedImg && (
//         <div className="image-popup-overlay" onClick={() => setSelectedImg(null)}>
//           <div className="popup-content">
//             <img src={selectedImg} alt="Preview" />
//             <button className="close-popup">×</button>
//           </div>
//         </div>
//       )}
//       </div>
//     </SitterLayout>
//   );
// };

// export default ProfilePage;


import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SitterLayout } from '../../layouts/sitterLayout';
import './profile.css';
import { useToast } from '../../components/ui/Toast';
import { ProfileContext } from '../../components/Context/ProfileContext';

const ProfilePage = () => {
  const { id } = useParams();
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState(null);
  const [isEditingPrice, setIsEditingPrice] = useState(false);
  const [newPrice, setNewPrice] = useState("");
  
  const toast = useToast();
  const navigate = useNavigate();
  const BACKEND_URL = "http://localhost:5000/";
  const { updateProviderStatus } = useContext(ProfileContext);

  const fetchProvider = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}api/provider/${id}`);
      const data = await res.json();
      if (data.profile === false) {
        updateProviderStatus(false);
        navigate('/errormail');
        return;
      }
      updateProviderStatus(true);
      setProvider(data.provider);
      setNewPrice(data.provider.price);
      setLoading(false);
    } catch (err) {
      console.error("Fetch error:", err);
      navigate('/errormail');
    }
  };

  useEffect(() => {
    fetchProvider();
  }, [id]);

  const handleUpdatePrice = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}api/update-provider-price/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ price: newPrice }),
      });
      if (res.ok) {
        toast("Price updated!", "success");
        setIsEditingPrice(false);
        fetchProvider();
      }
    } catch (err) {
      toast("Failed to update price", "error");
    }
  };

  const handleDeleteImage = async (imagePath) => {
    if (!window.confirm("Delete this photo?")) return;
    try {
      const res = await fetch(`${BACKEND_URL}api/delete-gallery-image/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imagePath }),
      });
      if (res.ok) {
        toast("Image removed", "info");
        fetchProvider();
      }
    } catch (err) {
      toast("Delete failed", "error");
    }
  };

  const handleAddImage = async (e) => {
    const files = e.target.files;
    if (!files.length) return;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('gallery', files[i]);
    }
    try {
      const res = await fetch(`${BACKEND_URL}api/add-gallery-images/${id}`, {
        method: 'PATCH',
        body: formData,
      });
      if (res.ok) {
        toast("Images added successfully!", "success");
        fetchProvider();
      }
    } catch (err) {
      toast("Upload failed", "error");
    }
  };

  if (loading) return <div className="loader">Loading Profile...</div>;

  return (
    <SitterLayout>
      <div className="profile-container">
        <header className="profile-header">
          <img src={`${BACKEND_URL}${provider.profilePhoto}`} alt="Profile" className="profile-main-img" />
          <div className="header-info">
            <h1>{provider.fullName}</h1>
            <p className="badge">⭐ {provider.experience} Years Experience</p>
            <p className="location-text">📍 {provider.city}, {provider.pincode}</p>
          </div>
          
          <div className="price-tag-container">
            {isEditingPrice ? (
              <div className="price-edit-box">
                <input 
                  type="number" 
                  value={newPrice} 
                  onChange={(e) => setNewPrice(e.target.value)}
                  className="price-input"
                />
                <button onClick={handleUpdatePrice} className="price-save-btn">Save</button>
                <button onClick={() => setIsEditingPrice(false)} className="price-cancel-btn">×</button>
              </div>
            ) : (
              <div className="price-tag" onClick={() => setIsEditingPrice(true)}>
                <span>₹{provider.price}</span>
                <small>/ session ✎</small>
              </div>
            )}
          </div>
        </header>

        <div className="profile-grid">
          <div className="details-col">
            <section className="info-card">
              <h3>About My Services</h3>
              <div className="services-list">
                {provider.services.map(service => (
                  <span key={service} className="service-tag">{service}</span>
                ))}
              </div>
            </section>
            <section className="info-card">
              <h3>Contact Details</h3>
              <p>📧 {provider.email}</p>
              <p>📞 {provider.phone}</p>
              <p>🌐 Radius: {provider.radius}km</p>
            </section>
          </div>

          <div className="gallery-col">
            <div className="gallery-header">
              <h3>Workspace & Gallery</h3>
              <label className="add-img-btn">
                + Add Photos
                <input type="file" multiple hidden onChange={handleAddImage} />
              </label>
            </div>

            <div className="photo-grid">
              {provider.gallery.map((img, index) => (
                <div key={index} className="gallery-item-wrapper">
                  <img 
                    src={`${BACKEND_URL}${img}`} 
                    alt="Gallery" 
                    className="gallery-img"
                    onClick={() => setSelectedImg(`${BACKEND_URL}${img}`)}
                  />
                  <button 
                    className="delete-img-overlay" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteImage(img);
                    }}
                  >
                    🗑
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {selectedImg && (
          <div className="image-popup-overlay" onClick={() => setSelectedImg(null)}>
            <div className="popup-content">
              <img src={selectedImg} alt="Preview" />
              <button className="close-popup">×</button>
            </div>
          </div>
        )}
      </div>
    </SitterLayout>
  );
};

export default ProfilePage;