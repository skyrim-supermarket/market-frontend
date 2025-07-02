// src/App.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// componentes
import Sidebar from '../../components/Sidebar';
import ProfileButton from '../../components/ProfileButton';
import SessionButton from '../../components/SessionButton';
import ProductList from '../../components/ProductList';
import ProductInfo from '../../components/ProductInfo';

// estilo
import VertDiv1 from '../../components/VerticalDiv1';
import VertDiv2 from '../../components/VerticalDiv2';
import Filter from '../../components/Filter';
import './Home.css';

// scripts
import NewCategory from '../../query-scripts/NewCategory'
import setBackgroundImage from '../../style-scripts/setBackgroundImage';
import WhatAmI from '../../query-scripts/WhatAmI';

function App() {
  document.title = "Home";
  const navigate = useNavigate();
  const qtdProductsPerPage = 42; // vida verdade e universo

  // SOBRE ESTILO
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sideBarCenter, setSideBarCenter] = useState(0);  /// centro da lista circular
  const [arrowY, setArrowY] = useState(null);
  const [types, setTypes] = useState(["ALL PRODUCTS", "AMMUNITION", "ARMOR", "BOOKS", "CLOTHING", "FOOD", "INGREDIENTS", "MISCELLANEOUS", "ORES", "POTIONS", "SOUL GEMS", "WEAPONS"]);

  // Sobre QUERIES
  const [queriedPage, setQueriedPage] = useState(1);
  const [currentQueryIndex, setQueryIndex] = useState(0); // classe da qual os produtos estão aparecendo
  const [newCategoryRequest, setNewCategoryRequest] = useState({type: types[0], page: 1, pageSize: qtdProductsPerPage, });  // solicitação de nova query
  const [qtdProducts, setQtdProducts] = useState(0); // quantidade total de items a serem mostrados, nao apenas no productsData
  const [productsData, setProductsData] = useState([]); // modelo: { id: 'product18', name: 'Shadowed Tower Netch Leather Shield', price: 300, image: `${boneArrow}` },

  // sobre USER
  const [iAm, setWhatIAm] = useState('none');

  // inicialização
  useEffect(() => {
    setBackgroundImage(); // seta imagem de fundo

    // vê quem eu sou
    async function fetchUserType() {
        const myUserType = await WhatAmI()
        setWhatIAm(myUserType);
    } fetchUserType();

    // faz a query inicial
    NewCategory(newCategoryRequest, setProductsData, setQtdProducts); // solicitação da 1ª classe
    
    return () => {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundPosition = '';
      document.body.style.backgroundAttachment = '';
    }
  }, []);

  // toda vez que clicamos num produto, ou ele é selecionado ou deselecionado
  const handleProductSelect = (product) => {
    setSelectedProduct(prevProduct => (prevProduct && prevProduct.id === product.id ? null : product));
  };

  // quando scrollamos na sidebar
  const handleScrollClasses = (direction) => {
    setSideBarCenter(prevIndex => {
      let newIndex = prevIndex;
      if (direction === 'up') newIndex = ((prevIndex-1)+types.length)%types.length;
      else if (direction === 'down') newIndex = (prevIndex+1)%types.length;
      return newIndex;      
    });
  };

  // quando clicamos numa classe da sidebar
  const handleClickClasses = (clickedOnIndex) => {
    const newIndex = (clickedOnIndex+types.length)%types.length;
    setSideBarCenter(newIndex);
    setQueryIndex(newIndex);
    setQueriedPage(1);        
    setSelectedProduct(null);

    // faz nova request
    const newRequest = {type: types[newIndex], page: 1, pageSize: qtdProductsPerPage, };
    setNewCategoryRequest(newRequest);
    NewCategory(newRequest, setProductsData, setQtdProducts);
  };

  // paginação
  const handleNewPageQuery = (indexPage) => {
    const newPage = indexPage;
    setQueriedPage(newPage);
    setSelectedProduct(null);

    // faz nova request, com nova página
    const newRequest = {type: types[currentQueryIndex], page: newPage, pageSize: qtdProductsPerPage, };
    setNewCategoryRequest(newRequest);
    NewCategory(newRequest, setProductsData, setQtdProducts);
  }   

  return (
    <div className="container-index" >
      <Sidebar
        types={types}
        selectedClassIndex={sideBarCenter}
        onScroll={handleScrollClasses}
        onClassClick={handleClickClasses}
        showLogo={true}
      />

      <VertDiv1 id="vertDiv1" showArrow={(currentQueryIndex === sideBarCenter)} /> 

      <div className={`container2 ${selectedProduct ? 'containerWithoutSelection' : 'containerWithSelection'}`}>
        <div className="navbar">
          <div className="searchbar-div">
            <input type="text" id="searchbar" placeholder="Search..." />
          </div>
          <div className="navbuttons-div">
            <ProfileButton goToHome={false} iAm={iAm}/>
            <SessionButton setIAm={setWhatIAm}/>
          </div>
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
          </div>
        </div>

        <ProductList
          n={qtdProducts}
          qtdProductsPerPage={qtdProductsPerPage} 
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
            <ProductInfo product={selectedProduct} editable={false}/>
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
