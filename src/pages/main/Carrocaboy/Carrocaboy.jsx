/// disponives, as q tem q entregar e as q ele já entregou
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
import './Carrocaboy.css';

// scripts
import setBackgroundImage from '../../style-scripts/setBackgroundImage';
import WhatAmI from '../../query-scripts/WhatAmI';
import WhoAmI from '../../query-scripts/WhoAmI';
import GetAllProductInfo from '../../query-scripts/GetAllProductInfo';

function App() {
  document.title = "Home";
  const navigate = useNavigate();
  const qtdProductsPerPage = 5; // vida verdade e universo

  // Sobre QUERIES
  const [qtdProducts, setQtdProducts] = useState(0); // quantidade total de items a serem mostrados, nao apenas no productsData
  
  const [allAvailableOrders, setAllAvailableOrders] = useState([]); // modelo: { id: 'product18', name: 'Shadowed Tower Netch Leather Shield', price: 300, image: `${boneArrow}` },
  const [myCurrentOrders, setMyCurrentOrders] = useState([]); // modelo: { id: 'product18', name: 'Shadowed Tower Netch Leather Shield', price: 300, image: `${boneArrow}` },
  const [myPastOrders, setMyPastOrders] = useState([]); // modelo: { id: 'product18', name: 'Shadowed Tower Netch Leather Shield', price: 300, image: `${boneArrow}` },

  const [selectedAvailableOrder, setSelectedAvailableOrder] = useState([]);
  const [selectedMyCurrentOrder, setSelectedMyCurrentOrder] = useState([]);
  const [selectedMyPastOrder, setSelectedMyPastOrder] = useState([]);

  // sobre USER
  const [whatIAm, setWhatIAm] = useState('none');
  const [whoIAm, setWhoIAm] = useState('none');

  const handleAcceptOrder = async (id) => {
    const endpoint = `http://localhost:8080/acceptOrder/${whoIAm.email}/${id}`;
    const response = await fetch(endpoint, {
        method: "POST",
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
    }

    setAllAvailableOrders(prev =>
        prev.filter(item => item.id !== id)
    );
    window.location.reload();
  }

  const handleDeliverOrder = async (id) => {
    
    const endpoint = `http://localhost:8080/deliverOrder/${whoIAm.email}/${id}`;
    const response = await fetch(endpoint, {
        method: "POST",
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
    }

    setMyPastOrders([...myPastOrders, myCurrentOrders[0]])
    setMyCurrentOrders([])
  }

  // inicialização
  useEffect(() => {
    setBackgroundImage(); // seta imagem de fundo

    // vê quem eu sou
    async function fetchUserAndSales() {
        const myUserType = await WhatAmI()
        setWhatIAm(myUserType);
        if (myUserType != 'carrocaboy') navigate('/')
        const myUser = await WhoAmI('carrocaBoy')
        setWhoIAm(myUser);

        // available sales
        let endpoint = `http://localhost:8080/availableSales`;
        let response = await fetch(endpoint, {
            method: "GET",
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }
        let res = await response.json();
        setAllAvailableOrders(res);

        console.log(res);

        // to be delivered sales
        endpoint = `http://localhost:8080/salesToBeDelivered/${myUser.email}`;
        response = await fetch(endpoint, {
            method: "GET",
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }
        res = await response.json();
        setMyCurrentOrders(res);


        // past sales
        endpoint = `http://localhost:8080/previousSales/${myUser.email}`;
        response = await fetch(endpoint, {
            method: "GET",
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }
        res = await response.json();
        setMyPastOrders(res);
        console.log(res);

    }  fetchUserAndSales();

    return () => {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundPosition = '';
      document.body.style.backgroundAttachment = '';
    }
  }, []);

  useEffect(() => {setSelectedMyCurrentOrder(myCurrentOrders[0])}, [myCurrentOrders])

  return (
    <div className="container-carrocaboy" >
        <div className='button-carrocaboy'> 
            <span>{`Hello, ${whoIAm.username}!`}</span>
            <SessionButton/> 
            </div>
        
        <div className='container2-carrocaboy'> 
            <div className='div-carrocaboy'>
                <p>Available orders:</p>
                {(allAvailableOrders.length === 0) && (<> <p>No available orders.</p> </>)}
                {(allAvailableOrders.length !== 0) && (<> 
                <span id="login-button">
                    <svg
                        id="accept-button1"
                        className="sessionButton"
                        viewBox="0 0 251 44"
                        xmlnssvg="http://www.w3.org/2000/svg"
                        onDragStart={(e) => e.preventDefault()}
                        onClick = {(e) => {if (allAvailableOrders.length !== 0) handleAcceptOrder(selectedAvailableOrder.id)}}
                    >
                        <image href={button}/>
                        <text
                        x="50%"
                        y="50%"
                        dominantBaseline="middle"
                        textAnchor="middle"
                        className="sessionText"
                        >
                        Accept order
                        </text>
                    </svg>
                </span>
                <Sheet
                        n={qtdProducts}
                        qtdProductsPerPage={qtdProductsPerPage} 
                        data={allAvailableOrders}
                        selectedItem={selectedAvailableOrder}
                        onItemSelect={(product) => {setSelectedAvailableOrder(prevProduct => (prevProduct && prevProduct.id === product.id ? null : product))}}
                        onSelectedItemPositionChange={null}
                        onNewQuery={() => {}}
                        showStock={false}
                        currentQueryIndex={(false)}  // passa isso só pra poder resetar a page selector quando uma nova classe é escolhida
                        showPages={false}
                        isItAProduct={false}
                        showGold={false}
                        isItASale={true}
                    />
                    </>)}
            </div>

            <VertDiv1 id="vertDiv1" showArrow={false} /> 

            <div className='div-carrocaboy'>
                <p>Current order:</p>
            {(myCurrentOrders.length === 0) && (<> No current orders. </>)}
            {(myCurrentOrders.length !== 0) && (<> 
                {Object.keys(myCurrentOrders[0]).map((key) => {
                    if (key == "idClient") {
                        async function getClientAddress() {
                            let endpoint = `http://localhost:8080/clientById/${myCurrentOrders[0][key]}`;
                            let response = await fetch(endpoint, {
                                method: "GET",
                            });
                            if (!response.ok) {
                                const errorText = await response.text();
                                throw new Error(errorText);
                            }
                            let res = await response.json();
                            return res;
                        }
                        return <p>Client Address: {getClientAddress().address}</p>
                    } else return <p>{key}: {myCurrentOrders[0][key]}</p>
                })}
                <span id="login-button">
                <svg
                    id="button1"
                    className="sessionButton"
                    viewBox="0 0 251 44"
                    xmlnssvg="http://www.w3.org/2000/svg"
                    onDragStart={(e) => e.preventDefault()}
                    onClick = {(e) => {if (selectedMyCurrentOrder !== null) handleDeliverOrder(selectedMyCurrentOrder.id); }}
                >
                    <image href={button}/>
                    <text
                    x="50%"
                    y="50%"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    className="sessionText"
                    >
                    Confirm order deliver
                    </text>
                </svg>
            </span>
            </>)}
            </div>
        
            <VertDiv1 id="vertDiv1" showArrow={false} /> 

            <div className='div-carrocaboy'>
                <p>Completed orders:</p>
            {(myPastOrders.length === 0) && (<> No past orders. </>)}
            {(myPastOrders.length !== 0) && (<> 
            <Sheet
                    n={qtdProducts}
                    qtdProductsPerPage={qtdProductsPerPage} 
                    data={myPastOrders}
                    selectedItem={selectedMyPastOrder}
                    onItemSelect={(product) => {setSelectedMyPastOrder(prevProduct => (prevProduct && prevProduct.id === product.id ? null : product))}}
                    onSelectedItemPositionChange={null}
                    onNewQuery={() => {}}
                    showStock={false}
                    currentQueryIndex={(false)}  // passa isso só pra poder resetar a page selector quando uma nova classe é escolhida
                    showPages={false}
                    showGold={false}
                    isItASale={true}
                />
            </>)}
            </div>
        </div>
    

      <div className="carroca-rodape"> A série de jogos <i>The Elder Scrolls </i>e <i>The Elder Scrolls V: Skyrim </i> 
      são propriedade da Bethesda Softworks LLC: Todos os direitos reservados. Este website tem fins educacionais 
      e experimentais, e o tema foi escolhido apenas como plano de fundo.</div>
    </div>
  );

}

export default App;
