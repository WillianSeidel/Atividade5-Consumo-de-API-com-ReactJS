import React from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../services/tmdb';
import './MovieCard.css';

const MovieCard = ({ movie, isFavorite, onToggleFavorite }) => {
  const posterUrl = getImageUrl(movie.poster_path);

  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`} className="movie-link">
        <div className="movie-poster">
          {posterUrl ? (
            <img src={posterUrl} alt={movie.title} />
          ) : (
            <div className="no-poster">Sem imagem</div>
          )}
        </div>
        <div className="movie-info">
          <h3 className="movie-title">{movie.title}</h3>
          <p className="movie-year">
            {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
          </p>
        </div>
      </Link>
      <button
        className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
        onClick={() => onToggleFavorite(movie)}
      >
        {isFavorite ? '❤️' : '🤍'}
      </button>
    </div>
  );
};

export default MovieCard;