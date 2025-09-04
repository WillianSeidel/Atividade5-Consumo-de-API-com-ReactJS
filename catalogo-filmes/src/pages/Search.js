import React, { useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import './Search.css';

const Search = ({
  searchResults,
  currentPage,
  totalPages,
  onPageChange,
  loading,
  error,
  onRetry,
  favorites,
  onToggleFavorite
}) => {
  // Debug: verifique o que está recebendo
  useEffect(() => {
    console.log("Search Results:", searchResults);
    console.log("Loading:", loading);
    console.log("Error:", error);
  }, [searchResults, loading, error]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button onClick={onRetry}>Tentar novamente</button>
      </div>
    );
  }

  return (
    <div className="search-results">
      <h2>Resultados da busca</h2>
      
      {searchResults && searchResults.length > 0 ? (
        <>
          <div className="movies-grid">
            {searchResults.map(movie => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isFavorite={favorites.some(fav => fav.id === movie.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
          
          {totalPages > 1 && (
            <div className="pagination">
              <button 
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Anterior
              </button>
              
              <span>Página {currentPage} de {totalPages}</span>
              
              <button 
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Próxima
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="no-results">
          <p>Nenhum filme encontrado. Tente outra busca.</p>
        </div>
      )}
    </div>
  );
};

export default Search;