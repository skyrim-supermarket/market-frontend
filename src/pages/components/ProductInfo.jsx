// src/components/ProductInfo.js
import React from 'react';
import './styles/ProductInfo.css';

function ProductInfo({ product }) {
  if (!product) return null;

  return (
    <div id="product-info" className="product-info">
      <h3>{product.name}</h3>
      <img src={product.image} alt={product.name} />
      <p>Preço: {product.price}</p>
      <p>ID: {product.id} selecionado</p>
      {/* mais info aqui se precisar kk*/}
    </div>
  );
}

export default ProductInfo;