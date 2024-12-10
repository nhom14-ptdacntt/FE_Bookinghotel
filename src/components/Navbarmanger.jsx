import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/Navbarmanager.css';

const Navbarmanager = () => {
  const [user, setUser] = useState({ username: 'Admin' });
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token")
    navigate('/signin');
  };

  return (
    <nav className="navbarmanager">
      <ul className="nav-links">
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active-link' : '')}>Home</NavLink>
        </li>
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
