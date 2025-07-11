// src/components/ProductList.js
import React, { useEffect, useRef, useState } from 'react';
import ProductItem from './ProductItem';
import './styles/ProductList.css';
import PageSelector from './PageSelector';

function MarqueeOfItems({productsData}) { // selectedProducts?
  // função com responsabilidade de cuidar do marquee dos items
  // depende apenas da lista de produtos 
  useEffect(() => {
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
  }, [productsData]); // selectedProducts?
}

function useArrowFollowsScroll({ productListRef, selectedProduct, onSelectedItemPositionChange }) {
  // função com responsabilidade de fazer a seta da div2 seguir o scroll do mouse
  useEffect(() => {
    const container = productListRef.current;
    if (!container || !selectedProduct) {
      if (onSelectedItemPositionChange) onSelectedItemPositionChange(null);
      return;
    }

    const updatePosition = () => {
      const selectedElement = document.getElementById(selectedProduct.id);
      if (!selectedElement) {
        if (onSelectedItemPositionChange) onSelectedItemPositionChange(null);
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const selectedRect = selectedElement.getBoundingClientRect();

      const centerYInViewport = selectedRect.top + selectedRect.height / 2;
      const relativeY = centerYInViewport - containerRect.top;

      const isCenterVisible = centerYInViewport >= containerRect.top && centerYInViewport <= containerRect.bottom;

      if (onSelectedItemPositionChange) {
        if (isCenterVisible) {
          onSelectedItemPositionChange(relativeY);
        } else {
          onSelectedItemPositionChange(null);
        }
      }
    };

    updatePosition();
    container.addEventListener('scroll', updatePosition);
    window.addEventListener('resize', updatePosition);

    return () => {
      container.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, [productListRef, selectedProduct, onSelectedItemPositionChange]);
}

function ResetEntireListOnIndexChange({setStartPage, setSelectedPage, currentQueryIndex}) {
  useEffect(() => {
    setStartPage(1);
    setSelectedPage(1);
  }, [currentQueryIndex]);
}

function ProductList({ n, qtdProductsPerPage, productsData, onProductSelect, selectedProduct, onSelectedItemPositionChange, onNewQuery, currentQueryIndex }) {
  const productListRef = useRef(null);
  const [startPage, setStartPage] = useState(1);        // 1º cara da esquerda do grupo de paginas
  const [selectedPage, setSelectedPage] = useState(1);  // pagina selecionada

  MarqueeOfItems(productsData);
  useArrowFollowsScroll({productListRef, selectedProduct, onSelectedItemPositionChange});
  ResetEntireListOnIndexChange({setStartPage, setSelectedPage, currentQueryIndex});

  return (
    <div className={`listAndSelector`}>
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
      <PageSelector 
        n={n}
        maximum={qtdProductsPerPage}
        onPageClick={(clickedOnPage) => {
          setSelectedPage(clickedOnPage);
          onNewQuery(clickedOnPage);
        }}
        selectedPage={selectedPage}
        startPage={startPage}
        setStartPage={setStartPage}
      /> 
    </div>
  );
}

export default ProductList;