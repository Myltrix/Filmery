import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import MovieForm from '../components/MovieForm';
import { moviesAPI } from '../utils/api';
import '../styles/EditMovie.css';

const EditMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await moviesAPI.getById(id);
        setMovie(response.data);
      } catch (error) {
        setError('Failed to load movie');
        console.error('Error fetching movie:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      await moviesAPI.update(id, formData);
      navigate('/movies');
    } catch (error) {
      console.error('Error updating movie:', error);
      alert('Failed to update movie');
    }
  };

  if (loading) {
    return (
      <div className="form-page loading-page">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="form-page error-page">
        <div className="error-message">{error}</div>
        <Link to="/movies" className="btn transparent-btn error-btn">
          Back to Watchlist
        </Link>
      </div>
    );
  }

  return (
    <div className="form-page">
      <main className="main-content">
        <div className="movie-static-container">
          <div className="form-side">
            <MovieForm
              initialData={movie}
              onSubmit={handleSubmit}
              buttonText="Update Movie"
            />
          </div>

          <div className="info-side">
            <div className="info-logo-wrapper">
              <img src="/Filmery.png" alt="Filmery Logo" className="navbar-logo-img" />
              <span className="navbar-logo-text">Filmery</span>
            </div>
            <p>Your personal movie tracking companion. Fill in the details to update your title in the watchlist.</p>
            <Link to="/movies" className="btn transparent-btn">
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

export default EditMovie;
