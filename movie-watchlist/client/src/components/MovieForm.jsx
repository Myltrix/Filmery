import React, { useState, useEffect, useRef } from 'react';
import '../styles/MovieForm.css';

const MovieForm = ({ initialData = {}, onSubmit, buttonText }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    director: initialData.director || '',
    year: initialData.year || '',
    genre: initialData.genre || '',
    rating: initialData.rating || '',
    status: initialData.status || '',
    review: initialData.review || '',
    posterUrl: initialData.posterUrl || ''
  });

  const [openDropdown, setOpenDropdown] = useState(null);
  const formRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCustomSelect = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    setOpenDropdown(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Romance', 'Thriller', 'Documentary', 'Animation', 'Other'];
  const statuses = ['plan to watch', 'watching', 'watched'];

  return (
    <form className="movie-auth-form" onSubmit={handleSubmit} ref={formRef}>
      <h1>{buttonText === 'Add Movie' ? 'Add New Movie' : 'Edit Movie'}</h1>
      
      <div className="input-box">
        <input
          type="text"
          name="title"
          placeholder="Movie Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <i className='bx bx-camera-movie'></i>
      </div>

      <div className="input-row">
        <div className="input-box">
          <input
            type="text"
            name="director"
            placeholder="Director"
            value={formData.director}
            onChange={handleChange}
          />
          <i className='bx bx-user'></i>
        </div>

        <div className="input-box">
          <input
            type="number"
            name="year"
            placeholder="Year"
            min="1888"
            max={new Date().getFullYear() + 5}
            value={formData.year}
            onChange={handleChange}
          />
          <i className='bx bx-calendar'></i>
        </div>
      </div>

      <div className="input-row">
        <div className="input-box custom-select-container">
          <div 
            className={`custom-select ${formData.genre ? 'selected' : ''}`}
            onClick={() => setOpenDropdown(openDropdown === 'genre' ? null : 'genre')}
          >
            {formData.genre || 'Select Genre'}
          </div>
          <i className={`bx bx-chevron-down ${openDropdown === 'genre' ? 'rotated' : ''}`}></i>
          
          {openDropdown === 'genre' && (
            <ul className="select-dropdown">
              {genres.map(genre => (
                <li key={genre} onClick={() => handleCustomSelect('genre', genre)}>
                  {genre}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="input-box custom-select-container">
          <div 
            className={`custom-select ${formData.status ? 'selected' : ''}`}
            onClick={() => setOpenDropdown(openDropdown === 'status' ? null : 'status')}
          >
            {formData.status || 'Select Status'}
          </div>
          <i className={`bx bx-chevron-down ${openDropdown === 'status' ? 'rotated' : ''}`}></i>

          {openDropdown === 'status' && (
            <ul className="select-dropdown">
              {statuses.map(status => (
                <li key={status} onClick={() => handleCustomSelect('status', status)}>
                  {status}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="input-row">
        <div className="input-box">
          <input
            type="number"
            name="rating"
            placeholder="Rating (0-10)"
            min="0"
            max="10"
            step="0.1"
            value={formData.rating}
            onChange={handleChange}
          />
          <i className='bx bx-star'></i>
        </div>

        <div className="input-box">
          <input
            type="url"
            name="posterUrl"
            placeholder="Poster URL"
            value={formData.posterUrl}
            onChange={handleChange}
          />
          <i className='bx bx-image'></i>
        </div>
      </div>

      <div className="input-box">
        <textarea
          name="review"
          placeholder="Write your review here..."
          rows="2"
          value={formData.review}
          onChange={handleChange}
        />
        <i className='bx bx-edit-alt'></i>
      </div>

      <button type="submit" className="btn">
        {buttonText || 'Save Movie'}
      </button>
    </form>
  );
};

export default MovieForm;