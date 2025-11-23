import React from 'react';
import { Navigate } from 'react-router-dom';

export default function RequireAuth({ children, allowedRoles = [] }) {
  const authStr = localStorage.getItem('auth');
  if (!authStr) return <Navigate to="/login" replace />;

  let auth;
  try {
    auth = JSON.parse(authStr);
  } catch (err) {
    return <Navigate to="/login" replace />;
  }

  if (!auth || !auth.token) return <Navigate to="/login" replace />;

  if (allowedRoles.length > 0) {
    const allowedLower = allowedRoles.map(r => r.toLowerCase());
    if (!allowedLower.includes((auth.role || '').toLowerCase())) {
      return <Navigate to="/not-authorized" replace />;
    }
  }

  return children;
}
