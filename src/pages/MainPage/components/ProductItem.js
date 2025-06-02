// src/components/ProductItem.js
import React from 'react';
import '../styles/ProductList.css'; // Reutiliza o CSS da lista
import gold from '../../assets/gold.png';

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
          <img src={`${gold}`} alt="Gold" />
        </div>
        <div className="product-item-price-value">
          <span>{product.price}</span>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;