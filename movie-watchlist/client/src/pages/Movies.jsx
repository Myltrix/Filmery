import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { moviesAPI } from '../utils/api';
import '../styles/Movies.css';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [communityMovies, setCommunityMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  const statuses = [
    { value: 'all', label: 'All Movies' },
    { value: 'watched', label: 'Watched' },
    { value: 'watching', label: 'Watching' },
    { value: 'plan to watch', label: 'Plan to Watch' }
  ];

  useEffect(() => {
    fetchMovies();
    fetchCommunityMovies();
    
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [location.key]);

  const fetchMovies = async () => {
    try {
      const response = await moviesAPI.getAll();
      setMovies(response.data);
      setError('');
    } catch (error) {
      setError('Failed to load movies');
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCommunityMovies = async () => {
    try {
      const response = await moviesAPI.getCommunityMovies();
      setCommunityMovies(response.data);
    } catch (error) {
      console.error('Error fetching community movies:', error);
    }
  };

  const handleDelete = (movieId) => {
    setMovies(prev => prev.filter(movie => movie._id !== movieId));
    fetchCommunityMovies();
  };

  const handleStatusSelect = (statusValue) => {
    setFilter(statusValue);
    setIsDropdownOpen(false);
  };

  const filteredMovies = movies
    .filter(movie => filter === 'all' || movie.status === filter)
    .filter(movie => movie.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const stats = {
    total: movies.length,
    watched: movies.filter(m => m.status === 'watched').length,
    watching: movies.filter(m => m.status === 'watching').length,
    plan: movies.filter(m => m.status === 'plan to watch').length
  };

  if (loading && movies.length === 0 && communityMovies.length === 0) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="movies-page">
      <div className="movies-container">
        <div className="movies-header">
          <h1 className="section-title">
            My <span className="highlight">Movie Watchlist</span>
          </h1>

          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-value">{stats.total}</div>
              <div className="stat-label"><h3>Total</h3></div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{stats.watched}</div>
              <div className="stat-label"><h3>Watched</h3></div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{stats.watching}</div>
              <div className="stat-label"><h3>Watching</h3></div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{stats.plan}</div>
              <div className="stat-label"><h3>Plan</h3></div>
            </div>
          </div>

          <div className="search-filter-wrapper">
            <div className="search-filter-container">
              
              <div className="input-box">
                <input
                  type="text"
                  placeholder="Search by title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <i className='bx bx-search'></i>
              </div>

              <div className="input-box custom-select-container" ref={dropdownRef}>
                <div 
                  className={`custom-select ${filter !== 'all' ? 'selected' : ''}`} 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {statuses.find(s => s.value === filter)?.label}
                </div>
                <i className={`bx ${isDropdownOpen ? 'bx-chevron-up' : 'bx-chevron-down'}`}></i>
                
                {isDropdownOpen && (
                  <ul className="select-dropdown">
                    {statuses.map((s) => (
                      <li key={s.value} onClick={() => handleStatusSelect(s.value)}>
                        {s.label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

            </div>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        {filteredMovies.length === 0 ? (
          <div className="no-movies-image">
            <img src="/No movies found.png" alt="No movies found" className="empty-state-image" />
            <Link to="/movies/add" className="btn-primary add-movie-btn">
              Add Your First Movie
            </Link>
          </div>
        ) : (
          <div className="movies-grid">
            {filteredMovies.map(movie => (
              <MovieCard 
                key={movie._id} 
                movie={movie} 
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        <div className="community-watchlist-section">
          <h2 className="section-title">
            Community <span className="highlight">Watchlist</span>
          </h2>
          
          {communityMovies.length === 0 ? (
            <div className="no-movies-image">
              <img src="/No movies found.png" alt="No community movies" className="empty-state-image" />
              <Link to="/movies/add" className="btn-primary add-movie-btn">
                Add Your First Movie
              </Link>
            </div>
          ) : (
            <div className="movies-grid">
              {communityMovies.map(movie => (
                <MovieCard 
                  key={movie._id} 
                  movie={movie} 
                  isCommunity={true}
                />
              ))}
            </div>
          )}
        </div>

      </div>

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

export default Movies;