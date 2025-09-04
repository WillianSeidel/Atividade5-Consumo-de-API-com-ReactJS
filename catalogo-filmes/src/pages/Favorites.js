import React from 'react';
import MovieCard from '../components/MovieCard';
import './Favorites.css';

const Favorites = ({ favorites, onToggleFavorite }) => {
  return (
    <div className="favorites-page">
      <h2>Meus Filmes Favoritos</h2>
      
      {favorites.length > 0 ? (
        <div className="movies-grid">
          {favorites.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavorite={true}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="no-favorites">
          <p>Você ainda não tem filmes favoritos.</p>
          <p>Adicione alguns filmes à sua lista!</p>
        </div>
      )}
    </div>
  );
};

export default Favorites;