import { useState } from 'react'; // Importamos useState
import { handleLogout } from '../utils/auth.js';
import { Loader } from '../components/Loader/Loader.jsx';
import { useProductsCache } from '../context/ProductsCacheContext';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();

  const { products, loading } = useProductsCache();
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda

  const logout = async () => {
    const result = await handleLogout();
    if (result.success) {
      console.log(t('home.logoutSuccess'));
    } else {
      console.error(t('home.logoutError', { message: result.message }));
    }
  };

  // Filtramos los productos según el término de búsqueda
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container is-flex is-flex-direction-column is-justify-content-space-between" style={{ minHeight: '100vh' }}>
      <header className="my-5 has-text-centered">
        <h1 className="title">{t('home.title')}</h1>
      </header>

      <p className="subtitle has-text-centered mb-5">{t('home.subtitle')}</p>

      {/* Input de Búsqueda */}
      <div className="field has-addons mb-5">
        <div className="control is-expanded">
          <input
            type="text"
            className="input"
            placeholder={t('home.searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="control">
          <button className="button is-info">
            {t('home.searchButton')}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="is-flex is-justify-content-center is-align-items-center" style={{ height: '50vh' }}>
          <Loader message={t('home.loadingMessage')} />
        </div>
      ) : (
        <div className="columns is-multiline is-centered">
          {filteredProducts.map((product) => (
            <div key={product.id} className="column is-one-quarter">
              <div className="box has-text-centered">
                <img src={product.image || 'https://via.placeholder.com/150'} alt={product.title} className="image mb-3" />
                <h3 className="title is-5">{t('home.productTitle', { title: product.title })}</h3>
                <p>{t('home.productDescription', { description: product.description })}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <footer className="footer mt-5 has-text-centered" style={{ marginTop: 'auto' }}>
        <div className="content">
          <p>{t('home.footer')}</p>
        </div>
      </footer>
    </div>
  );
};

export { Home };
