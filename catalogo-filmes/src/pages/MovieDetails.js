import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails, getImageUrl } from '../services/tmdb';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import './MovieDetails.css';

const MovieDetails = ({ favorites, onToggleFavorite }) => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await getMovieDetails(id);
        setMovie(response.data);
        setError(null);
      } catch (err) {
        setError('Falha ao carregar detalhes do filme');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!movie) {
    return <div>Filme não encontrado</div>;
  }

  const isFavorite = favorites.some(fav => fav.id === movie.id);
  const posterUrl = getImageUrl(movie.poster_path);
  const backdropUrl = getImageUrl(movie.backdrop_path);
  const director = movie.credits.crew.find(person => person.job === 'Director');
  const cast = movie.credits.cast.slice(0, 10);

  return (
    <div className="movie-details">
      {backdropUrl && (
        <div className="movie-backdrop">
          <img src={backdropUrl} alt={movie.title} />
        </div>
      )}
      
      <div className="movie-content">
        <div className="movie-poster-detail">
          {posterUrl ? (
            <img src={posterUrl} alt={movie.title} />
          ) : (
            <div className="no-poster-detail">Sem imagem</div>
          )}
        </div>
        
        <div className="movie-info-detail">
          <h1>{movie.title}</h1>
          
          <div className="movie-meta">
            <span>{new Date(movie.release_date).getFullYear()}</span>
            <span>•</span>
            <span>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</span>
            <span>•</span>
            <span>{movie.genres.map(genre => genre.name).join(', ')}</span>
          </div>
          
          <div className="movie-actions">
            <button
              className={`favorite-btn-detail ${isFavorite ? 'favorited' : ''}`}
              onClick={() => onToggleFavorite(movie)}
            >
              {isFavorite ? '❤️ Remover dos Favoritos' : '🤍 Adicionar aos Favoritos'}
            </button>
          </div>
          
          <div className="movie-overview">
            <h3>Sinopse</h3>
            <p>{movie.overview || 'Sinopse não disponível.'}</p>
          </div>
          
          <div className="movie-rating">
            <h3>Avaliação</h3>
            <div className="rating-value">
              {movie.vote_average ? `${movie.vote_average.toFixed(1)}/10` : 'N/A'}
            </div>
          </div>
          
          {director && (
            <div className="movie-director">
              <h3>Diretor</h3>
              <p>{director.name}</p>
            </div>
          )}
          
          {cast.length > 0 && (
            <div className="movie-cast">
              <h3>Elenco Principal</h3>
              <div className="cast-list">
                {cast.map(actor => (
                  <div key={actor.id} className="cast-member">
                    {actor.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;