// src/App.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

// componentes
import Sidebar from '../../components/Sidebar';
import SessionButton from '../../components/SessionButton';
import ProductInfo from '../../components/ProductInfo';
import Sheet from '../../components/Sheet'
import Form from '../../components/Form';

// estilos
import VertDiv1 from '../../components/VerticalDiv1';
import VertDiv2 from '../../components/VerticalDiv2';
import './Admin.css';

// scripts
import NewCategory from '../../query-scripts/NewCategory'
import NewForm from '../../query-scripts/NewForm';
import setBackgroundImage from '../../style-scripts/setBackgroundImage';

// temporario
import boneArrow from '../../assets/bone-arrow.png';


function App() {
  document.title = "Admin EditSpace";
  const navigate = useNavigate();
  const qtdProductsPerPage = 84;

  // SOBRE ESTILO
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isItAnAdminForms, setAdminForms] = useState(1);
  const [sideBarCenter, setSideBarCenter] = useState(0);  /// centro da lista circular
  const [adminEditSideBarCenter, setAdminEditSideBarCenter] = useState(0);  // centro da lista circular 2
  const [arrowY, setArrowY] = useState(null);
  const [types, setTypes] = useState(["ADMINS", "CARROCABOYS", "CASHIERS", "CLIENTS", "PRODUCTS", "SALES"]);
  const [adminEdit, setAdminEdit] = useState(["ADD NEW", "LIST", "\0", ]);

  // Sobre QUERIES
  const [queriedPage, setQueriedPage] = useState(1);
  const [currentQueryIndex, setQueryIndex] = useState(0); // classe da qual os produtos estão aparecendo
  const [currentAdminEditIndex, setAdminEditIndex] = useState(0); // classses da sidebar 2
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
  const [currentLabels, setCurrentLabels] = useState({});

  // inicialização
  useEffect(() => {
    setBackgroundImage();
    //NewCategory(newCategoryRequest, setProductsData, setQtdProducts);
    
    // pra impedir que um engraçadinho tente dar /admin sem estar logado
    let flag = 'none';
    const token = localStorage.getItem("token");
    if(token) {
        const decodedToken = jwtDecode(token);
        flag = decodedToken.type;
    }
    if (flag !== 'admin') navigate("/");

    return () => {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundPosition = '';
      document.body.style.backgroundAttachment = '';
    }
  }, []);

  // quando clicamos em algum item da planilha
  const handleItemSelect = (product) => {
    setSelectedProduct(prevProduct => (prevProduct && prevProduct.id === product.id ? null : product));
  };

  // quando scrollamos nas classes da sidebar 1
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

  // quando scrollamos nas classes da sidebar 2
  const handleScrollAdminEdit = (direction) => {
    setAdminEditSideBarCenter(prevIndex => {
      if (types[sideBarCenter] == 'CLIENTS' || types[sideBarCenter] == 'SALES') {
        return prevIndex;
      }

      let newIndex = prevIndex;
      if (direction === 'up') {
        newIndex = ((prevIndex - 1)+2)%2;
      } else if (direction === 'down') {
        newIndex = (prevIndex + 1)%2;
      }
      return newIndex;      
    });
  };

  // quando clicamos nas classes da sidebar 1
  const handleClickClasses = (clickedOnIndex) => {
    const newIndex = (clickedOnIndex+types.length)%types.length;
    setSideBarCenter(newIndex);
    setQueryIndex(newIndex);
    setQueriedPage(1);        // reseta pra voltar pra pagina 1
    setSelectedProduct(null);

    setAdminEditSideBarCenter(0);
    setAdminEditIndex(0);
    setSelectedProduct(null);
    setAdminForms(1);

    if (types[newIndex] == 'CLIENTS' || types[newIndex] == 'SALES') {
      alert("aa")
      setAdminEdit(["LIST",]);
    } else {
      setAdminEdit(["ADD NEW", "LIST", "\0", ]);
    }

    //const newRequest = {type: 'ALL PRODUCTS', page: 1, pageSize: qtdProductsPerPage, };
    //setNewCategoryRequest(newRequest);
    //NewCategory(newRequest, setProductsData, setQtdProducts);

  };

  // quando clicamos nas classes da sidebar 2
  const handleClickAdminEdit  = (clickedOnIndex) => {
    if (clickedOnIndex !== -1 && clickedOnIndex !== 2) {  // não podemos clicar "no vazio"
      const newIndex = clickedOnIndex;
      setAdminEditSideBarCenter(newIndex);
      setAdminEditIndex(newIndex);
      setSelectedProduct(null);
      setAdminForms(1-clickedOnIndex);

      // labels

      //const newRequest = {type: types[newIndex], page: 1, pageSize: qtdProductsPerPage, };

      //setNewCategoryRequest(newRequest);
      //NewCategory(newRequest, setProductsData, setQtdProducts);
    }
  };

  // quando queremos uma nova página
  const handleNewPageQuery = (indexPage) => {
    const newPage = indexPage;
    setQueriedPage(newPage);
    setSelectedProduct(null);
    const newRequest = {type: types[currentQueryIndex], page: newPage, pageSize: qtdProductsPerPage, };
    setNewCategoryRequest(newRequest);
    NewCategory(newRequest, setProductsData, setQtdProducts);
  }   

  return (
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
        types={adminEdit}
        selectedClassIndex={adminEditSideBarCenter}
        onScroll={handleScrollAdminEdit}
        onClassClick={handleClickAdminEdit}
        showLogo={false}
      />

      <VertDiv1 id="vertDiv1.2" showArrow={(currentAdminEditIndex == adminEditSideBarCenter)} /> 

      <div className={`container2-admin ${selectedProduct ? 'containerWithoutSelection' : 'containerWithSelection'}`}>
        <div className="navbar">
          <div className="searchbar-div">
            <input type="text" id="searchbar" placeholder="Search..." />
          </div>
          <SessionButton/>
        </div>
	
        {!isItAnAdminForms && (
          <>
            <Sheet
              n={qtdProducts}
              qtdProductsPerPage={qtdProductsPerPage}
              data={productsData}
              selectedItem={selectedProduct}
              onItemSelect={handleItemSelect}
              onSelectedItemPositionChange={setArrowY}
              onNewQuery={handleNewPageQuery}
              currentQueryIndex={currentQueryIndex}
              showStock={true}
            />

            {selectedProduct && (
              <>
                <VertDiv2 id="vertDiv2" showArrow={arrowY !== null} arrowY={arrowY} />
                <ProductInfo product={selectedProduct} editable={true} labels={currentLabels}/>
              </>
            )}
          </>
        )}

        {isItAnAdminForms && (
          <>
            <Form
              whatDoIWant={types[currentQueryIndex]}
              sendLabelsUp={setCurrentLabels}
            />
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
