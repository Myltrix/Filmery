import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import MovieForm from '../components/MovieForm';
import { moviesAPI } from '../utils/api';
import '../styles/AddMovie.css';

const AddMovie = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      await moviesAPI.create(formData);
      navigate('/movies');
    } catch (error) {
      console.error('Error creating movie:', error);
      alert('Failed to create movie');
    }
  };

  return (
    <div className="form-page">
      <main className="main-content">
        
        <div className="movie-static-container">
          
          <div className="form-side">
            <MovieForm 
              onSubmit={handleSubmit}
              buttonText="Add Movie"
            />
          </div>

          <div className="info-side">
            <div className="info-logo-wrapper">
              <img src="/Filmery.png" alt="Filmery Logo" className="navbar-logo-img" />
              <span className="navbar-logo-text">Filmery</span>
            </div>
            <p>Your personal movie tracking companion. Fill in the details to add a new title to your watchlist.</p>
            
            <Link to="/movies" className="transparent-btn">
              Back to Watchlist
            </Link>
          </div>

        </div>

      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <img src="/Filmery.png" alt="Watchlist Logo" className="footer-logo-img" />
              <h3>Filmery</h3>
            </div>
            <p>Your personal movie tracking companion. Never forget a great film again.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/movies">My Watchlist</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Features</h4>
            <ul>
              <li>Track Movies</li>
              <li>Rate & Review</li>
              <li>Statistics</li>
              <li>Private Lists</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Movie Watchlist. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AddMovie;