import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import ContactForm from "../components/ContactForm";
import { fetchProducts } from "../services/products";
import "../styles/Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = [
    "Electrónica",
    "Ropa y accesorios",
    "Hogar y cocina",
    "Deportes y fitness",
    "Juguetes y juegos",
    "Libros y música",
    "Otros",
  ];

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
      setFilteredProducts(data);
    };
    getProducts();
  }, []);

  const handleCategoryFilter = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    if (category === "") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((p) => p.category === category));
    }
  };

  return (
    <div className="home-container">
      <h1 className="title">Lista de Productos</h1>

      {/* Filtro de categorías */}
      <select
        value={selectedCategory}
        onChange={handleCategoryFilter}
        className="form-input category-filter"
        style={{ width: "200px" }}
      >
        <option value="">Todas las categorías</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <div className="product-list">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="contact-section">
        <ContactForm />
      </div>
    </div>
  );
};

export default Home;
