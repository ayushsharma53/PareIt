// // import React, { useState, useEffect } from 'react';
// // import './heroAdmin.css';
// // import { useNavigate } from 'react-router-dom';

// // const HeroAdmin = () => {
// //   const [providers, setProviders] = useState([]);
// //   const [stats, setStats] = useState(null);
// //   const [selectedProvider, setSelectedProvider] = useState(null); // For View Action
// //   const BACKEND_URL = "http://localhost:5000/";

// //   useEffect(() => {
// //     // Fetch Stats and Providers
// //     const fetchData = async () => {
// //       const pRes = await fetch(`${BACKEND_URL}api/admin/providers`);
// //       const sRes = await fetch(`${BACKEND_URL}api/admin/stats`);
// //       setProviders(await pRes.json());
// //       setStats(await sRes.json());
// //     };
// //     fetchData();
// //   }, []);

// //   return (
// //     <main className="main-content admin-dashboard">
//       // <div className="dashboard-header">
//       //   <h2>Admin Dashboard</h2>
//       //   <p className="subtitle">System Overview</p>
//       // </div>

//       // <div className="stats-grid">
//       //   <div className="stat-card">
//       //     <div className="stat-label">Total Users</div>
//       //     <div className="stat-value">{stats?.totalUsers || 0}</div>
//       //   </div>
//       //   <div className="stat-card">
//       //     <div className="stat-label">Active Providers</div>
//       //     <div className="stat-value">{stats?.totalProviders || 0}</div>
//       //   </div>
//       //   <div className="stat-card">
//       //     <div className="stat-label">Total Revenue</div>
//       //     <div className="stat-value">₹{stats?.revenue || 0}</div>
//       //   </div>
//       // </div>

//       // <div className="dashboard-section">
//       //   <h3>Manage Providers</h3>
//       //   <div className="table-wrapper">
//       //     <table className="admin-table">
//       //       <thead>
//       //         <tr>
//       //           <th>Provider</th>
//       //           <th>City</th>
//       //           <th>Exp</th>
//       //           <th>Actions</th>
//       //         </tr>
//       //       </thead>
//       //       <tbody className="scrollable-tbody">
//       //         {providers.map(p => (
//       //           <tr key={p._id}>
//       //             <td>
//       //               <div className="td-user">
//       //                 <img src={`${BACKEND_URL}${p.profilePhoto?.replace(/\\/g, '/')}`} alt="" />
//       //                 {p.fullName}
//       //               </div>
//       //             </td>
//       //             <td>{p.city}</td>
//       //             <td>{p.experience} Yrs</td>
//       //             <td>
//       //               <button className="view-btn" onClick={() => setSelectedProvider(p)}>View Details</button>
//       //             </td>
//       //           </tr>
//       //         ))}
//       //       </tbody>
//       //     </table>
//       //   </div>
//       // </div>

// //       {/* VIEW ACTION MODAL */}
// //       {selectedProvider && (
// //         <div className="admin-modal-overlay" onClick={() => setSelectedProvider(null)}>
// //           <div className="admin-modal" onClick={e => e.stopPropagation()}>
// //             <button className="close-modal" onClick={() => setSelectedProvider(null)}>&times;</button>
// //             <div className="modal-content">
// //               <img src={`${BACKEND_URL}${selectedProvider.profilePhoto?.replace(/\\/g, '/')}`} className="modal-img" />
// //               <h3>{selectedProvider.fullName}</h3>
// //               <p><strong>Email:</strong> {selectedProvider.email}</p>
// //               <p><strong>Phone:</strong> {selectedProvider.phone}</p>
// //               <p><strong>City:</strong> {selectedProvider.city || "Not provided"}</p>
// //               <div className="modal-actions">
// //                 <button className="btn-approve">Verify Provider</button>
// //                 <button className="btn-reject">Delete Account</button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </main>
// //   );
// // };

// // export default HeroAdmin;


// import React, { useState, useEffect } from 'react';
// import './heroAdmin.css';
// import { useToast } from "../ui/Toast"; // Ensure path is correct

// const HeroAdmin = () => {
//   const [providers, setProviders] = useState([]);
//   const [stats, setStats] = useState(null);
//   const [selectedProvider, setSelectedProvider] = useState(null);
//   const toast = useToast(); // Initialize Toast
//   const BACKEND_URL = "http://localhost:5000/";
//   // Fetch Logic
//   const fetchData = async () => {
//     try {
//       const pRes = await fetch(`${BACKEND_URL}api/admin/providers`);
//       const sRes = await fetch(`${BACKEND_URL}api/admin/stats`);
//       setProviders(await pRes.json());
//       setStats(await sRes.json());
//     } catch (err) {
//       toast("Failed to load dashboard data", "error");
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);


//   const handleVerify = async (id) => {
//     try {
//       const res = await fetch(`${BACKEND_URL}api/admin/verify-provider/${id}`, {
//         method: 'PUT'
//       });
//       if (res.ok) {
//         toast("Provider verified successfully!", "success");
//         setSelectedProvider(null);
//         fetchData(); // Refresh list
//       }
//     } catch (err) {
//       toast("Could not verify provider", "error");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure? This action is permanent.")) return;

//     try {
//       const res = await fetch(`${BACKEND_URL}api/admin/delete-provider/${id}`, {
//         method: 'DELETE'
//       });
//       if (res.ok) {
//         toast("Provider removed from system", "success");
//         setSelectedProvider(null);
//         fetchData(); // Refresh list
//       }
//     } catch (err) {
//       toast("Error deleting account", "error");
//     }
//   };

//   return (
//     <main className="main-content admin-dashboard">
//       <div className="dashboard-header">
//         <h2>Admin Dashboard</h2>
//         <p className="subtitle">System Overview</p>
//       </div>

//       <div className="stats-grid">
//         <div className="stat-card">
//           <div className="stat-label">Total Users</div>
//           <div className="stat-value">{stats?.totalUsers || 0}</div>
//         </div>
//         <div className="stat-card">
//           <div className="stat-label">Active Providers</div>
//           <div className="stat-value">{stats?.totalProviders || 0}</div>
//         </div>
//         <div className="stat-card">
//           <div className="stat-label">Total Revenue</div>
//           <div className="stat-value">₹{stats?.revenue || 0}</div>
//         </div>
//       </div>

//       <div className="dashboard-section">
//         <h3>Manage Providers</h3>
//         <div className="table-wrapper">
//           <table className="admin-table">
//             <thead>
//               <tr>
//                 <th>Provider</th>
//                 <th>City</th>
//                 <th>Exp</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody className="scrollable-tbody">
//               {providers.map(p => (
//                 <tr key={p._id}>
//                   <td>
//                     <div className="td-user">
//                       <img src={`${BACKEND_URL}${p.profilePhoto?.replace(/\\/g, '/')}`} alt="" />
//                       {p.fullName}
//                     </div>
//                   </td>
//                   <td>{p.city}</td>
//                   <td>{p.experience} Yrs</td>
//                   <td>
//                     <button className="view-btn" onClick={() => setSelectedProvider(p)}>View Details</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {selectedProvider && (
//         <div className="admin-modal-overlay" onClick={() => setSelectedProvider(null)}>
//           <div className="admin-modal" onClick={e => e.stopPropagation()}>
//             <button className="close-modal" onClick={() => setSelectedProvider(null)}>&times;</button>
//             <div className="modal-content">
//               <img 
//                 src={`${BACKEND_URL}${selectedProvider.profilePhoto?.replace(/\\/g, '/')}`} 
//                 className="modal-img" 
//                 alt="Profile"
//               />
//               <h3>{selectedProvider.fullName}</h3>
//               <p><strong>Email:</strong> {selectedProvider.email}</p>
//               <p><strong>Phone:</strong> {selectedProvider.phone}</p>
//               <p><strong>City:</strong> {selectedProvider.city || "Not provided"}</p>
              
//               <div className="modal-actions">
//                 <button 
//                   className="btn-approve" 
//                   onClick={() => handleVerify(selectedProvider._id)}
//                 >
//                   Verify Provider
//                 </button>
//                 <button 
//                   className="btn-reject" 
//                   onClick={() => handleDelete(selectedProvider._id)}
//                 >
//                   Delete Account
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </main>
//   );
// };

// export default HeroAdmin;

import React, { useState, useEffect } from 'react';
import './heroAdmin.css';
import { useToast } from "../ui/Toast"; 

const HeroAdmin = () => {
  const [providers, setProviders] = useState([]);
  const [stats, setStats] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const toast = useToast();
  const BACKEND_URL = "http://localhost:5000/";

  const fetchData = async () => {
    try {
      const pRes = await fetch(`${BACKEND_URL}api/admin/providers`);
      const sRes = await fetch(`${BACKEND_URL}api/admin/stats`);
      setProviders(await pRes.json());
      setStats(await sRes.json());
    } catch (err) {
      toast("Failed to load dashboard data", "error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleVerify = async (id) => {
    try {
      const res = await fetch(`${BACKEND_URL}api/admin/verify-provider/${id}`, {
        method: 'PUT'
      });
      if (res.ok) {
        toast("Provider verified successfully!", "success");
        setSelectedProvider(null);
        fetchData();
      }
    } catch (err) {
      toast("Could not verify provider", "error");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure? This action is permanent.")) return;
    try {
      const res = await fetch(`${BACKEND_URL}api/admin/delete-provider/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        toast("Provider removed from system", "success");
        setSelectedProvider(null);
        fetchData();
      }
    } catch (err) {
      toast("Error deleting account", "error");
    }
  };

  return (
    <main className="adm-main-content adm-admin-dashboard">
      <div className="adm-dashboard-header">
        <h2>Admin Dashboard</h2>
        <p className="adm-subtitle"> System Overview</p>
      </div>

      <div className="adm-stats-grid">
        <div className="adm-stat-card">
          <div className="adm-stat-label">Total Users{console.log(stats)}</div>
          <div className="adm-stat-value">{stats?.totalUsers || 0}</div>
        </div>
        <div className="adm-stat-card">
          <div className="adm-stat-label">Active Providers</div>
          <div className="adm-stat-value">{stats?.totalProviders || 0}</div>
        </div>
        <div className="adm-stat-card">
          <div className="adm-stat-label">Total Revenue</div>
          <div className="adm-stat-value">₹{stats?.revenue || 0}</div>
        </div>
        <div className="adm-stat-card">
          <div className="adm-stat-label">Total Bookings</div>
          <div className="adm-stat-value">{stats?.totalBookings || 0}</div>
        </div>
      </div>

      <div className="adm-dashboard-section">
        <h3>Manage Providers</h3>
        <div className="adm-table-wrapper">
          <table className="adm-admin-table">
            <thead>
              <tr>
                <th>Provider</th>
                <th>City</th>
                <th>Exp</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="adm-scrollable-tbody">
              {providers.map(p => (
                <tr key={p._id}>
                  <td>
                    <div className="adm-td-user">
                      <img src={`${BACKEND_URL}${p.profilePhoto?.replace(/\\/g, '/')}`} alt="" />
                      {p.fullName}
                    </div>
                  </td>
                  <td>{p.city}</td>
                  <td>{p.experience} Yrs</td>
                  <td>
                    <button className="adm-view-btn" onClick={() => setSelectedProvider(p)}>View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedProvider && (
        <div className="adm-admin-modal-overlay" onClick={() => setSelectedProvider(null)}>
          <div className="adm-admin-modal" onClick={e => e.stopPropagation()}>
            <button className="adm-close-modal" onClick={() => setSelectedProvider(null)}>&times;</button>
            <div className="adm-modal-content">
              <img 
                src={`${BACKEND_URL}${selectedProvider.profilePhoto?.replace(/\\/g, '/')}`} 
                className="adm-modal-img" 
                alt="Profile"
              />
              <h3>{selectedProvider.fullName}</h3>
              <p><strong>Email:</strong> {selectedProvider.email}</p>
              <p><strong>Phone:</strong> {selectedProvider.phone}</p>
              <p><strong>City:</strong> {selectedProvider.city || "Not provided"}</p>
              
              <div className="adm-modal-actions">
                <button className="adm-btn-approve" onClick={() => handleVerify(selectedProvider._id)}>Verify</button>
                <button className="adm-btn-reject" onClick={() => handleDelete(selectedProvider._id)}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default HeroAdmin;