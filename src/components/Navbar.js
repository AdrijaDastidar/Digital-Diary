import React from "react";
import { Link } from "react-router-dom";
import logo from '../Assets/logo.png';

export default function Navbar(props) {
  return (
    <header className="navbar-header">
      <img src={logo} alt="Logo" className="logo" />
      <nav className="navigation">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact Us</Link>
      </nav>
    </header>
  );
}
