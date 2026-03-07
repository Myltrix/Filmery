import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const token = localStorage.getItem('token');

  return (
    <div className="home-body">
      <div className="home-container">
        <section className="hero-section">
          <div className="hero-card">
            <h1 className="hero-title">
              Your Personal <span className="highlight">Movie Watchlist</span>
            </h1>
            <p className="hero-subtitle">
              Track, rate, and organize all the movies you want to watch in one place. Easily manage your personal watchlist and keep track of films you’ve already seen. Discover and remember great movies so you never miss or forget a film you wanted to watch.
            </p>
            <div className="hero-buttons">
              {token ? (
                <Link to="/movies" className="btn btn-primary">
                  Go to My Watchlist
                </Link>
              ) : (
                <>
                  <Link to="/register" className="btn btn-primary">
                    Get Started Free
                  </Link>
                  <Link to="/login" className="btn btn-secondary">
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        </section>

        <section className="features-section">
          <h2 className="section-title">Why Choose <span className="highlight">Movie Watchlist?</span></h2>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon"><i className='bx bx-movie-play'></i></div>
              <h3>Track Movies</h3>
              <p>Keep a complete list of movies you want to watch, are watching, or have already watched</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><i className='bx bx-star'></i></div>
              <h3>Rate & Review</h3>
              <p>Rate movies on a 10-point scale and write detailed reviews to remember your thoughts</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><i className='bx bx-bar-chart-alt-2'></i></div>
              <h3>View Statistics</h3>
              <p>See your watching habits with beautiful statistics and progress tracking</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><i className='bx bx-lock-alt'></i></div>
              <h3>Private & Secure</h3>
              <p>Your watchlist is completely private - only you can see and manage your movies</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><i className='bx bx-target-lock'></i></div>
              <h3>Organize by Status</h3>
              <p>Filter movies by status: Plan to Watch, Watching, or Watched for easy organization</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><i className='bx bx-globe'></i></div>
              <h3>Access Anywhere</h3>
              <p>Access your watchlist from any device, anytime - your data is always in the cloud</p>
            </div>
          </div>
        </section>

        <section className="how-it-works">
          <h2 className="section-title">How It <span className="highlight">Works?</span></h2>
          
          <div className="steps-container">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Create an Account</h3>
                <p>Sign up for free in less than a minute with just your email and password</p>
              </div>
            </div>

            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Add Movies</h3>
                <p>Start building your watchlist by adding movies with title, director, and more</p>
              </div>
            </div>

            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Track Progress</h3>
                <p>Update status as you watch movies and keep track of your watching journey</p>
              </div>
            </div>

            <div className="step-card">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Rate & Review</h3>
                <p>Share your thoughts by rating movies and writing reviews for future reference</p>
              </div>
            </div>
          </div>
        </section>

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
    </div>
  );
};

export default Home;