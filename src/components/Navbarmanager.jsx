import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/Navbarmanager.css';

const Navbarmanager = () => {
  const [user, setUser] = useState({ username: 'User' }); 
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/'); 
  };

  return (
    <nav className="navbarmanager">
      <ul className="nav-links">
        <li>
          <NavLink to="/booking" className={({ isActive }) => (isActive ? 'active-link' : '')}>Booking Management</NavLink>
        </li>
        <li>
          <NavLink to="/rooms" className={({ isActive }) => (isActive ? 'active-link' : '')}>Room Management</NavLink>
        </li>
      </ul>

      <div className="user-info">
        {user ? (
          <>
            <span className="username">{user.username}</span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <NavLink to="/signin" className="login-link">Sign In</NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbarmanager;
