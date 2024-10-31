import React, { useState } from 'react';
import { handleLogout } from '../../utils/auth.js';
import { useAuth } from './../../context/AuthContext';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n'; // Importamos i18n para acceder a las funciones de cambio de idioma

const Header = ({ toggleTheme }) => {
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(document.body.classList.contains('has-background-dark'));

  const handleToggleTheme = () => {
    toggleTheme();
    setIsDarkMode(!isDarkMode);
  };

  // Función para cambiar el idioma
  const handleLanguageToggle = () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
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
          {t('header.title')}
        </a>
      </div>
      <div className="navbar-menu">
        <div className="navbar-end is-flex is-align-items-center">
          {/* Botón de cambio de idioma */}
          <button
            className="button is-info is-rounded mx-3"
            onClick={handleLanguageToggle}
          >
            {i18n.language === 'en' ? 'ES' : 'EN'}
          </button>

          {/* Botón de cambio de tema */}
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
  const { t } = useTranslation();

  if (currentUser) {
    return (
      <>
        <span className="navbar-item">{currentUser.displayName || currentUser.email || 'Usuario'}</span>
        <button className="button is-danger mx-3" onClick={logout}>{t('header.button.logout')}</button>
      </>
    );
  } else {
    return (
      <Link to="/login" className="button is-primary mx-3">{t('header.button.login')}</Link>
    );
  }
}

export default Header;
