// src/App.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import button from "../../assets/button.svg";

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
  const [pastSalesNames, setPastSalesNames] = useState([]);
  const [pastSales, setPastSales] = useState([]);
  const [showMyInfo, setShowMyInfo] = useState(true);

  // Sobre QUERIES
  const [currentQueryIndex, setQueryIndex] = useState(0); // classe da qual os produtos estão aparecendo
  const [currentSalesIndex, setSalesIndex] = useState(0); // classses da sidebar 2
  const [qtdProducts, setQtdProducts] = useState(0); // quantidade total de items a serem mostrados, nao apenas no productsData
  const [productsData, setProductsData] = useState([]); // modelo: { id: 'product18', name: 'Shadowed Tower Netch Leather Shield', price: 300, image: `${boneArrow}` },
  const [saleInfo, setSaleInfo] = useState([]);

  // Sobre o modal
  const [address, setAddress] = useState('');
  const [errorBuying, setErrorBuying] = useState(null);

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
    async function fetchUserAndPreviousOrders() {
        const user = await WhoAmI(flag);
        setWhoIAm(user);
        setAddress(user.address);

        const endpoint = `http://localhost:8080/previousOrders/${user.email}`;
        const response = await fetch(endpoint, {
            method: "GET",
        });

        if (response.ok) {
          const res = await response.json();
          setPastSalesNames(res.filter(item => item.finished).map(item => `#${item.id}`))
          setPastSales(res.filter(item => item.finished))
        }

    } fetchUserAndPreviousOrders();

    return () => {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundPosition = '';
      document.body.style.backgroundAttachment = '';
    }
  }, []);

  

  const getPastSale = (id) => {
     async function fetchPastSales() {
        const endpoint = `http://localhost:8080/getSale/${id}`;
        const response = await fetch(endpoint, {
            method: "GET",
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }

        const res = await response.json();
        setProductsData(res.products);
     } fetchPastSales();
  }

  const getCart = () => {
    async function fetchCart() {
      const endpoint = `http://localhost:8080/getCart/${iAm.email}`;
      const response = await fetch(endpoint, {
          method: "GET",
      });

      if (response.ok) {
        const res = await response.json();
        setProductsData(res.products);
        setSaleInfo(res.sale);
      }
    } fetchCart();
  }

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
  const handleScrollSales= (direction) => {
    setSalesSideBarCenter(prevIndex => {
      if (types[sideBarCenter] !== 'PAST PURCHASES') {
        return prevIndex;
      }

      let newIndex = prevIndex;
      if (direction === 'up') {
        newIndex = ((prevIndex - 1)+pastSalesNames.length)%pastSalesNames.length;
      } else if (direction === 'down') {
        newIndex = ((prevIndex + 1)+pastSalesNames.length)%pastSalesNames.length;
      }

      return newIndex;      
    });
  };

  const handleAddressChange = (e) => {
    if(e.target.value !== '' && e.target.value !== null) setAddress(e.target.value);
  };


  // quando clicamos nas classes da sidebar 1
  const handleClickClasses = async (clickedOnIndex) => {
    const newIndex = (clickedOnIndex+types.length)%types.length;
    setSideBarCenter(newIndex);
    setQueryIndex(newIndex);

    setSelectedProduct(null);

    setSalesSideBarCenter(0);
    setSalesIndex(0);

    if (types[newIndex] == 'PAST PURCHASES' && pastSalesNames.length != 0) {
        // fazer request dos produtos da 1ª sale listada
        setSaleInfo(pastSales[0])
        getPastSale(pastSales[0].id);
    }

    if (types[newIndex] === "CART") {
      getCart();
    }
  };

  // quando clicamos nas classes da sidebar 2
  const handleClickSales  = (clickedOnIndex) => {
      const newIndex = (clickedOnIndex+pastSalesNames.length)%pastSalesNames.length;;
      setSalesSideBarCenter(newIndex);
      setSalesIndex(newIndex);
      setSelectedProduct(null);

      setSaleInfo(pastSales[newIndex])
      getPastSale(pastSales[newIndex].id);
  };

  // quando queremos uma nova página
  const handleNewPageQuery = (indexPage) => {
    const newPage = indexPage;
    setSelectedProduct(null);
    const newRequest = {type: types[currentQueryIndex], page: newPage, pageSize: qtdProductsPerPage, };
    NewCategory(newRequest, setProductsData, setQtdProducts);
  }   

  return (
    <>
    <div className={`container-user ${(types[currentQueryIndex] === "PAST PURCHASES" && pastSalesNames.length !== 0) ? 'two-sidebars' : 'one-sidebar'}`} >
      <Sidebar
        types={types}
        selectedClassIndex={sideBarCenter}
        onScroll={handleScrollClasses}
        onClassClick={handleClickClasses}
        showLogo={true}
      />

      <VertDiv1 id="vertDiv1" showArrow={(currentQueryIndex == sideBarCenter)} /> 

      {(types[currentQueryIndex] == "PAST PURCHASES" && pastSalesNames.length != 0) && (<>
        <Sidebar
            types={pastSalesNames}
            selectedClassIndex={salesSideBarCenter}
            onScroll={handleScrollSales}
            onClassClick={handleClickSales}
            showLogo={false}
        />
        <VertDiv1 id="vertDiv1.2" showArrow={(currentSalesIndex == salesSideBarCenter)} /> 
        </>
      )}
      
      <div className={`container2-user ${selectedProduct ? 'containerWithoutSelection' : 'containerWithSelection'}
                                       ${(types[currentQueryIndex] !== "PROFILE" && productsData.length !== 0) ? 'sale-info' : 'no-sale-info'}`}>
        <div className="navbar">
          <div className="searchbar-div">
            <p>Hello, {iAm.username}!</p>
          </div>
          <div className="navbuttons-div">
            <ProfileButton goToHome={true}/>
            <SessionButton/>
          </div>
        </div>
	
            {(
              (types[currentQueryIndex] === "CART" && productsData.length !== 0) ||
              (types[currentQueryIndex] === "PAST PURCHASES" && pastSales.length !== 0) ||
              (types[currentQueryIndex] !== "CART" && types[currentQueryIndex] !== "PAST PURCHASES" && types[currentQueryIndex] !== "PROFILE" && productsData.length !== 0)
            )&& (<>
                <div className="navbar-user">
                    <p>Status: {saleInfo.status}</p>
                    <p>Total Value: {saleInfo.totalPriceGold}</p>
                    
                    {(types[currentQueryIndex] === "CART") && (<>
                      <span>To deliver at: <input className="address-input" type='text' name='address' value={address} onChange={handleAddressChange}/></span>
                      <span id="login-button">
                        <svg
                            id="button1"
                            className="sessionButton"
                            viewBox="0 0 251 44"
                            xmlnssvg="http://www.w3.org/2000/svg"
                            onDragStart={(e) => e.preventDefault()}
                            onClick = {async (e) => {
                              try {
                                const response = await fetch(`http://localhost:8080/alterCartAddress/${iAm.email}/${address}`, {
                                  method: "POST",
                                });

                                if(!response.ok) {
                                  const errorText = await response.text();
                                  setErrorBuying(errorText);
                                  console.error(errorText);
                                }
                              } catch (error) {
                                setErrorBuying(`${error}`);
                                console.error(error);
                              }


                              const endpoint = `http://localhost:8080/finishOnlineSale/${iAm.email}`;
                              const response = await fetch(endpoint, {
                                  method: "POST",
                              });

                              if (!response.ok) {
                                  const errorText = await response.text();
                                  throw new Error(errorText);
                              }
                              setProductsData([]);
                              setSelectedProduct(null);
                              setErrorBuying(null);

                              async function fetchPreviousOrders() {
                                  const endpoint = `http://localhost:8080/previousOrders/${iAm.email}`;
                                  const response = await fetch(endpoint, {
                                      method: "GET",
                                  });

                                  if (!response.ok) {
                                      const errorText = await response.text();
                                      throw new Error(errorText);
                                  }

                                  const res = await response.json();
                                  setPastSalesNames(res.map((item) => {
                                    if (item.finished) return `#${item.id}`
                                  }))

                                  setPastSales(res.map((item) => {
                                    if (item.finished) return item
                                  }))
                              } fetchPreviousOrders();

                            }}
                        >
                            <image href={button}/>
                            <text
                            x="50%"
                            y="50%"
                            dominantBaseline="middle"
                            textAnchor="middle"
                            className="sessionText"
                            >
                            {"Finish purchase"}
                            </text>
                        </svg>
                    </span>
                    {errorBuying && (<>{errorBuying}</>)}
                    </>)}
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
                showPages={false}
                />

                {selectedProduct && (<>
                    <VertDiv2 id="vertDiv2" showArrow={false} arrowY={arrowY} />
                    <ProductInfo 
                      product={productsData.find(p => p.id === selectedProduct.id)}
                      saleInfo={saleInfo} 
                      editable={false} 
                      isItACart={true} 
                      setSelectedProduct={setSelectedProduct}
                      forDisplay={(types[currentQueryIndex] === "PAST PURCHASES")? true : false}
                      getCart={(types[currentQueryIndex] === "CART")? getCart : false}
                    />
                </>
                )}
            </>
            )}

            {(types[currentQueryIndex] === "CART") && (productsData.length === 0) && (<>
                <p> There are no products in your cart! </p>
            </>
            )}

            {(types[currentQueryIndex] === "PAST PURCHASES") && (pastSales.length === 0) && (<>
                <p> You haven't bought here yet! </p>
            </>
            )}

            {(types[currentQueryIndex] == "PROFILE") && (<>
                <div>
                  <p>Email: {iAm.email}</p>
                  <p>Address: {iAm.address}</p>
                  <p>Last login: {iAm.lastRun}</p>
                  <Link to="/editAccount">
                    <svg
                      className="edit-account-button"
                      viewBox="0 0 251 44"
                      xmlnssvg="http://www.w3.org/2000/svg"
                    >
                    <image href={button}/>
                    <text
                        x="50%"
                        y="50%"
                        dominantBaseline="middle"
                        textAnchor="middle"
                        className="sessionText"
                    >
                        Edit Account
                    </text>
                    </svg>
                  </Link>
                </div>
            </>   
            )}

      </div>

      <div className="rodape"> A série de jogos <i>The Elder Scrolls </i>e <i>The Elder Scrolls V: Skyrim </i> 
      são propriedade da Bethesda Softworks LLC: Todos os direitos reservados. Este website tem fins educacionais 
      e experimentais, e o tema foi escolhido apenas como plano de fundo.</div>

      
    </div>

    </>
  );

}

export default App;
