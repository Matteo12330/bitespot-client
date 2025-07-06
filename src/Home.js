import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [favoritos, setFavoritos] = useState([]);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Obtener productos favoritos
    fetch("https://bitespot.onrender.com/api/ProductosApi/favoritos")
      .then((res) => res.json())
      .then((data) => setFavoritos(data))
      .catch((err) => console.error("❌ Error al cargar favoritos:", err));

    // Obtener todos los productos
    fetch("https://bitespot.onrender.com/api/ProductosApi/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("❌ Error al cargar todos los productos:", err));
  }, []);

  // Función para obtener imagen segura
  const getImagenSrc = (url) => {
    if (!url?.trim()) return "https://via.placeholder.com/300x200?text=Sin+imagen";
    return url.startsWith("http")
      ? url
      : `https://bitespot.onrender.com${url}`;
  };

  return (
    <div className="container">

      {/* 🔥 Favoritos */}
      <h1>🔥 Tendencias del momento</h1>
      {favoritos.length === 0 ? (
        <p>No hay productos favoritos disponibles.</p>
      ) : (
        <div className="producto-grid">
          {favoritos.map((producto) => (
            <div key={producto.id} className="card">
              <img src={getImagenSrc(producto.imagenUrl)} alt={producto.nombre} />
              <div className="card-body">
                <h2>{producto.nombre}</h2>
                <p>{producto.descripcion}</p>
                <p>⭐ {producto.promedioCalificacion}</p>
                <Link to={`/producto/${producto.id}`}>
                  <button className="boton">Ver Detalles</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 🍽️ Todos los productos */}
      <h2 style={{ marginTop: "3rem" }}>🍽️ Todos los productos</h2>
      {todos.length === 0 ? (
        <p>No hay productos registrados.</p>
      ) : (
        <div className="producto-grid">
          {todos.map((producto) => (
            <div key={producto.id} className="card">
              <img src={getImagenSrc(producto.imagenUrl)} alt={producto.nombre} />
              <div className="card-body">
                <h2>{producto.nombre}</h2>
                <p>${producto.precio?.toFixed(2)}</p>
                <Link to={`/producto/${producto.id}`}>
                  <button className="boton">Ver Detalles</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
