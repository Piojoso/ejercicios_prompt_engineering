import { useState } from 'react';
import { registerUser } from '../utils/auth.js'; // Importar la función de registro
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importar el contexto de autenticación
import { useTranslation } from 'react-i18next';

const Register = () => {
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { currentUser } = useAuth(); // Obtener el usuario actual del contexto

  const handleRegister = async (e) => {
    e.preventDefault();
    const result = await registerUser(email, password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError('Error during registration: ' + result.message);
    }
  };

  return (
    <section
      className="section"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <div className="container is-max-desktop">
        <div className="box" style={{ textAlign: 'center' }}>
          {currentUser ? (
            <div>
              <h1 className="title">{t('register.welcome', { name: currentUser.displayName || currentUser.email })}</h1>
              <p>{t('register.alreadyRegistered')}</p>
              <Link to="/dashboard" className="button is-primary mt-5">
                {t('register.goToDashboard')}
              </Link>
            </div>
          ) : (
            <>
              <h1 className="title">{t('register.title')}</h1>
              <form onSubmit={handleRegister}>
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('register.emailPlaceholder')}
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={t('register.passwordPlaceholder')}
                      required
                    />
                  </div>
                </div>
                <button className="button is-primary" type="submit">
                  {t('register.registerButton')}
                </button>
              </form>
              <div className="my-4">
                <Link to="/login">{t('register.loginLink')}</Link>
              </div>
              {error && <p className="has-text-danger">{t('register.errorMessage', { message: error })}</p>}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export { Register };
