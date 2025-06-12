// src/App.js
import React, { useState, useEffect } from 'react';

import Sidebar from '../components/Sidebar';
import SessionButton from '../components/SessionButton';
import ProductList from '../components/ProductList';
import ProductInfo from '../components/ProductInfo';
import VertDiv1 from '../components/VerticalDiv1';
import VertDiv2 from '../components/VerticalDiv2';
import Filter from '../components/Filter';
import './Home.css';
import bg0 from '../assets/bg/0.png'
import bg1 from '../assets/bg/1.png'
import bg2 from '../assets/bg/2.png'
import bg3 from '../assets/bg/3.png'
import bg4 from '../assets/bg/4.png'
import bg5 from '../assets/bg/5.png'

let selectedClass = 0;
const types = ["ALL PRODUCTS", "AMMUNITION", "ARMOR", "BOOKS", "CLOTHING", "FOOD", "INGREDIENTS", "MISCELLANEOUS", "ORES", "POTIONS", "SOUL GEMS", "WEAPONS"];

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sideBarCenter, setSideBarCenter] = useState(0);  /// centro da lista circular
  const [currentQueryIndex, setQueryIndex] = useState(0); // classe da qual os produtos estão aparecendo
  const [arrowY, setArrowY] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [queriedPage, setQueriedPage] = useState(1);
  const [qtdProducts, setQtdProducts] = useState(500);

  useEffect(() => {
    switch(Math.floor(Math.random() * 6)) {
      case 0:
        document.body.style.backgroundImage = `url(${bg0})`;
        break;
      case 1:
        document.body.style.backgroundImage = `url(${bg1})`;
        break;
      case 2:
        document.body.style.backgroundImage = `url(${bg2})`;
        break;
      case 3:
        document.body.style.backgroundImage = `url(${bg3})`;
        break;
      case 4:
        document.body.style.backgroundImage = `url(${bg4})`;
        break;
      case 5:
        document.body.style.backgroundImage = `url(${bg5})`;
        break;

      default:
        break;
    }

    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment = 'fixed';

    return () => {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundPosition = '';
      document.body.style.backgroundAttachment = '';
    }
  }, []);

  const handleProductSelect = (product) => {
    setSelectedProduct(prevProduct => (prevProduct && prevProduct.id === product.id ? null : product));
  };

  const handleScrollClasses = (direction) => {
    setSideBarCenter(prevIndex => {
      let newIndex = prevIndex;
      if (direction === 'up') {
        newIndex = ((prevIndex - 1)+types.length)%types.length;
      } else if (direction === 'down') {
        newIndex = (prevIndex + 1)%types.length;
      }
      return newIndex;      
    });
  };

  const handleClickClasses = (clickedOnIndex) => {
    setSideBarCenter(clickedOnIndex);
    setQueryIndex(clickedOnIndex);
  };

  const getNumOfProducts = () => {
    setQtdProducts(
      // aqui faz a query
      Math.floor(Math.random()*100)
    );
  }

  return (
    <div className="container-index" >
      <Sidebar
        types={types}
        selectedClassIndex={sideBarCenter}
        onScroll={handleScrollClasses}
        onClassClick={handleClickClasses}
      />

      {/* A seta complexa (dourada) agora aparece baseada em isSidebarScrolled */}
      <VertDiv1 id="vertDiv1" showArrow={(currentQueryIndex == sideBarCenter)} /> 

      <div className={`container2 ${selectedProduct ? 'containerWithoutSelection' : 'containerWithSelection'}`}>
        <div className="navbar">
          <div className="searchbar-div">
            <input type="text" id="searchbar" placeholder="Search..." />
          </div>
          <SessionButton/>
        </div>
	  
        <div className="filters">
          <div className="filters-flex">
          <span id="search-title"> Search Filters </span>
          <Filter 
            name={"Craft"}
            listOfOptions={["a", "b", "c"]}
            isSelected={true}
          />
          <Filter 
            name={"Gravity"}
            listOfOptions={["a", "b", "c"]}
            isSelected={true}
          />
          <Filter 
            name={"daiki"}
            listOfOptions={["a", "b", "c"]}
            isSelected={true}
          />
          <Filter 
            name={"daiki"}
            listOfOptions={["a", "b", "c"]}
            isSelected={true}
          />
          <Filter 
            name={"daiki"}
            listOfOptions={["a", "b", "c"]}
            isSelected={true}
          />
          <Filter 
            name={"daiki"}
            listOfOptions={["a", "b", "c"]}
            isSelected={true}
          />
          <Filter 
            name={"daiki"}
            listOfOptions={["a", "b", "c"]}
            isSelected={true}
          />
          <Filter 
            name={"daiki"}
            listOfOptions={["a", "b", "c"]}
            isSelected={true}
          />
          <Filter 
            name={"daiki"}
            listOfOptions={["a", "b", "c"]}
            isSelected={true}
          />
          <Filter 
            name={"daiki"}
            listOfOptions={["a", "b", "c"]}
            isSelected={true}
          />
          <Filter 
            name={"daiki"}
            listOfOptions={["a", "b", "c"]}
            isSelected={true}
          />
          <Filter 
            name={"daiki"}
            listOfOptions={["a", "b", "c"]}
            isSelected={true}
          />
          {/*Donec faucibus dolor mi, id vestibulum arcu ornare et. Ut sit amet ipsum purus. Nulla ut condimentum nisl.
          Nunc dictum diam id ultrices faucibus. Maecenas eget auctor arcu. Pellentesque dapibus enim vel turpis tristique,
          sed aliquam nulla pharetra. Donec faucibus arcu ipsum, ut auctor sem hendrerit id.*/}
          </div>
        </div>

        <ProductList
          selectedProduct={selectedProduct}
          onProductSelect={handleProductSelect}
          onSelectedItemPositionChange={setArrowY}
          n={qtdProducts}
          onNewQuery={getNumOfProducts}
        />

        {selectedProduct && (
          <>
            {/* A seta simples (branca) ainda aparece quando um produto é selecionado */}
            <VertDiv2 id="vertDiv2" showArrow={arrowY!==null} arrowY={arrowY} />
            <ProductInfo product={selectedProduct} />
          </>
        )}
        
      </div>

      <div className="rodape"> A série de jogos <i>The Elder Scrolls </i>e <i>The Elder Scrolls V: Skyrim </i> 
      são propriedade da Bethesda Softworks LLC: Todos os direitos reservados. Este website tem fins educacionais 
      e experimentais, e o tema foi escolhido apenas como plano de fundo.</div>
    </div>
  );
}

export default App;
