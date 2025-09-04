import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          🎬 Catálogo de Filmes
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">Início</Link>
          <Link to="/favorites" className="nav-link">Favoritos</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;