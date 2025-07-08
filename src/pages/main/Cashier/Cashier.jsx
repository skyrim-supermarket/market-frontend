// src/App.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import button from "../../assets/button.svg";

// componentes
import ProfileButton from '../../components/ProfileButton';
import SessionButton from '../../components/SessionButton';
import Sheet from '../../components/Sheet';

// estilo
import VertDiv1 from '../../components/VerticalDiv1';
import './Cashier.css';

// scripts
import setBackgroundImage from '../../style-scripts/setBackgroundImage';
import WhatAmI from '../../query-scripts/WhatAmI';
import WhoAmI from '../../query-scripts/WhoAmI';
import GetAllProductInfo from '../../query-scripts/GetAllProductInfo';

function App() {
  document.title = "Home";
  const navigate = useNavigate();
  const qtdProductsPerPage = 5; // vida verdade e universo

  // SOBRE ESTILO
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Sobre QUERIES
  const inputRef = useRef(null);
  const [qtdProducts, setQtdProducts] = useState(0); // quantidade total de items a serem mostrados, nao apenas no productsData
  const [productsData, setProductsData] = useState([]); // modelo: { id: 'product18', name: 'Shadowed Tower Netch Leather Shield', price: 300, image: `${boneArrow}` },
  const [currentShowingData, setCurrentShowingData] = useState(null); 
  const [onSale, setAreWeSellingStuff] = useState(false);
  const [gettingClientInfo, setAreWeGettingClientInfo] = useState(false);

  // sobre USER
  const [whatIAm, setWhatIAm] = useState('none');
  const [whoIAm, setWhoIAm] = useState('none');

  const handleAddProduct = async (value) => {
    async function fetchInfo() {
      let fetchedInfo = {};
      fetchedInfo = await GetAllProductInfo(value);
      fetchedInfo.qtd = 1;

      setSelectedProduct(fetchedInfo);
      setCurrentShowingData(fetchedInfo);
      setProductsData(prevData => [...prevData, fetchedInfo]);

    }

    const endpoint = `http://localhost:8080/addToIrlPurchase/${value}/${whoIAm.email}`;
    const response = await fetch(endpoint, {
        method: "POST",
    });

    if (!response.ok) {
        const errorText = await response.text();
        if (errorText !== "This product is already in this purchase!") {
            throw new Error(errorText);
        } 
    } else {
        fetchInfo();
    }

  }

  const handleNewAmount = (product) => {
    return async (value) => {
        if(Number.isInteger(Number(value)) && Number(value)>0) {
            const endpoint = `http://localhost:8080/alterQuantityIrlPurchase/${product.id}/${whoIAm.email}/${value}`;
            const response = await fetch(endpoint, {
                method: "POST",
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }

            let info = selectedProduct
            info.qtd = value;

            setSelectedProduct(info);
            setCurrentShowingData(info);
            setProductsData(prevData =>
                prevData.map(p => p.id === product.id ? { ...p, qtd: value } : p )
            );
        }
    }
  }

  const handleDeleteProduct = async (product) => {
    const endpoint = `http://localhost:8080/deleteFromIrlPurchase/${product.id}/${whoIAm.email}`;
    const response = await fetch(endpoint, {
        method: "DELETE",
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
    }

    setSelectedProduct(null);
    setCurrentShowingData(null);
    setProductsData(prevData =>
        prevData.filter(p => p.id !== product.id)
    );
  }

  const handleAddClientEmail = async (email) => {
    const endpoint = `http://localhost:8080/addClientToIrlPurchase/${whoIAm.email}/${email}`;
    const response = await fetch(endpoint, {
        method: "POST",
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
    }
  }

  const handleFinishSale = async () => {
    const endpoint = `http://localhost:8080/finishIrlSale/${whoIAm.email}`;
    const response = await fetch(endpoint, {
        method: "POST",
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
    }
  }

  // inicialização
  useEffect(() => {
    setBackgroundImage(); // seta imagem de fundo

    // vê quem eu sou
    async function fetchUser() {
        const myUserType = await WhatAmI()
        setWhatIAm(myUserType);
        if (myUserType != 'cashier') navigate('/')
        const myUser = await WhoAmI(myUserType)
        setWhoIAm(myUser);
    } fetchUser();
    
    return () => {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundPosition = '';
      document.body.style.backgroundAttachment = '';
    }
  }, []);

  // toda vez que clicamos num produto, ou ele é selecionado ou deselecionado
  const handleProductSelect = (product) => {
    setCurrentShowingData((selectedProduct === product) ? null : product);
    setSelectedProduct(prevProduct => (prevProduct && prevProduct.id === product.id ? null : product));
  };

  return (
    <div className="container-cashier" >
        <div className='main-cashier-area'> 

            {(!onSale) && (<>
                <span id="login-button">
                    <svg
                        id="button1"
                        className="sessionButton"
                        viewBox="0 0 251 44"
                        xmlnssvg="http://www.w3.org/2000/svg"
                        onDragStart={(e) => e.preventDefault()}
                        onClick = {async (e) => {
                            setAreWeSellingStuff(true);
                            setAreWeGettingClientInfo(false);
                            const endpoint = `http://localhost:8080/newIrlPurchase/${whoIAm.email}`;
                            const response = await fetch(endpoint, {
                                method: "POST",
                            });

                            if (!response.ok) {
                                const errorText = await response.text();
                                throw new Error(errorText);
                            }
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
                        Start a new sale
                        </text>
                    </svg>
                </span>
            </>)}

            {(currentShowingData === null && onSale) && (<>
                {(gettingClientInfo) && (<>
                    Procede to finish sale.
                </>)}
                {(!gettingClientInfo) && (<>
                <p> Insert a new product. </p>
                </>)}
            </>)}

            {(currentShowingData !== null && onSale) && (<>
                <img src={currentShowingData.image} alt={currentShowingData.name} />
                <p> {currentShowingData.productName} #{currentShowingData.id} </p>
            </>)}

        </div>

      <VertDiv1 id="vertDiv1" showArrow={(currentShowingData !== null)} /> 

      <div className={`container2-cashier ${selectedProduct ? 'containerCashierWithSelection' : 'containerCashierWithoutSelection'}`}>
        <div className="navbar-cashier">
          <div className="navbuttons-cashier-div">
            {onSale && <>
                <ProfileButton goToHome={null} iAm={whatIAm} additionalFunction={async (e) => {
                if (onSale) { 
                    const endpoint = `http://localhost:8080/cancelIrlPurchase/${whoIAm.email}`;
                    const response = await fetch(endpoint, {
                        method: "DELETE",
                    });
                    if (!response.ok) {
                        const errorText = await response.text();
                        throw new Error(errorText);
                    }
                
                    setAreWeSellingStuff(false);
                    setProductsData([]);
                    setSelectedProduct(null);
                    setCurrentShowingData(null);
                }
            }}/>
            </>}
            <SessionButton setIAm={setWhatIAm}/>
          </div>
        </div>

        {onSale && (<>

            {!gettingClientInfo && (<>
                <div className="cashier-insert-div">
                    <input type="text" id="cashier-insert" placeholder="Insert product ID" ref={inputRef}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleAddProduct(e.target.value);
                            inputRef.current.value = "";
                        }
                    }} />
                </div>
            
            <Sheet
                n={qtdProducts}
                qtdProductsPerPage={qtdProductsPerPage} 
                data={productsData}
                selectedItem={selectedProduct}
                onItemSelect={handleProductSelect}
                onSelectedItemPositionChange={null}
                onNewQuery={() => {}}
                showStock={true}
                currentQueryIndex={(currentShowingData !== null)}  // passa isso só pra poder resetar a page selector quando uma nova classe é escolhida
                showPages={false}
            />
            
            {(selectedProduct !== null) && (<>
                <div className="navbuttons-cashier-div">
                    <label id="howMany">
                        How many? <input type="number" className='form-number' min={1} max={selectedProduct.stock} value={selectedProduct.qtd}
                        onChange={(e) => {handleNewAmount(selectedProduct)(e.target.value)}}/>
                    </label>
                    <span id="login-button">
                        <svg
                            id="button1"
                            className="sessionButton"
                            viewBox="0 0 251 44"
                            xmlnssvg="http://www.w3.org/2000/svg"
                            onDragStart={(e) => e.preventDefault()}
                            onClick = {(e) => {handleDeleteProduct(selectedProduct)}}
                        >
                            <image href={button}/>
                            <text
                            x="50%"
                            y="50%"
                            dominantBaseline="middle"
                            textAnchor="middle"
                            className="sessionText"
                            >
                            {"Delete product"}
                            </text>
                        </svg>
                    </span>
                </div>
                </>)}
            </>)}

            {gettingClientInfo && (<>
                <div className="cashier-insert-div">
                    <div>Add client email if requested.</div>
                    <input type="text" id="cashier-insert" placeholder="Insert client e-mail. (Optional)" ref={inputRef}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                if (e.target.value !== "") {
                                    handleAddClientEmail(e.target.value);
                                }
                                inputRef.current.value = "";
                            }
                        }} />
                </div>
                <div>Total: {
                    productsData.reduce((total, product) => {
                    return total + (product.priceGold * product.qtd);
                    }, 0)
                } gold </div>
                <div></div>
            </>)}

            <div className="navbuttons-cashier-div">
                <span id="login-button">
                    <svg
                        id="button1"
                        className="sessionButton"
                        viewBox="0 0 251 44"
                        xmlnssvg="http://www.w3.org/2000/svg"
                        onDragStart={(e) => e.preventDefault()}
                        onClick = {(e) => {
                            if (productsData.length != 0)
                                if (!gettingClientInfo) {
                                    setAreWeGettingClientInfo(true); 
                                    setCurrentShowingData(null);;
                                } else {
                                    handleFinishSale();
                                    setAreWeGettingClientInfo(false);
                                    setCurrentShowingData(null);
                                    setProductsData([]);
                                    setAreWeSellingStuff(false);
                                }
                        ;}}
                    >
                        <image href={button}/>
                        <text
                        x="50%"
                        y="50%"
                        dominantBaseline="middle"
                        textAnchor="middle"
                        className="sessionText"
                        >
                        {gettingClientInfo ? "Finish sale" : "Finish product insertion"}
                        </text>
                    </svg>
                </span>
            </div>
        </>)}

        {!onSale && (<>
            <div></div>
            <div className="cashier-insert-div">
                <p>No products to show.</p>
            </div>
        </>)}
        
      </div>

      <div className="rodape"> A série de jogos <i>The Elder Scrolls </i>e <i>The Elder Scrolls V: Skyrim </i> 
      são propriedade da Bethesda Softworks LLC: Todos os direitos reservados. Este website tem fins educacionais 
      e experimentais, e o tema foi escolhido apenas como plano de fundo.</div>
    </div>
  );

}

export default App;
