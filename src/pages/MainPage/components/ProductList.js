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
  { id: 'product10', name: 'Shadowed Tower Netch Leather Shield', price: 300, image: `${boneArrow}` },
  { id: 'product11', name: 'Shadowed Tower Netch Leather Shield', price: 300, image: `${boneArrow}` },
  { id: 'product12', name: 'Shadowed Tower Netch Leather Shield', price: 300, image: `${boneArrow}` },
  { id: 'product13', name: 'Shadowed Tower Netch Leather Shield', price: 300, image: `${boneArrow}` },
  { id: 'product14', name: 'Shadowed Tower Netch Leather Shield', price: 300, image: `${boneArrow}` },
  { id: 'product15', name: 'Shadowed Tower Netch Leather Shield', price: 300, image: `${boneArrow}` },
  { id: 'product16', name: 'Shadowed Tower Netch Leather Shield', price: 300, image: `${boneArrow}` },
  { id: 'product17', name: 'Shadowed Tower Netch Leather Shield', price: 300, image: `${boneArrow}` },
  { id: 'product18', name: 'Shadowed Tower Netch Leather Shield', price: 300, image: `${boneArrow}` },
  { id: 'product19', name: 'Shadowed Tower Netch Leather Shield', price: 300, image: `${boneArrow}` },
];

function ProductList({ onProductSelect, selectedProduct, onSelectedItemPositionChange }) {
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


// essa gambiarra é toda a lógica da seta acompanhar o scroll
useEffect(() => {
  const container = productListRef.current;
  if (!container || !selectedProduct) { // nao tem produto selecionado
    if (onSelectedItemPositionChange) onSelectedItemPositionChange(null);
    return;
  }

  const updatePosition = () => {
    const selectedElement = document.getElementById(selectedProduct.id);
    if (!selectedElement) {
      if (onSelectedItemPositionChange) onSelectedItemPositionChange(null);
      return;
    }

    // alturas relativas do container e do coiso selecionado
    const containerRect = container.getBoundingClientRect();
    const selectedRect = selectedElement.getBoundingClientRect();

    const centerYInViewport = selectedRect.top + selectedRect.height/2;
    const relativeY = centerYInViewport - containerRect.top;

    const isCenterVisible = (centerYInViewport >= containerRect.top) && (centerYInViewport <= containerRect.bottom);

    if (onSelectedItemPositionChange) {
      if (isCenterVisible) {
        onSelectedItemPositionChange(relativeY);
      } else {
        onSelectedItemPositionChange(null);
      }
    }
  };

  updatePosition(); // run on mount/update

  // Listen to scroll and resize changes to keep arrow accurate
  container.addEventListener('scroll', updatePosition);
  window.addEventListener('resize', updatePosition);

  return () => {
    container.removeEventListener('scroll', updatePosition);
    window.removeEventListener('resize', updatePosition);
  };
}, [selectedProduct, onSelectedItemPositionChange]);


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