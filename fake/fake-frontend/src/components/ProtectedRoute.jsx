import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase';

const ProtectedRoute = ({ children }) => {
  const user = auth.currentUser;

  if (!user) {
    alert("Please login before using the detector.");
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;
