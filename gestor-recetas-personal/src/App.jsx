import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { AuthProvider } from './context/AuthContext';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { ProductsCacheProvider } from './context/ProductsCacheContext';

import Header from './components/Header/Header';

import './i18n'; // Asegúrate de que se ejecute en la carga inicial

const App = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div data-theme={theme}>
      <AuthProvider>
        <Router>
          <Header toggleTheme={toggleTheme} />
          <ProductsCacheProvider>
            <Routes>
              {/* Rutas públicas */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Rutas privadas */}
              <Route path="/dashboard" element={
                <PrivateRoute url={"/login"}>
                  <Dashboard />
                </PrivateRoute>
              } />
            </Routes>
          </ProductsCacheProvider>
        </Router>
      </AuthProvider>
    </div>
  );
};

export { App };
