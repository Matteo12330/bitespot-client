import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function DetalleProducto() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch("https://bitespot.onrender.com/api/ProductosApi/todos")
      .then((res) => res.json())
      .then((data) => {
        const encontrado = data.find((p) => p.id === parseInt(id));
        if (encontrado) {
          setProducto(encontrado);
        } else {
          setNotFound(true);
        }
      })
      .catch((error) => {
        console.error("❌ Error al cargar los productos:", error);
        setNotFound(true);
      });
  }, [id]);

  if (notFound) {
    return (
      <div style={{ padding: "2rem", color: "red", fontWeight: "bold" }}>
        ❌ Producto no encontrado
      </div>
    );
  }

  if (!producto) {
    return <p style={{ padding: "2rem" }}>⏳ Cargando producto...</p>;
  }

  const imagenSrc = producto.imagenUrl?.trim()
    ? producto.imagenUrl.startsWith("http")
      ? producto.imagenUrl
      : `https://bitespot.onrender.com${producto.imagenUrl}`
    : "https://via.placeholder.com/300x200?text=Sin+imagen";

  return (
    <div className="container">
      <h1>{producto.nombre}</h1>
      <img
        src={imagenSrc}
        alt={producto.nombre}
        style={{ maxWidth: "500px", borderRadius: "10px" }}
      />
      <p><strong>Descripción:</strong> {producto.descripcion}</p>
      <p><strong>Precio:</strong> ${producto.precio}</p>
      <p><strong>Calificación:</strong> ⭐ {producto.promedioCalificacion}</p>
    </div>
  );
}

export default DetalleProducto;
