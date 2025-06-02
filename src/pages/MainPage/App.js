// src/App.js
import React, { useState, useEffect } from 'react';

import Sidebar from './components/Sidebar';
import ProductList from './components/ProductList';
import ProductInfo from './components/ProductInfo';
import VertDiv1 from './components/VerticalDiv1';
import './styles/style.css'; 


const types = ["AMMUNITION", "ARMOR", "BOOKS", "CLOTHING", "FOOD", "INGREDIENTS", "MISCELLANEOUS", "ORES", "POTIONS", "SOUL GEMS", "WEAPONS"];

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedClassIndex, setSelectedClassIndex] = useState(0);
  const [isSidebarScrolled, setIsSidebarScrolled] = useState(false); 

  useEffect(() => {
    const bg = Math.floor(Math.random() * 6);
    document.body.style.backgroundImage = `url('./assets/bg/${bg}.png')`;
  }, []);

  const handleProductSelect = (product) => {
    setSelectedProduct(prevProduct => (prevProduct && prevProduct.id === product.id ? null : product));
  };

  const handleScrollClasses = (direction) => {
    setSelectedClassIndex(prevIndex => {
      let newIndex = prevIndex;
      if (direction === 'up') {
        newIndex = prevIndex - 1;
      } else if (direction === 'down') {
        newIndex = prevIndex + 1;
      }

      if (newIndex !== prevIndex) {
          setIsSidebarScrolled(true); 
      }
      return newIndex;
    });
  };

  return (
    <div className="container-index">
      <Sidebar
        types={types}
        selectedClassIndex={selectedClassIndex}
        onScroll={handleScrollClasses}
      />

      {/* A seta complexa (dourada) agora aparece baseada em isSidebarScrolled */}
      <VertDiv1 id="vertDiv1" showArrow={isSidebarScrolled} /> 

      <div className={`container2 ${selectedProduct ? 'containerWithoutSelection' : 'containerWithSelection'}`}>
        <div className="navbar">
          <input type="text" placeholder="Search..." />
        </div>

        <div className="filters">
          Donec faucibus dolor mi, id vestibulum arcu ornare et. Ut sit amet ipsum purus. Nulla ut condimentum nisl.
          Nunc dictum diam id ultrices faucibus. Maecenas eget auctor arcu. Pellentesque dapibus enim vel turpis tristique,
          sed aliquam nulla pharetra. Donec faucibus arcu ipsum, ut auctor sem hendrerit id.
        </div>

        <ProductList
          onProductSelect={handleProductSelect}
          selectedProduct={selectedProduct}
        />

        {selectedProduct && (
          <>
            {/* A seta simples (branca) ainda aparece quando um produto é selecionado */}
            <VertDiv1 id="vertDiv2" showArrow={true} />
            <ProductInfo product={selectedProduct} />
          </>
        )}
      </div>

      <div className="rodape"></div>
    </div>
  );
}

export default App;