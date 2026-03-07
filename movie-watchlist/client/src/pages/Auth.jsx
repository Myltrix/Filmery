import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../utils/api';
import '../styles/Auth.css';

const Auth = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.login(loginData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify({
        _id: response.data._id,
        username: response.data.username,
        email: response.data.email
      }));
      navigate('/movies');
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.register(registerData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify({
        _id: response.data._id,
        username: response.data.username,
        email: response.data.email
      }));
      navigate('/movies');
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-body">
      <div className="auth-main">
        <div className={`container ${isActive ? 'active' : ''}`}>
          <div className="form-box login">
            <form onSubmit={handleLogin}>
              <h1>Login</h1>
              {error && <div className="error-message">{error}</div>}
              <div className="input-box">
                <input 
                  type="text" 
                  name="email"
                  placeholder="Username" 
                  value={loginData.email}
                  onChange={handleLoginChange}
                  required 
                />
                <i className='bx bxs-user'></i>
              </div>
              <div className="input-box">
                <input 
                  type="password" 
                  name="password"
                  placeholder="Password" 
                  value={loginData.password}
                  onChange={handleLoginChange}
                  required 
                />
                <i className='bx bxs-lock-alt'></i>
              </div>
              <button type="submit" className="btn" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </div>

          <div className="form-box register">
            <form onSubmit={handleRegister}>
              <h1>Registration</h1>
              {error && <div className="error-message">{error}</div>}
              <div className="input-box">
                <input 
                  type="text" 
                  name="username"
                  placeholder="Username" 
                  value={registerData.username}
                  onChange={handleRegisterChange}
                  required 
                />
                <i className='bx bxs-user'></i>
              </div>
              <div className="input-box">
                <input 
                  type="email" 
                  name="email"
                  placeholder="Email" 
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  required 
                />
                <i className='bx bxs-envelope'></i>
              </div>
              <div className="input-box">
                <input 
                  type="password" 
                  name="password"
                  placeholder="Password" 
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  required 
                />
                <i className='bx bxs-lock-alt'></i>
              </div>
              <button type="submit" className="btn" disabled={loading}>
                {loading ? 'Registering...' : 'Register'}
              </button>
            </form>
          </div>

          <div className="toggle-box">
            <div className="toggle-panel toggle-left">
              <h1>Hello, Welcome!</h1>
              <p>Don't have an account?</p>
              <button className="btn register-btn" onClick={() => setIsActive(true)}>
                Register
              </button>
            </div>

            <div className="toggle-panel toggle-right">
              <h1>Welcome Back!</h1>
              <p>Already have an account?</p>
              <button className="btn login-btn" onClick={() => setIsActive(false)}>
                Login
              </button>
            </div>
          </div>
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

export default Auth;