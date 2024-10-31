// src/components/Header/Header.jsx
import React, { useState } from 'react';

const Header = ({ toggleTheme }) => {
  const [isDarkMode, setIsDarkMode] = useState(document.body.classList.contains('has-background-dark'));

  const handleToggleTheme = () => {
    toggleTheme(); // Cambia el tema
    setIsDarkMode(!isDarkMode); // Actualiza el ícono manualmente después del cambio
  };

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          Gestor de Recetas
        </a>
      </div>
      <div className="navbar-menu">
        <div className="navbar-end">
          <button
            className={`button is-rounded ${isDarkMode ? 'is-light' : 'is-dark'} my-1 mx-3`}
            onClick={handleToggleTheme}
          >
            {isDarkMode ? '🌞' : '🌚'}
          </button>
        </div>
      </div>
    </header >
  );
};

export default Header;
