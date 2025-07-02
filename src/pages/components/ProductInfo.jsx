// src/components/ProductInfo.js
import React, { useEffect, useState } from 'react';
import './styles/ProductInfo.css';
import button from "../assets/button.svg";

// scripts
import NewForm from '../query-scripts/NewForm';
import GetAllProductInfo from '../query-scripts/GetAllProductInfo'

// buttons
import ProductInfoButton from './ProductInfoButton';

function ProductInfo({ product, editable, category = "PRODUCTS" }) {
  const [showForms, setShowForms] = useState(false);
  const [info, setInfo] = useState({});
  const [newInfo, setNewInfo] = useState({});
  const [imageData, setImageData] = useState(null);
  const [labels, setLabels] = useState({});

  // pega informações do produto
  useEffect(() => {
    async function fetchInfo() {
      let fetchedInfo = {};
      fetchedInfo = ((category === "PRODUCTS") ? (await GetAllProductInfo(product.id)) : product) ;
      setInfo(fetchedInfo);
    } fetchInfo();
    setNewInfo(info);
  }, [product]);

  // pega tipo de cada label
  useEffect(() => {
    async function fetchLabels() {
      await NewForm(((category === "PRODUCTS")? info.type : category), setLabels)
    }
    if (info.type != null || (category !== "PRODUCTS")) fetchLabels();
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
    setShowForms(!showForms)
  }

  const handleSubmit = () => {
    if (showForms) {
      // coloca aqui pra inserir mudanças
      // novas coisas estão em newInfo
      return 0;
    } else {
      // coloca aqui pra inserir no carrinho
      return 0;
    }
  }

  const putIntoCart = () => {
    alert(Object.keys(info));
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
          if (key !== "image" && (category !== "PRODUCTS" || key !== "name") && (key != "id")) {
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

        {(!editable || showForms) && (<>
          <span id="edit-button">
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
                  {showForms ? "Insert changes" : "Add to cart"}
                </text>
              </svg>
          </span>
          </>)}
      </form>

    </div>
  );
}

export default ProductInfo;