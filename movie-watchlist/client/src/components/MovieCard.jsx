import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { moviesAPI } from '../utils/api';
import '../styles/MovieCard.css';

const MovieCard = ({ movie, onDelete, isCommunity = false }) => {
  const navigate = useNavigate();
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loadingComments, setLoadingComments] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (!showCommentsModal) return;

    const loadComments = async () => {
      setLoadingComments(true);
      try {
        const response = await moviesAPI.getComments(movie._id);
        setComments(response.data || []);
      } catch (error) {
        console.error('Failed to load comments:', error);
        alert('Не удалось загрузить комментарии');
      } finally {
        setLoadingComments(false);
      }
    };

    loadComments();
  }, [showCommentsModal, movie._id]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await moviesAPI.delete(movie._id);
      if (onDelete) onDelete(movie._id);
      setShowDetailsModal(false);
    } catch (error) {
      console.error('Error deleting movie:', error);
      alert('Ошибка при удалении фильма');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || isSending) return;

    const commentText = newComment;
    setNewComment('');
    setIsSending(true);

    const tempComment = {
      _id: Date.now().toString(),
      user: { username: 'You' },
      text: commentText,
    };

    setComments((prev) => [...prev, tempComment]);

    try {
      const response = await moviesAPI.addComment(movie._id, { text: commentText });

      if (response?.data) {
        setComments((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = response.data;
          return updated;
        });
      }
    } catch (error) {
      console.error('Error adding comment to server:', error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <div className="movie-card">
        <div className="movie-poster">
          {movie.posterUrl ? (
            <img src={movie.posterUrl} alt={movie.title} />
          ) : (
            <div className="no-poster">🎬</div>
          )}
        </div>
        <div className="movie-info-short">
          <h3 className="movie-title">{movie.title}</h3>
          <div className="movie-card-buttons">
            <button
              onClick={() => setShowDetailsModal(true)}
              className="btn-details"
            >
              View Details
            </button>
            <button
              onClick={() => setShowCommentsModal(true)}
              className="btn-comments"
            >
              Comments
            </button>
          </div>
        </div>
      </div>

      {showDetailsModal && (
        <div
          className="details-modal-overlay"
          onClick={() => setShowDetailsModal(false)}
        >
          <div className="details-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-modal-btn"
              onClick={() => setShowDetailsModal(false)}
            >
              &times;
            </button>
            <div className="details-content">
              <div className="details-poster">
                {movie.posterUrl ? (
                  <img src={movie.posterUrl} alt={movie.title} />
                ) : (
                  <div className="no-poster">🎬</div>
                )}
              </div>
              <div className="details-info">
                <h2>{movie.title}</h2>
                <p className="movie-director">
                  <strong>Director:</strong> {movie.director || 'Unknown'}
                </p>
                <p className="movie-year">
                  <strong>Year:</strong> {movie.year || 'N/A'}
                </p>
                <div className="movie-tags">
                  <div className="movie-tag">{movie.genre}</div>
                  <div className="movie-tag">{movie.rating}/10</div>
                  <div className="movie-tag">{movie.status}</div>
                </div>
                {movie.review && (
                  <div className="movie-review-box">
                    <strong>Review:</strong>
                    <p>{movie.review}</p>
                  </div>
                )}
                {!isCommunity && (
                  <div className="movie-actions">
                    <button
                      onClick={() => navigate(`/movies/edit/${movie._id}`)}
                      className="btn-edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={handleDelete}
                      className="btn-delete"
                      disabled={isDeleting}
                    >
                      {isDeleting ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {showCommentsModal && (
        <div
          className="details-modal-overlay"
          onClick={() => setShowCommentsModal(false)}
        >
          <div className="comments-modal" onClick={(e) => e.stopPropagation()}>
            <div className="comments-header">
              <h2>Comments: {movie.title}</h2>
              <button
                className="close-modal-btn"
                onClick={() => setShowCommentsModal(false)}
              >
                &times;
              </button>
            </div>

            <div className="comments-list">
              {loadingComments ? (
                <div className="loading-comments">Loading comments...</div>
              ) : comments.length > 0 ? (
                comments.map((comment) => (
                  <div
                    key={comment._id || comment.id}
                    className="comment-item"
                  >
                    <div className="comment-user">
                      {comment.user?.username || comment.user || 'User'}
                    </div>
                    <div className="comment-text">{comment.text}</div>
                  </div>
                ))
              ) : (
                <div className="no-comments">
                  No comments yet. Be the first to share your thoughts!
                </div>
              )}
            </div>

            <form className="comment-input-area" onSubmit={handleAddComment}>
              <input
                type="text"
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                disabled={isSending}
              />
              <button
                type="submit"
                className="btn-send-comment"
                disabled={isSending || !newComment.trim()}
              >
                {isSending ? 'Sending...' : 'Send'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieCard;
