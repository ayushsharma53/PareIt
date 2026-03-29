// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useToast } from '../../components/ui/Toast';
// import { AdminLayout } from '../../layouts/adminLayout';
// import './ViewProviderProfile.css';

// const ViewProviderProfile = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const toast = useToast();
//   const [provider, setProvider] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const BACKEND_URL = "http://localhost:5000/";

//   useEffect(() => {
//     const fetchProviderDetails = async () => {
//       try {
// const res = await fetch(`${BACKEND_URL}api/admin/provider-details/${id}`);
//         if (!res.ok) throw new Error("Provider not found");
//         const data = await res.json();
//         setProvider(data);
//       } catch (err) {
//         toast("Error loading provider details", "error");
//         navigate('/admin/users');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProviderDetails();
//   }, [id]);

//   const handleDelete = async () => {
//     if (!window.confirm("Are you sure? This will permanently delete this provider account.")) return;

//     try {
//       const res = await fetch(`${BACKEND_URL}api/admin/delete-provider/${id}`, {
//         method: 'DELETE',
//       });
//       if (res.ok) {
//         toast("Provider deleted successfully", "success");
//         navigate('/admin/users');
//       } else {
//         toast("Failed to delete provider", "error");
//       }
//     } catch (err) {
//       toast("Server error during deletion", "error");
//     }
//   };

//   if (loading) return <AdminLayout><div className="loader">Loading Profile...</div></AdminLayout>;
//   if (!provider) return null;

//   return (
//     <AdminLayout>
//       <main className="view-profile-container">
//         <div className="profile-header">
//           <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
//           <button className="delete-profile-btn" onClick={handleDelete}>Delete Provider</button>
//         </div>

//         <section className="profile-main">
//           <div className="profile-sidebar">
//             <img 
//               src={`${BACKEND_URL}${provider.profilePhoto?.replace(/\\/g, '/')}`} 
//               alt={provider.fullName} 
//               className="large-avatar"
//             />
//             <h2>{provider.fullName}</h2>
//             <span className={`status-badge ${provider.isVerified ? 'verified' : 'pending'}`}>
//               {provider.isVerified ? 'Verified' : 'Pending Verification'}
//             </span>
//           </div>

//           <div className="profile-details-grid">
//             <div className="detail-card">
//               <h3>Contact Info</h3>
//               <p><strong>Email:</strong> {provider.email}</p>
//               <p><strong>Phone:</strong> {provider.phone}</p>
//               <p><strong>City:</strong> {provider.city}</p>
//             </div>

//             <div className="detail-card">
//               <h3>Service Info</h3>
//               <p><strong>Service:</strong> {provider.serviceType || 'Not Specified'}</p>
//               <p><strong>Experience:</strong> {provider.experience} Years</p>
//               <p><strong>Price:</strong> ₹{provider.price}</p>
//             </div>
//           </div>
//         </section>

//         <section className="profile-gallery">
//           <h3>Uploaded Images / Portfolio</h3>
//           <div className="gallery-grid">
//             {provider.gallery && provider.gallery.length > 0 ? (
//               provider.gallery.map((img, index) => (
//                 <div key={index} className="gallery-item">
//                   <img src={`${BACKEND_URL}${img.replace(/\\/g, '/')}`} alt={`Upload ${index}`} />
//                 </div>
//               ))
//             ) : (
//               <p className="no-data">No portfolio images uploaded.</p>
//             )}
//           </div>
//         </section>
//       </main>
//     </AdminLayout>
//   );
// };

// export default ViewProviderProfile;


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '../../components/ui/Toast';
import { AdminLayout } from '../../layouts/adminLayout';
import './ViewProviderProfile.css';

const ViewProviderProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState(null); // New state for Lightbox
  const BACKEND_URL = "http://localhost:5000/";

  useEffect(() => {
    const fetchProviderDetails = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}api/admin/provider-details/${id}`);
        if (!res.ok) throw new Error("Provider not found");
        const data = await res.json();
        setProvider(data);
      } catch (err) {
        toast("Error loading provider details", "error");
        navigate('/admin/users');
      } finally {
        setLoading(false);
      }
    };
    fetchProviderDetails();
  }, [id, navigate, toast]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure? This will permanently delete this provider account.")) return;
    try {
      const res = await fetch(`${BACKEND_URL}api/admin/delete-provider/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast("Provider deleted successfully", "success");
        navigate('/admin/users');
      }
    } catch (err) {
      toast("Server error during deletion", "error");
    }
  };

  if (loading) return <AdminLayout><div className="loader">Loading Profile...</div></AdminLayout>;
  if (!provider) return null;

  return (
    <AdminLayout>
      <main className="view-profile-container">
        {/* LIGHTBOX MODAL */}
        {selectedImg && (
          <div className="image-modal-overlay" onClick={() => setSelectedImg(null)}>
            <div className="modal-content">
              <button className="close-modal">×</button>
              <img src={selectedImg} alt="Enlarged view" />
            </div>
          </div>
        )}

        <div className="profile-header">
          <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
          <button className="delete-profile-btn" onClick={handleDelete}>Delete Provider</button>
        </div>

        <section className="profile-main">
          <div className="profile-sidebar">
            <img 
              src={`${BACKEND_URL}${provider.profilePhoto?.replace(/\\/g, '/')}`} 
              alt={provider.fullName} 
              className="large-avatar"
              onClick={() => setSelectedImg(`${BACKEND_URL}${provider.profilePhoto?.replace(/\\/g, '/')}`)}
            />
            <h2>{provider.fullName}</h2>
            <span className={`status-badge ${provider.isVerified ? 'verified' : 'pending'}`}>
              {provider.isVerified ? 'Verified' : 'Pending Verification'}
            </span>
          </div>

          <div className="profile-details-grid">
            <div className="detail-card">
              <h3>Contact Info</h3>
              <p><strong>Email:</strong> {provider.email}</p>
              <p><strong>Phone:</strong> {provider.phone}</p>
              <p><strong>City:</strong> {provider.city}</p>
            </div>

            <div className="detail-card">
              <h3>Service Info</h3>
              <p><strong>Service:</strong> {provider.serviceType || 'Not Specified'}</p>
              <p><strong>Experience:</strong> {provider.experience} Years</p>
              <p><strong>Price:</strong> ₹{provider.price}</p>
            </div>
          </div>
        </section>

        <section className="profile-gallery">
          <h3>Uploaded Images / Portfolio</h3>
          <div className="gallery-grid">
            {provider.gallery && provider.gallery.length > 0 ? (
              provider.gallery.map((img, index) => {
                const imgPath = `${BACKEND_URL}${img.replace(/\\/g, '/')}`;
                return (
                  <div key={index} className="gallery-item" onClick={() => setSelectedImg(imgPath)}>
                    <div className="image-overlay"><span>View Image</span></div>
                    <img src={imgPath} alt={`Upload ${index}`} />
                  </div>
                );
              })
            ) : (
              <p className="no-data">No portfolio images uploaded.</p>
            )}
          </div>
        </section>
      </main>
    </AdminLayout>
  );
};

export default ViewProviderProfile;