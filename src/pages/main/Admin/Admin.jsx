// src/App.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

// componentes
import Sidebar from '../../components/Sidebar';
import ProfileButton from '../../components/ProfileButton';
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
import setBackgroundImage from '../../style-scripts/setBackgroundImage';


function App() {
  document.title = "Admin EditSpace";
  const navigate = useNavigate();
  const qtdProductsPerPage = 108;

  // SOBRE ESTILO
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isItAnAdminForms, setAdminForms] = useState(1);
  const [sideBarCenter, setSideBarCenter] = useState(0);  /// centro da lista circular
  const [adminEditSideBarCenter, setAdminEditSideBarCenter] = useState(0);  // centro da lista circular menor
  const [arrowY, setArrowY] = useState(null);
  const [types, setTypes] = useState(["ADMINS", "CARROCABOYS", "CASHIERS", "CLIENTS", "PRODUCTS", "SALES"]);
  const [adminEdit, setAdminEdit] = useState(["ADD NEW", "LIST", "\0", ]);

  // Sobre QUERIES
  const [queriedPage, setQueriedPage] = useState(1);
  const [currentQueryIndex, setQueryIndex] = useState(0); // classe da qual os produtos estão aparecendo
  const [currentAdminEditIndex, setAdminEditIndex] = useState(0); // classes da sidebar menor
  const [newCategoryRequest, setNewCategoryRequest] = useState({type: types[0], page: 1, pageSize: qtdProductsPerPage, });  // solicitação de nova query
  const [qtdProducts, setQtdProducts] = useState(0); // quantidade total de items a serem mostrados, nao apenas no productsData
  const [productsData, setProductsData] = useState([]); // modelo: { id: 'product18', name: 'Shadowed Tower Netch Leather Shield', price: 300, image: `${boneArrow}` },
  const [currentLabels, setCurrentLabels] = useState({});

  // inicialização
  useEffect(() => {
    setBackgroundImage();
    NewCategory(types[currentQueryIndex].toLowerCase(), setProductsData, setQtdProducts, false);
    
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

  // quando scrollamos nas classes da sidebar maior
  const handleScrollClasses = (direction) => {
    setSideBarCenter(prevIndex => {
      let newIndex = prevIndex;
      if (direction === 'up') newIndex = ((prevIndex - 1)+types.length)%types.length;
      else if (direction === 'down') newIndex = (prevIndex + 1)%types.length;
      return newIndex;      
    });
  };

  // quando scrollamos nas classes da sidebar menor
  const handleScrollAdminEdit = (direction) => {
    setAdminEditSideBarCenter(prevIndex => {
      // clientes nem sales têm "add new", então não faz sentido scrollar
      if (types[sideBarCenter] == 'CLIENTS' || types[sideBarCenter] == 'SALES') {
        return prevIndex;
      }

      let newIndex = prevIndex;
      if (direction === 'up') newIndex = ((prevIndex - 1)+2)%2;
      else if (direction === 'down') newIndex = (prevIndex + 1)%2;
      return newIndex;      
    });
  };

  // quando clicamos nas classes da sidebar maior
  const handleClickClasses = (clickedOnIndex) => {
    const newIndex = (clickedOnIndex+types.length)%types.length;
    setSideBarCenter(newIndex);
    setQueryIndex(newIndex);
    setQueriedPage(1);        // reseta pra voltar pra pagina 1
    setSelectedProduct(null);

    setAdminEditSideBarCenter(0);
    setAdminEditIndex(0);
    setSelectedProduct(null);

    if (types[newIndex] == 'CLIENTS' || types[newIndex] == 'SALES') {
      setAdminEdit(["LIST",]);
      setAdminForms(0);
    } else {
      setAdminEdit(["ADD NEW", "LIST", "\0", ]);
      setAdminForms(1);
    }

    if (types[newIndex] == 'PRODUCTS') {
      const newRequest = {type: 'ALL PRODUCTS', page: 1, pageSize: qtdProductsPerPage, };
      setNewCategoryRequest(newRequest);
      NewCategory(newRequest, setProductsData, setQtdProducts);
    } else {
      NewCategory(types[newIndex].toLowerCase(), setProductsData, setQtdProducts, false);
    }

  };

  // quando clicamos nas classes da sidebar menor
  const handleClickAdminEdit  = (clickedOnIndex) => { 
      const newIndex = clickedOnIndex;
      setAdminEditSideBarCenter(newIndex);
      setAdminEditIndex(newIndex);
      setSelectedProduct(null);

      if (types[currentQueryIndex] == 'CLIENTS' || types[currentQueryIndex] == 'SALES') setAdminForms(0);
      else setAdminForms(1-clickedOnIndex);
  };

  // quando queremos uma nova página
  const handleNewPageQuery = (indexPage) => {
    const newPage = indexPage;
    setQueriedPage(newPage);
    setSelectedProduct(null);

    // faz novo request
    const newRequest = {type: "ALL PRODUCTS", page: newPage, pageSize: qtdProductsPerPage, };
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
            {(adminEdit[currentAdminEditIndex] !== "ADD NEW") && (<>
              <input type="text" id="searchbar" placeholder="Search..." />
            </>
            )}
            {(adminEdit[currentAdminEditIndex] === "ADD NEW") && (<>
              <p>Add a new {types[currentQueryIndex].toLowerCase().replace(/s$/, '')}</p>
            </>)}
          </div>
          <div className="navbuttons-div">
            <ProfileButton goToHome={true}/>
            <SessionButton/>
          </div>
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
              isItAProduct={types[currentQueryIndex] == "PRODUCTS"}
              alertAdminEdit={() => {setSelectedProduct(null)}}
            />

            {selectedProduct && (
              <>
                <VertDiv2 id="vertDiv2" showArrow={arrowY !== null} arrowY={arrowY} />
                <ProductInfo product={selectedProduct} editable={
                  ((types[currentQueryIndex] == "CLIENTS" || types[currentQueryIndex] == "SALES")? false : true) 
                 } category={types[currentQueryIndex]}/>
              </>
            )}
          </>
        )}

        {isItAnAdminForms && (
          <>
            <Form
              whatDoIWant={types[currentQueryIndex]}
              sendLabelsUp={setCurrentLabels}
              appendData={() => {handleClickClasses(currentQueryIndex)}}
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
