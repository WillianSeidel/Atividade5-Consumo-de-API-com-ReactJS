import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import { getRandomMovies } from '../services/tmdb';
import './Home.css';

const Home = ({ onSearch, favorites, onToggleFavorite }) => {
  const [randomMovies, setRandomMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadRandomMovies = async () => {
    try {
      setLoading(true);
      const movies = await getRandomMovies(5);
      setRandomMovies(movies);
    } catch (error) {
      console.error('Erro ao carregar filmes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRandomMovies();
  }, []);

  return (
    <div className="home">
      <div className="hero">
        <h1>Descubra milhares de filmes</h1>
        <p>Pesquise, explore e salve seus filmes favoritos</p>
        <SearchBar onSearch={onSearch} />
      </div>

      <div className="random-movies">
        <div className="section-header">
          <h2>Filmes em Destaque</h2>
          <button 
            onClick={loadRandomMovies} 
            className="reload-btn"
            disabled={loading}
          >
            🔄 Ver outros
          </button>
        </div>
        
        {loading ? (
          <div className="loading">Carregando filmes...</div>
        ) : (
          <div className="movies-grid">
            {randomMovies.map(movie => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isFavorite={favorites.some(fav => fav.id === movie.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;