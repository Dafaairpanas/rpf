import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const location = useLocation();

  if (!token) {
    console.log('[ProtectedRoute] No token found, redirecting to login.');
    // Redirect ke login, tapi simpan lokasi asal agar bisa redirect balik nanti (opsional)
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
