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

// estilos
import VertDiv1 from '../../components/VerticalDiv1';
import VertDiv2 from '../../components/VerticalDiv2';
import './User.css';

// scripts
import NewCategory from '../../query-scripts/NewCategory'
import setBackgroundImage from '../../style-scripts/setBackgroundImage';
import WhoAmI from '../../query-scripts/WhoAmI';

// temporario
import boneArrow from '../../assets/bone-arrow.png';


function App() {
  document.title = "Your page";
  const navigate = useNavigate();
  const qtdProductsPerPage = 84;

  // SOBRE ESTILO
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sideBarCenter, setSideBarCenter] = useState(0);  /// centro da lista circular
  const [salesSideBarCenter, setSalesSideBarCenter] = useState(0);  // centro da lista circular 2
  const [arrowY, setArrowY] = useState(null);
  const [types, setTypes] = useState(["PROFILE", "CART", "PAST PURCHASES"]);
  const [pastSales, setPastSales] = useState([]);

  // Sobre QUERIES
  const [queriedPage, setQueriedPage] = useState(1);
  const [currentQueryIndex, setQueryIndex] = useState(0); // classe da qual os produtos estão aparecendo
  const [currentSalesIndex, setSalesIndex] = useState(0); // classses da sidebar 2
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

  // username
  const [iAm, setWhoIAm] = useState("IDontKnowYEt");

  // inicialização
  useEffect(() => {
    setBackgroundImage();
    
    // pra impedir que um engraçadinho tente dar /user sem estar logado
    let flag = 'none';
    const token = localStorage.getItem("token");
    if(token) {
        const decodedToken = jwtDecode(token);
        flag = decodedToken.type;
    }
    if (flag !== 'client') navigate("/");

    // pega meus dados de usuário
    async function fetchUser() {
        const user = await WhoAmI(flag);
        setWhoIAm(user);
    } fetchUser();

    // faz query das past sales e coloca os nomes aqui
    setPastSales(["sale 0", "sale 1", "sale 2", "sale 3",])

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
      console.log(iAm);
      return newIndex;      
    });
  };

  // quando scrollamos nas classes da sidebar 2
  const handleScrollSales= (direction) => {
    setSalesSideBarCenter(prevIndex => {
      if (types[sideBarCenter] !== 'PAST PURCHASES') {
        return prevIndex;
      }

      let newIndex = prevIndex;
      if (direction === 'up') {
        newIndex = ((prevIndex - 1)+pastSales.length)%pastSales.length;
      } else if (direction === 'down') {
        newIndex = ((prevIndex + 1)+pastSales.length)%pastSales.length;
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

    setSalesSideBarCenter(0);
    setSalesIndex(0);

    // if (types[newIndex] == 'PAST PURCHASES' && pastSales.length != 0) {
        // fazer request dos produtos da 1ª sale listada
    //const newRequest = {type: 'ALL PRODUCTS', page: 1, pageSize: qtdProductsPerPage, };
    //setNewCategoryRequest(newRequest);
    //NewCategory(newRequest, setProductsData, setQtdProducts);

  };

  // quando clicamos nas classes da sidebar 2
  const handleClickSales  = (clickedOnIndex) => {
      // não podemos clicar "no vazio"
      const newIndex = (clickedOnIndex+pastSales.length)%pastSales.length;;
      setSalesSideBarCenter(newIndex);
      setSalesIndex(newIndex);
      setSelectedProduct(null);

      // fazer request dos produtos da sale em clickedOnIndex
      //const newRequest = {type: types[newIndex], page: 1, pageSize: qtdProductsPerPage, };
      //setNewCategoryRequest(newRequest);
      //NewCategory(newRequest, setProductsData, setQtdProducts);
    
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
    <div className={`container-user ${(types[currentQueryIndex] === "PAST PURCHASES" && pastSales.length !== 0) ? 'two-sidebars' : 'one-sidebar'}`} >
      <Sidebar
        types={types}
        selectedClassIndex={sideBarCenter}
        onScroll={handleScrollClasses}
        onClassClick={handleClickClasses}
        showLogo={true}
      />

      <VertDiv1 id="vertDiv1" showArrow={(currentQueryIndex == sideBarCenter)} /> 

      {(types[currentQueryIndex] == "PAST PURCHASES" && pastSales.length != 0) && (<>
        <Sidebar
            types={pastSales}
            selectedClassIndex={salesSideBarCenter}
            onScroll={handleScrollSales}
            onClassClick={handleClickSales}
            showLogo={false}
        />
        <VertDiv1 id="vertDiv1.2" showArrow={(currentSalesIndex == salesSideBarCenter)} /> 
        </>
      )}
      


      <div className={`container2-user ${selectedProduct ? 'containerWithoutSelection' : 'containerWithSelection'}
                                       ${(types[currentQueryIndex] !== "PROFILE" && qtdProducts !== 0) ? 'sale-info' : 'no-sale-info'}`}>
        <div className="navbar">
          <div className="searchbar-div">
            <p>I am {iAm.username}</p>
          </div>
          <div className="navbuttons-div">
            <ProfileButton goToHome={true}/>
            <SessionButton/>
          </div>
        </div>
	
            {(types[currentQueryIndex] !== "PROFILE") && (qtdProducts !== 0) && (<>
                <div className="navbar">
                    <p>Purchased on: [date]</p>
                    <p>Total Value: [value]</p>
                    <p>ID of purchase: [ID]</p>
                </div>

                <Sheet
                n={qtdProducts}
                qtdProductsPerPage={qtdProductsPerPage}
                data={productsData}
                selectedItem={selectedProduct}
                onItemSelect={handleItemSelect}
                onSelectedItemPositionChange={setArrowY}
                onNewQuery={handleNewPageQuery}
                currentQueryIndex={currentQueryIndex}
                showStock={false}
                />

                {selectedProduct && (<>
                    <VertDiv2 id="vertDiv2" showArrow={arrowY !== null} arrowY={arrowY} />
                    <ProductInfo product={selectedProduct} editable={false}/>
                </>
                )}
            </>
            )}

            {(types[currentQueryIndex] !== "PROFILE") && (qtdProducts === 0) && (<>
                <p> Não há produtos a serem mostrados! </p>
            </>
            )}

            {(types[currentQueryIndex] == "PROFILE") && (<> aaa
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
