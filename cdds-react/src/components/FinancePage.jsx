import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function FinancePage() {
  const navigate = useNavigate();
  const auth = JSON.parse(sessionStorage.getItem('auth') || '{}');

  function logout() {
    sessionStorage.removeItem('auth');
    navigate('/login');
  }

  return (
    <div className="container">
      <h2>Finance Page</h2>
      <p>Welcome {auth.userId} (role: {auth.role})</p>
      <button className="btn btn-danger" onClick={logout}>Logout</button>
    </div>
  );
}
