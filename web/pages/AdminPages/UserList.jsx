// // import React, { useState, useEffect } from 'react';
// // import './UserList.css';
// // import { useToast } from '../../components/ui/Toast';
// // import { useNavigate } from 'react-router-dom';
// // import Sidebar from '../../components/Navigation/sidebarAdmin';
// // import { AdminLayout } from '../../layouts/adminLayout';
// // const UserList = () => {
// //   const [users, setUsers] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const toast = useToast();
// //   const navigate = useNavigate();
// //   const BACKEND_URL = "http://localhost:5000/";

// //   const fetchUsers = async () => {
// //     try {
// //       const res = await fetch(`${BACKEND_URL}api/admin/all-users`);
// //       const data = await res.json();
// //       setUsers(data);
// //     } catch (err) {
// //       toast("Error fetching users", "error");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchUsers();
// //   }, []);

// //   return (
// //     <AdminLayout>
// //     <main className="main-content">
//       // <div className="dashboard-header">
//       //   <h2>User Management</h2>
//       //   <p className="subtitle">All registered Customers and Providers</p>
//       // </div>

// //       <div className="table-wrapper">
// //         <table className="admin-table">
// //           <thead>
// //             <tr>
// //               <th>User</th>
// //               <th>Role</th>
// //               <th>Email</th>
// //               <th>City</th>
// //               <th>Action</th>
// //             </tr>
// //           </thead>
// //           <tbody className="scrollable-tbody">
// //             {users.map((user) => (
// //               <tr key={user._id}>
// //                 <td>
// //                   <div className="td-user">
// //                     <img 
// //                       src={user.profilePhoto ? `${BACKEND_URL}${user.profilePhoto.replace(/\\/g, '/')}` : '/default-avatar.png'} 
// //                       alt="avatar" 
// //                     />
// //                     <span>{user.fullName}</span>
// //                   </div>
// //                 </td>
// //                 <td>
// //                   <span className={`role-badge ${user.role}`}>
// //                     {user.role}
// //                   </span>
// //                 </td>
// //                 <td>{user.email}</td>
// //                 <td>{user.city || "N/A"}</td>
// //                 <td>
// //                   {/* ONLY SHOW VIEW BUTTON FOR PROVIDERS */}
// //                   {user.role === 'provider' ? (
// //                     <button 
// //                       className="view-btn" 
// //                       onClick={() => navigate(`/admin/provider/${user._id}`)}
// //                     >
// //                       View Profile
// //                     </button>
// //                   ) : (
// //                     <span className="no-action">-</span>
// //                   )}
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </main>
// //     </AdminLayout>
// //   );
// // };

// // export default UserList;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useToast } from '../../components/ui/Toast';
// import { AdminLayout } from '../../layouts/adminLayout';
// import './UserList.css';

// const UserManagement = () => {
//     const [users, setUsers] = useState([]);
//     const [providers, setProviders] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();
//     const toast = useToast();
//     const BACKEND_URL = "http://localhost:5000/";

//     const fetchData = async () => {
//         try {
//             const [uRes, pRes] = await Promise.all([
//                 fetch(`${BACKEND_URL}api/admin/users-list`),
//                 fetch(`${BACKEND_URL}api/admin/providers-list`)
//             ]);
//             const uData = await uRes.json();
//             const pData = await pRes.json();
//             setUsers(uData);
//             setProviders(pData);
//         } catch (err) {
//             toast("Failed to load data", "error");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => { fetchData(); }, []);

//     const renderUserRow = (user) => (
//         <tr key={user._id}>
//             <td>{user.fullName}</td>
//             <td><span className="badge customer">Customer</span></td>
//             <td>{user.email}</td>
//             <td>{user.city || 'N/A'}</td>
//             <td><span className="no-action">No Profile</span></td>
//         </tr>
//     );

//     const renderProviderRow = (prov) => (
//         <tr key={prov._id}>
//             <td>
//                 <div className="td-user">
//                     <img src={prov.profilePhoto ? `${BACKEND_URL}${prov.profilePhoto.replace(/\\/g, '/')}` : '/default.png'} alt="" />
//                     <span>{prov.fullName}</span>
//                 </div>
//             </td>
//             <td><span className="badge provider">Provider</span></td>
//             <td>{prov.email}</td>
//             <td>{prov.serviceType}</td>
//             <td>
//                 <button className="view-btn" onClick={() => navigate(`/admin/provider/${prov._id}`)}>
//                     View Portfolio
//                 </button>
//             </td>
//         </tr>
//     );

//     return (
//         <AdminLayout>
//             <main className="main-content">
//               <div className="dashboard-header">
//         <h2>User Management</h2>
//         <p className="subtitle">All registered Customers and Providers</p>
//       </div>
//                 <section>
//                     <div className="dashboard-header">
//                         <h2>Professional Providers</h2>
//                         <p className="subtitle">Manage verified and pending service providers</p>
//                     </div>
//                     <div className="table-wrapper">
//                         <table className="admin-table">
//                             <thead>
//                                 <tr><th>Name</th><th>Role</th><th>Email</th><th>Service</th><th>Action</th></tr>
//                             </thead>
//                             <tbody>{providers.map(renderProviderRow)}</tbody>
//                         </table>
//                     </div>
//                 </section>

//                 <section style={{ marginTop: '40px' }}>
//                     <div className="dashboard-header">
//                         <h2>Registered Customers</h2>
//                         <p className="subtitle">Standard user accounts</p>
//                     </div>
//                     <div className="table-wrapper">
//                         <table className="admin-table">
//                             <thead>
//                                 <tr><th>Name</th><th>Role</th><th>Email</th><th>City</th><th>Action</th></tr>
//                             </thead>
//                             <tbody>{users.map(renderUserRow)}</tbody>
//                         </table>
//                     </div>
//                 </section>
//             </main>
//         </AdminLayout>
//     );
// };

// export default UserManagement;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../components/ui/Toast';
import { AdminLayout } from '../../layouts/adminLayout';
import './UserList.css';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [providers, setProviders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const toast = useToast();
    const BACKEND_URL = "http://localhost:5000/";

    const fetchData = async () => {
        try {
            const [uRes, pRes] = await Promise.all([
                fetch(`${BACKEND_URL}api/admin/users-list`),
                fetch(`${BACKEND_URL}api/admin/providers-list`)
            ]);
            const uData = await uRes.json();
            const pData = await pRes.json();
            setUsers(uData);
            setProviders(pData);
        } catch (err) {
            toast("Failed to load data", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const renderUserRow = (user) => (
        <tr key={user._id}>
            <td>{user.fullName}</td>
            <td><span className="um-badge um-customer">Customer</span></td>
            <td>{user.email}</td>
            <td>{user.city || 'N/A'}</td>
            <td><span className="um-no-action">No Profile</span></td>
        </tr>
    );

    const renderProviderRow = (prov) => (
        <tr key={prov._id}>
            <td>
                <div className="um-td-user">
                    <img src={prov.profilePhoto ? `${BACKEND_URL}${prov.profilePhoto.replace(/\\/g, '/')}` : '/default.png'} alt="" />
                    <span>{prov.fullName}</span>
                </div>
            </td>
            <td><span className="um-badge um-provider">Provider</span></td>
            <td>{prov.email}</td>
           <td>
              <div className="um-badge-um-service">
                {prov.services.map((service, index) => (
                  <span key={index} className="service-tag">
                    {service}
                  </span>
                ))}
              </div>
            </td>
            <td>
                <button className="um-view-btn" onClick={() => navigate(`/admin/provider/${prov._id}`)}>
                    View Portfolio
                </button>
            </td>
        </tr>
    );

    return (
        <AdminLayout>
            <main className="um-main-content">
                <div className="um-dashboard-header">
                    <h2>User Management</h2>
                    <p className="um-subtitle">All registered Customers and Providers</p>
                </div>
                
                <section>
                    <div className="um-dashboard-header">
                        <h2>Professional Providers</h2>
                        <p className="um-subtitle">Manage verified and pending service providers</p>
                    </div>
                    <div className="um-table-wrapper">
                        <table className="um-admin-table">
                            <thead>
                                <tr><th>Name</th><th>Role</th><th>Email</th><th>Service</th><th>Action</th></tr>
                            </thead>
                            <tbody>{providers.map(renderProviderRow)}</tbody>
                        </table>
                    </div>
                </section>

                <section style={{ marginTop: '40px' }}>
                    <div className="um-dashboard-header">
                        <h2>Registered Customers</h2>
                        <p className="um-subtitle">Standard user accounts</p>
                    </div>
                    <div className="um-table-wrapper">
                        <table className="um-admin-table">
                            <thead>
                                <tr><th>Name</th><th>Role</th><th>Email</th><th>City</th><th>Action</th></tr>
                            </thead>
                            <tbody>{users.map(renderUserRow)}</tbody>
                        </table>
                    </div>
                </section>
            </main>
        </AdminLayout>
    );
};

export default UserManagement;