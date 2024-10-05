import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
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
    </nav>
  );
};

export default Navbar;
