import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../providers/auth';

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true)
  }, [setMounted]);

  if (!token && mounted) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;