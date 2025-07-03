// src/components/ProductInfo.js
import React, { useEffect, useState } from 'react';
import './styles/ProductInfo.css';
import button from "../assets/button.svg";

// scripts
import NewForm from '../query-scripts/NewForm';
import GetAllProductInfo from '../query-scripts/GetAllProductInfo'
import WhatAmI from '../query-scripts/WhatAmI';
import WhoAmI from '../query-scripts/WhoAmI';

// buttons
import ProductInfoButton from './ProductInfoButton';

function ProductInfo({ product, editable, category = "PRODUCTS", isItACart = false, forDisplay = false, setSelectedProduct = () => {} }) {
  const [showForms, setShowForms] = useState(false);
  const [info, setInfo] = useState({});
  const [newInfo, setNewInfo] = useState({});
  const [imageData, setImageData] = useState(null);
  const [labels, setLabels] = useState({});

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [iAm, setWhoIAm] = useState('none');

  useEffect(() => {
    async function fetchUser() {
      const userType = await WhatAmI();
      if (userType !== 'user') setWhoIAm('none');

      const user = await WhoAmI(userType);
      setWhoIAm(user);
    } fetchUser();
  }, [])

  // pega informações do produto
  useEffect(() => {
    async function fetchInfo() {
      let fetchedInfo = {};
      fetchedInfo = ((category === "PRODUCTS") ? (await GetAllProductInfo(product.id)) : product) ;
      setInfo(fetchedInfo);
    } fetchInfo();
    setNewInfo(info);
    setErrorMessage('');
    setSuccessMessage('');
  }, [product]);

  // pega tipo de cada label
  useEffect(() => {
    async function fetchLabels() {
      await NewForm(((category === "PRODUCTS")? info.type : category), setLabels)
    }
    if ((info.type != null || (category !== "PRODUCTS")) && (category !== "SALES" && category !== "CLIENTS")) 
        fetchLabels();
    setNewInfo(info);
  }, [info]);

  // função pra coisar tipo <--> tipo do input
  const typeToInputType = (type) => {
    if (!type) return "text";
    const lower = type.toLowerCase();
    if (lower.includes("bool")) return "checkbox";
    if (lower.includes("int") || lower.includes("bigint")) return "number";
    if (lower.includes("double") || lower.includes("float")) return "number";
    if (lower.includes("varchar") || lower.includes("text")) return "text";
    return "text";
  }

  const handleChange = (e) => {setNewInfo({...newInfo, [e.target.name]: e.target.value});};

  const getForms = () => {
    setNewInfo(info)
    setShowForms(!showForms)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (iAm === 'none') return;

    if (isItACart) handleRemoveFromCart();
    else {

    setErrorMessage('');
    setSuccessMessage('');

    let data = new FormData();
    let endpoint = ''

    // CASO 1: EDITAR PRODUTO
    if (showForms) {
      // coloca aqui pra inserir mudanças
      // novas coisas estão em newInfo

      labels.forEach(({ name }) => {
        data.append(name, newInfo[name]);
      });

      if (imageData) {
        data.append("image", imageData);
      }

      const target = (category === "PRODUCTS") ? `Product/${product.id.slice(2)}` 
      : ((category === "ADMINS")? `Admins/${product.id}/${iAm.email}` : 
      `${category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}/${product.id.slice(2)}`);
      endpoint = `http://localhost:8080/edit${target}`;

    // CASO 2: COLOCAR PRODUTO NO CARRINHO
    } else {
      // coloca aqui pra inserir no carrinho
      data = {}
      endpoint = `http://localhost:8080/addToCart/${product.id.slice(2)}/${iAm.email}`;
    }

    try {
        const response = await fetch(endpoint, {
          method: "POST",
          body: data,
        });

        if (!response.ok) {
          const errorText = await response.text();
          setErrorMessage(errorText);
          throw new Error(errorText);
        }

        const result = await response.text();
        setSuccessMessage(result);

        if (showForms) {
          setNewInfo(info);
          setImageData(null);
          window.location.reload();
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
        
      } catch(error) {
        const errorText = error.message || "Unknown error occurred";
        setErrorMessage(errorText);
        console.error(error);
      }
  }}
  
  const handleRemoveFromCart = async (e) => {
    const endpoint = `http://localhost:8080/deleteFromCart/${product.id}/${iAm.email}`;
    const response = await fetch(endpoint, {
        method: "DELETE",
    });

    if (!response.ok) {
        const errorText = await response.text();
        setErrorMessage(errorText);
        throw new Error(errorText);
    }

    setSuccessMessage('Succesfully removed from cart.');
    setSelectedProduct(null);
  }

  const handleNewAmount = (product) => {
    return async (value) => {
        const endpoint = `http://localhost:8080/alterQuantityCart/${product.id}/${iAm.email}/${value}`;
        const response = await fetch(endpoint, {
            method: "POST",
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }

        product.totalQuantity = value;
    }
  }

  return (
    <div id="product-info" className="product-info">
      <h3>{product.name}</h3>
      
      <form onSubmit={handleSubmit}>
        {(!showForms) && (category == "PRODUCTS") && (<>
          <img src={product.image} alt={product.name} />
        </>)}

        {(editable && showForms && (category == "PRODUCTS")) && (<>
            <label>
            Choose an image:
            <input type="file" id="image" name="image" onChange={(e) => setImageData(e.target.files[0])}/>
          </label>
          </>
        )}

    
        {Object.keys(info).map((key) => {
          if (key !== "image" && (category !== "PRODUCTS" || key !== "name") && (key != "id") && key != "kind") {
            let name = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
            
            let value = info[key];
            if (value === "true" || value === "false") {
              value = value === "true" ? "Yes" : "No";
            }

            if (showForms) {
              const labelDef = labels.find(l => l.name === key);
              const labelType = typeToInputType(labelDef?.type);

              if (!(key.includes("created") || key.includes("updated") || key.includes("lastRun")))
              return (
                <label> {((key !== "id") ? name : "ID")}: 
                    <input 
                      type={labelType} 
                      placeholder={`Insert ${key.toLowerCase()}`} 
                      id={key} 
                      name={key} 
                      value={labelType === "checkbox" ? false : newInfo[key]}
                      onChange={handleChange} 
                      className={`form-${labelType}`} 
                      required={labelType !== 'checkbox'}
                      min={labelType === "number" ? 0 : undefined}
                      max={labelType === "number" ? 3600 : undefined}
                    />
                </label>
              )
            } else {
              return <p key={key}>{((key !== "id") ? name : "ID")}: {((key !== "id") ? String(value) : String(value).replace(/\D/g, ''))}</p>;
            }
          }
          return null;
        })}

        {editable && (<>
          <ProductInfoButton toEdit={!showForms} handleSubmit={getForms}/>
        </>)}

        {!forDisplay && (<>
        {errorMessage && <span style={{ color: "red" }}>{errorMessage}</span>}
        {successMessage && <span style={{ color: "green" }}>{successMessage}</span>}

        {((!editable || showForms) && !(category === "CLIENTS" || category === "SALES")) && (<>
          <span id="edit-button">
              {(isItACart) && (<>
                <label id="howMany">
                    How many? <input type="number" className='form-number' min={1} max={product.stock} value={product.totalQuantity}
                    onChange={(e) => {if (e.target.value != "") handleNewAmount(product)(e.target.value);}}/>
                </label>
              </>)}
              <label>
                <input type="submit" style={{ display: "none" }} />
                <svg
                  id="button1"
                  className="sessionButton"
                  viewBox="0 0 251 44"
                  xmlnssvg="http://www.w3.org/2000/svg"
                  onDragStart={(e) => e.preventDefault()}
                >
                  <image href={button}/>
                  <text
                    x="50%"
                    y="50%"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    className="sessionText"
                  >
                    {isItACart ? "Remove from cart" : showForms ? "Insert changes" : "Add to cart"}
                  </text>
                </svg>
              </label>
          </span>
          </>)}
          </>)}
      </form>

    </div>
  );
}

export default ProductInfo;