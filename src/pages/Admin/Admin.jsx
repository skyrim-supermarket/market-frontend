// src/App.js
import React, { useState, useEffect } from 'react';

import Sidebar from '../components/Sidebar';
import SessionButton from '../components/SessionButton';
import ProductList from '../components/ProductList';
import ProductInfo from '../components/ProductInfo';
import VertDiv1 from '../components/VerticalDiv1';
import VertDiv2 from '../components/VerticalDiv2';
import Filter from '../components/Filter';
import './Admin.css';
import bg0 from '../assets/bg/0.png'
import bg1 from '../assets/bg/1.png'
import bg2 from '../assets/bg/2.png'
import bg3 from '../assets/bg/3.png'
import bg4 from '../assets/bg/4.png'
import bg5 from '../assets/bg/5.png'

// temporario
import boneArrow from '../assets/bone-arrow.png';

const types = ["ADMINS", "CARROCABOYS", "CASHIERS", "CLIENTS", "PRODUCTS", "SALES"];

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sideBarCenter, setSideBarCenter] = useState(0);  /// centro da lista circular
  const [currentQueryIndex, setQueryIndex] = useState(0); // classe da qual os produtos estão aparecendo
  const [arrowY, setArrowY] = useState(null);
  const [queriedPage, setQueriedPage] = useState(1);

  const [productsData, setProductsData] = useState([
    { id: 'product1', name: 'Shadowed Tower', price: 300, image: `${boneArrow}` },
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
  ]);
  const [qtdProducts, setQtdProducts] = useState(18); // quantidade total de items a serem mostrados, nao apenas no productsData

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
    setQueriedPage(1);        // reseta pra voltar pra pagina 1
    setSelectedProduct(null);

    // coloca aqui toda a logica pra mudar a classe da query
    // aqui a gente mudaria productsData

    // a gente teria que descobrir qual o novo N (quantidade de produtos da classe) aqui
    /*
      var n = 500;
      setQtdProducts(n);

      var newProducts = [];
      setProductsData(newProducts);  // 1ª pagina dos novos produtos
    */
  };

  const handleNewPageQuery = (newPage) => {
    setQueriedPage(newPage);
    setSelectedProduct(null);
    // alert("fui pra pagina " + newPage);
    // colooca aqui a logica pra mudar de página na mesma query

    // faz a query da nova pagina, e coloca aqui
    /*
      var newProducts = [];
      setProductsData(newProducts); // queriedPageª pagina da mesma query
    */
  }

  return (
    <div className="container-index" >
      <Sidebar
        types={types}
        selectedClassIndex={sideBarCenter}
        onScroll={handleScrollClasses}
        onClassClick={handleClickClasses}
      />

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
          n={qtdProducts}
          productsData={productsData}
          selectedProduct={selectedProduct}
          onProductSelect={handleProductSelect}
          onSelectedItemPositionChange={setArrowY}
          onNewQuery={handleNewPageQuery}
          currentQueryIndex={currentQueryIndex}  // passa isso só pra poder resetar a page selector quando uma nova classe é escolhida
        />

        {selectedProduct && (
          <>
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
