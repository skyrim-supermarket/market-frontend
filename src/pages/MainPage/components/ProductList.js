// src/components/ProductList.js
import React, { useEffect, useRef } from 'react';
import ProductItem from './ProductItem';
import '../styles/ProductList.css';
import boneArrow from '../../assets/bone-arrow.png';

const productsData = [
  { id: 'product1', name: 'Shadowed Tower Netch Leather Shield', price: 300, image: `${boneArrow}` },
  { id: 'product2', name: 'Shadowed Tower Netch Leather Shield', price: 300, image: `${boneArrow}` },
  { id: 'product3', name: 'Shadowed Tower Netch Leather Shield', price: 300, image: `${boneArrow}` },
  { id: 'product4', name: 'Shadowed Tower Netch Leather Shield', price: 300, image: `${boneArrow}` },
  { id: 'product5', name: 'Shadowed Tower Netch Leather Shield', price: 300, image: `${boneArrow}` },
  { id: 'product6', name: 'Shadowed Tower Netch Leather Shield', price: 300, image: `${boneArrow}` },
  { id: 'product7', name: 'Shadowed Tower Netch Leather Shield', price: 300, image: `${boneArrow}` },
  { id: 'product8', name: 'Shadowed Tower Netch Leather Shield', price: 300, image: `${boneArrow}` },
  { id: 'product9', name: 'Shadowed Tower Netch Leather Shield', price: 300, image: `${boneArrow}` },
];

function ProductList({ onProductSelect, selectedProduct }) {
  const productListRef = useRef(null);

  useEffect(() => {
    // pra fazer marquee
    const elements = document.querySelectorAll('.product-item-name');
    elements.forEach(element => {
      const elementChild = element.querySelector('.product-item-name-text');
      if (elementChild) {
        const pw = elementChild.offsetWidth;
        const cw = element.offsetWidth;
        if (pw > cw) {
          elementChild.classList.add('text-overflow');
        } else {
          elementChild.classList.remove('text-overflow');
        }
      }
    });
  }, [productsData, selectedProduct]); 

  return (
    <div
      id="product-list"
      className={`product-list ${selectedProduct ? 'productSelected' : 'productNotSelected'}`}
      ref={productListRef}
    >
      {productsData.map(product => (
        <ProductItem
          key={product.id}
          product={product}
          isSelected={selectedProduct && selectedProduct.id === product.id}
          onSelect={onProductSelect}
        />
      ))}
    </div>
  );
}

export default ProductList;