function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="nameInfo">
        <h2>{product.nom.toUpperCase()}</h2>
        <h3>{product.poids}</h3>
      </div>
      <img src={product.image} alt={product.nom} />
    </div>
  );
}

export default ProductCard;
