import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Search from './pages/Search';
import MovieDetails from './pages/MovieDetails';
import Favorites from './pages/Favorites';
import { searchMovies } from './services/tmdb';
import './App.css';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedFavorites = localStorage.getItem('movieFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('movieFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleSearch = async (query, page = 1) => {
    if (!query.trim()) return;
    
    try {
      setLoading(true);
      setError(null);
      setSearchQuery(query);
      
      const response = await searchMovies(query, page);
      setSearchResults(response.data.results);
      setCurrentPage(page);
      setTotalPages(response.data.total_pages);
      
      navigate('/search');
    } catch (err) {
      setError('Falha ao buscar filmes. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    handleSearch(searchQuery, page);
  };

  const handleRetry = () => {
    handleSearch(searchQuery, currentPage);
  };

  const handleToggleFavorite = (movie) => {
    const isFavorite = favorites.some(fav => fav.id === movie.id);
    
    if (isFavorite) {
      setFavorites(favorites.filter(fav => fav.id !== movie.id));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                onSearch={handleSearch} 
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
              />
            } 
          />
          <Route 
            path="/search" 
            element={
              <Search 
                searchResults={searchResults}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                loading={loading}
                error={error}
                onRetry={handleRetry}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
              />
            } 
          />
          <Route 
            path="/movie/:id" 
            element={
              <MovieDetails 
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
              />
            } 
          />
          <Route 
            path="/favorites" 
            element={
              <Favorites 
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
              />
            } 
          />
        </Routes>
      </main>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}