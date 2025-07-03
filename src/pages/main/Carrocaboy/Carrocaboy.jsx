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
        if (myUserType != 'carrocaboy') navigate('/')
        const myUser = await WhoAmI('carrocaBoy')
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
    <div className="container-carrocaboy" >
        
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

        <VertDiv1 id="vertDiv1" showArrow={false} /> 

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
        
        <VertDiv1 id="vertDiv1" showArrow={false} /> 

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

      <div className="rodape"> A série de jogos <i>The Elder Scrolls </i>e <i>The Elder Scrolls V: Skyrim </i> 
      são propriedade da Bethesda Softworks LLC: Todos os direitos reservados. Este website tem fins educacionais 
      e experimentais, e o tema foi escolhido apenas como plano de fundo.</div>
    </div>
  );

}

export default App;
