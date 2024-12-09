import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Header.css";

function Header({ username, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/signin');
  };

  return (
    <div className="header">
      <h2>Hotel Management System</h2>
      <div className="user-info">
        {username && (
          <>
            <span>Welcome, {username}!</span>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
