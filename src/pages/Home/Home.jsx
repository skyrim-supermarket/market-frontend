// src/App.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import Sidebar from '../components/Sidebar';
import SessionButton from '../components/SessionButton';
import ProductList from '../components/ProductList';
import ProductInfo from '../components/ProductInfo';
import Sheet from '../components/Sheet'
import AddForm from '../components/AddForm';

import VertDiv1 from '../components/VerticalDiv1';
import VertDiv2 from '../components/VerticalDiv2';
import Filter from '../components/Filter';
import './Home.css';

// scripts
import NewCategory from '../query-scripts/NewCategory'
import setBackgroundImage from '../style-scripts/setBackgroundImage';

// temporario
import boneArrow from '../assets/bone-arrow.png';

const types = ["ALL PRODUCTS", "AMMUNITION", "ARMOR", "BOOKS", "CLOTHING", "FOOD", "INGREDIENTS", "MISCELLANEOUS", "ORES", "POTIONS", "SOUL GEMS", "WEAPONS"];

function App({user}) {
  document.title = "Home";
  const navigate = useNavigate();
  const qtdProductsPerPage = 36;  // isso aqui é pra testes, mas depois tem q trocar pra isso ser igual a 36

  // SOBRE ESTILO
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isItAnAdminForms, setAdminForms] = useState(1);
  const [sideBarCenter, setSideBarCenter] = useState(0);  /// centro da lista circular
  const [arrowY, setArrowY] = useState(null);
  const [types, setTypes] = useState(["ALL PRODUCTS", "AMMUNITION", "ARMOR", "BOOKS", "CLOTHING", "FOOD", "INGREDIENTS", "MISCELLANEOUS", "ORES", "POTIONS", "SOUL GEMS", "WEAPONS"]);

  // Sobre QUERIES
  const [queriedPage, setQueriedPage] = useState(1);
  const [currentQueryIndex, setQueryIndex] = useState(0); // classe da qual os produtos estão aparecendo
  const [newCategoryRequest, setNewCategoryRequest] = useState({type: types[0], page: 1, pageSize: qtdProductsPerPage, });  // solicitação de nova query
  const [qtdProducts, setQtdProducts] = useState(0); // quantidade total de items a serem mostrados, nao apenas no productsData
  //const [productsData, setProductsData] = useState([]); // modelo: { id: 'product18', name: 'Shadowed Tower Netch Leather Shield', price: 300, image: `${boneArrow}` },
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

  const [whoAmI, setWhoAmI] = useState("none");
  const [adminEditSideBarCenter, setAdminEditSideBarCenter] = useState(0);  // centro da lista circular 2
  const [currentAdminEditIndex, setAdminEditIndex] = useState(0);

  // Começa com a solicitação inicial da primeira classe.
  useEffect(() => {
    setBackgroundImage();

    //NewCategory(newCategoryRequest, setProductsData, setQtdProducts);
    
    let flag = 'none';
    const token = localStorage.getItem("token");
    if(token) {
        const decodedToken = jwtDecode(token);
        flag = decodedToken.type;
    }

    setWhoAmI(flag);
    if (flag === 'admin') { 
      setTypes(["ADMINS", "CARROCABOYS", "CASHIERS", "CLIENTS", "PRODUCTS", "SALES"]);
      navigate("/admin")
    } else {
      navigate("/");
    }
    

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

  const handleScrollAdminEdit = (direction) => {
    setAdminEditSideBarCenter(prevIndex => {
      let newIndex = prevIndex;
      if (direction === 'up') {
        newIndex = ((prevIndex - 1)+2)%2;
      } else if (direction === 'down') {
        newIndex = (prevIndex + 1)%2;
      }
      return newIndex;      
    });
  };

  const handleClickClasses = (clickedOnIndex) => {
    const newIndex = (clickedOnIndex+types.length)%types.length;
    setSideBarCenter(newIndex);
    setQueryIndex(newIndex);
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

    const newRequest = {type: types[newIndex], page: 1, pageSize: qtdProductsPerPage, };

    setNewCategoryRequest(newRequest);
    NewCategory(newRequest, setProductsData, setQtdProducts);
  };

  const handleClickAdminEdit  = (clickedOnIndex) => {
    if (clickedOnIndex !== -1 && clickedOnIndex !== 2) {

      const newIndex = clickedOnIndex;
      setAdminEditSideBarCenter(newIndex);
      setAdminEditIndex(newIndex);
      setSelectedProduct(null);

      setAdminForms(1-clickedOnIndex);

      //const newRequest = {type: types[newIndex], page: 1, pageSize: qtdProductsPerPage, };

      //setNewCategoryRequest(newRequest);
      //NewCategory(newRequest, setProductsData, setQtdProducts);
    }
  };

  const handleNewPageQuery = (indexPage) => {
    const newPage = indexPage;
    setQueriedPage(newPage);
    setSelectedProduct(null);
    // alert("fui pra pagina " + newPage);
    // colooca aqui a logica pra mudar de página na mesma query
    const newRequest = {type: types[currentQueryIndex], page: newPage, pageSize: qtdProductsPerPage, };
    setNewCategoryRequest(newRequest);
    NewCategory(newRequest, setProductsData, setQtdProducts);
  }   

  
  if (whoAmI === "none" || whoAmI === "client") return ( // na vdd é dif
    <div className="container-index" >
      <Sidebar
        types={types}
        selectedClassIndex={sideBarCenter}
        onScroll={handleScrollClasses}
        onClassClick={handleClickClasses}
      />

      <VertDiv1 id="vertDiv1" showArrow={(currentQueryIndex === sideBarCenter)} /> 

      <div className={`container2 ${selectedProduct ? 'containerWithoutSelection' : 'containerWithSelection'}`}>
        <div className="navbar">
          <div className="searchbar-div">
            <input type="text" id="searchbar" placeholder="Search..." />
          </div>
          <SessionButton setWhoAmI={setWhoAmI}/>
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
            <ProductInfo product={selectedProduct} />
          </>
        )}
        
      </div>

      <div className="rodape"> A série de jogos <i>The Elder Scrolls </i>e <i>The Elder Scrolls V: Skyrim </i> 
      são propriedade da Bethesda Softworks LLC: Todos os direitos reservados. Este website tem fins educacionais 
      e experimentais, e o tema foi escolhido apenas como plano de fundo.</div>
    </div>
  );

  else if (whoAmI == "admin") return (
    <div className="container-admin" >
      <Sidebar
        types={types}
        selectedClassIndex={sideBarCenter}
        onScroll={handleScrollClasses}
        onClassClick={handleClickClasses}
        showLogo={true}
      />

      <VertDiv1 id="vertDiv1" showArrow={(currentQueryIndex == sideBarCenter)} /> 

      <Sidebar
        types={["ADD NEW", "LIST", "\0", ]}
        selectedClassIndex={adminEditSideBarCenter}
        onScroll={handleScrollAdminEdit}
        onClassClick={handleClickAdminEdit}
        showLogo={false}
      />

      <VertDiv1 id="vertDiv1.2" showArrow={(currentAdminEditIndex == adminEditSideBarCenter)} /> 

      <div className={`conteiner2-admin ${selectedProduct ? 'containerWithoutSelection' : 'containerWithSelection'}`}>
        <div className="navbar">
          <div className="searchbar-div">
            <input type="text" id="searchbar" placeholder="Search..." />
          </div>
          <SessionButton setWhoAmI={setWhoAmI}/>
        </div>
	
        {!isItAnAdminForms && (
          <>
            <Sheet
              n={qtdProducts}
              qtdProductsPerPage={qtdProductsPerPage}
              data={productsData}
              selectedItem={selectedProduct}
              onItemSelect={handleProductSelect}
              onSelectedItemPositionChange={setArrowY}
              onNewQuery={handleNewPageQuery}
              currentQueryIndex={currentQueryIndex}
            />

            {selectedProduct && (
              <>
                <VertDiv2 id="vertDiv2" showArrow={arrowY !== null} arrowY={arrowY} />
                <ProductInfo product={selectedProduct} />
              </>
            )}
          </>
        )}

        {isItAnAdminForms && (
          <>
            <AddForm />
          </>
        )}

        {}
        
      </div>

      <div className="rodape"> A série de jogos <i>The Elder Scrolls </i>e <i>The Elder Scrolls V: Skyrim </i> 
      são propriedade da Bethesda Softworks LLC: Todos os direitos reservados. Este website tem fins educacionais 
      e experimentais, e o tema foi escolhido apenas como plano de fundo.</div>
    </div>
  );

}

export default App;
