import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <img src="/Filmery.png" alt="Filmery Logo" className="navbar-logo-img" />
          <Link to="/" className="navbar-logo-text">
            Filmery
          </Link>
        </div>
        
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          {token ? (
            <>
              <Link to="/movies" className="nav-link">My Movies</Link>
              <Link to="/movies/add" className="nav-link">Add Movie</Link>
              <div className="nav-user-block">
                <span className="nav-user">Hello, {user?.username}</span>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <Link to="/login" className="nav-link login-special">Sign In</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;