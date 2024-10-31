import { useState } from 'react';
import { emailLogin, googleLogin, handleLogout } from '../utils/auth.js';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    const result = await emailLogin(email, password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError('Error during login: ' + result.message);
    }
  };

  const handleGoogleLogin = async () => {
    const result = await googleLogin();
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError('Error during Google login: ' + result.message);
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
              <h1 className="title">{t('login.welcome', { name: currentUser.displayName || currentUser.email })}</h1>
              <p>{t('login.question')}</p>
              <div className="buttons is-flex is-justify-content-center mt-5">
                <button className="button is-primary" onClick={() => navigate('/dashboard')}>
                  {t('login.goToDashboard')}
                </button>
                <button className="button is-danger" onClick={handleLogout}>
                  {t('login.logout')}
                </button>
              </div>
            </div>
          ) : (
            <>
              <h1 className="title">{t('login.title')}</h1>
              <form onSubmit={handleEmailLogin}>
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('login.emailPlaceholder')}
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
                      placeholder={t('login.passwordPlaceholder')}
                      required
                    />
                  </div>
                </div>
                <button className="button is-primary" type="submit">
                  {t('login.loginWithEmailButton')}
                </button>
              </form>
              <div className="my-4">{t('login.orText')}</div>
              <button className="button is-danger" onClick={handleGoogleLogin}>
                {t('login.loginWithGoogleButton')}
              </button>
              <div className="my-4">
                <Link to="/register">{t('login.registerLink')}</Link>
              </div>
              {error && <p className="has-text-danger">{t('login.errorMessage', { message: error })}</p>}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export { Login };
