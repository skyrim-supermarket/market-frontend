// src/components/ProductItem.js
import React from 'react';
import '../styles/ProductList.css'; // Reutiliza o CSS da lista

function ProductItem({ product, onSelect, isSelected }) {
  const handleClick = () => {
    onSelect(product);
  };

  return (
    <div
      id={product.id}
      className={`product-item ${isSelected ? 'selected' : ''}`}
      onClick={handleClick}
    >
      <div className="product-item-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-item-name">
        <span className="product-item-name-text">{product.name}</span>
      </div>
      <div className="product-item-price">
        <div className="product-item-price-gold">
          <img src="assets/gold.png" alt="Gold" />
        </div>
        <div className="product-item-price-value">
          <span>{product.price}</span>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;