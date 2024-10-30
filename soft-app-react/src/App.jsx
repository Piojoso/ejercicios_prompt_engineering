// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminProducts from "./pages/AdminProducts";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin-products"
          element={
            <PrivateRoute>
              <AdminProducts />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
