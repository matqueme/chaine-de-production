import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClickProduct = (id) => {
    navigate(`/product/${id}`, { state: { background: location } });
  };

  return (
    <div
      className="product-card"
      onClick={() => handleClickProduct(product.id)}
    >
      <div className="nameInfo">
        <h2>{product.nom.toUpperCase()}</h2>
        <h3>{product.poids}</h3>
      </div>
      <img src={"/" + product.image} alt={product.nom} />
    </div>
  );
}

export default ProductCard;
