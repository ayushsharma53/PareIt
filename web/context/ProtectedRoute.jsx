import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Ensure correct import

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    console.log("Decoded User:", decoded); // DEBUG: Check if 'role' is here

    // Check if the role exists and is allowed
    if (allowedRoles && !allowedRoles.includes(decoded.role)) {
      return <Navigate to="/unauthorized" replace />;
    }

    return children;
  } catch (error) {
    console.error("Token invalid:", error);
    localStorage.removeItem('token');
    return <Navigate to="/auth" replace />;
  }
};

export default ProtectedRoute;