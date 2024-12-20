import { useEffect, useState } from "react";
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../services/products";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import "../styles/AdminProducts.css";

const AdminProducts = () => {
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

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    category: "",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
      setFilteredProducts(data);
    };
    getProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCategoryFilter = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    if (category === "") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((p) => p.category === category));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateProduct(editingId, form);
    } else {
      await addProduct(form);
    }
    setForm({
      name: "",
      description: "",
      price: "",
      imageUrl: "",
      category: "",
    });
    setEditingId(null);
    const data = await fetchProducts();
    setProducts(data);
    setFilteredProducts(data);
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl || "",
    });
    setEditingId(product.id);
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    const data = await fetchProducts();
    setProducts(data);
    setFilteredProducts(data);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = "/login"; // Redirige al login después de cerrar sesión
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div>
      <button onClick={handleLogout} className="btn-logout">
        Cerrar sesión
      </button>
      <div className="">
        <h1 className="title">Administrar Productos</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nombre del producto"
          required
        />
        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Descripción del producto"
          required
        />
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Precio del producto"
          required
        />
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="form-input"
        >
          <option value="">Seleccione una categoría</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          placeholder="URL de la imagen"
          required
        />
        <button type="submit">{editingId ? "Actualizar" : "Agregar"}</button>
      </form>

      <select
        value={selectedCategory}
        onChange={handleCategoryFilter}
        className="form-input category-filter"
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
          <div key={product.id} className="product-card">
            <div className="product-image">
              {product.imageUrl && (
                <img src={product.imageUrl} alt={product.name} />
              )}
            </div>
            <div className="product-info">
              <h2 className="product-name">{product.name}</h2>
              <p className="product-description">{product.description}</p>
              <p className="product-category">Categoría: {product.category}</p>
              <p className="product-price">Precio: ${product.price}</p>
            </div>
            <div className="product-actions">
              <button className="btn-edit" onClick={() => handleEdit(product)}>
                Editar
              </button>
              <button
                className="btn-delete"
                onClick={() => handleDelete(product.id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;
