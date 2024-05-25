// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Goal Tracker</div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/SingUP">Signup</Link></li>
        <li><Link to="/Login">Login</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
