// src/components/Header/Header.jsx
import React, { useState } from 'react';
import { handleLogout } from '../../utils/auth.js';
import { useAuth } from './../../context/AuthContext'; // Importa el contexto de autenticación
import { Link } from 'react-router-dom';

const Header = ({ toggleTheme }) => {
  const { currentUser } = useAuth(); // Obtiene el usuario actual del contexto
  const [isDarkMode, setIsDarkMode] = useState(document.body.classList.contains('has-background-dark'));

  const handleToggleTheme = () => {
    toggleTheme(); // Cambia el tema
    setIsDarkMode(!isDarkMode); // Actualiza el ícono manualmente después del cambio
  };

  const logout = async () => {
    const result = await handleLogout();
    if (result.success) {
      console.log('Logout successful');
    } else {
      console.error('Error signing out:', result.message);
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          Gestor de Recetas
        </a>
      </div>
      <div className="navbar-menu">
        <div className="navbar-end is-flex is-align-items-center">
          <button
            className={`button is-rounded ${isDarkMode ? 'is-light' : 'is-dark'} my-1 mx-3`}
            onClick={handleToggleTheme}
          >
            {isDarkMode ? '🌞' : '🌚'}
          </button>
          <LoginButton currentUser={currentUser} logout={logout} />
        </div>
      </div>
    </header>
  );
};

const LoginButton = ({ currentUser, logout }) => {

  if (currentUser) {
    return (
      <>
        <span className="navbar-item">{currentUser.displayName || currentUser.email || 'Usuario'}</span>
        <button className="button is-danger mx-3" onClick={logout}>Logout</button>
      </>
    );
  } else {
    return (
      <Link to="/login" className="button is-primary mx-3">Login</Link>
    );
  }
}

export default Header;
