// src/components/ProductInfo.js
import React, { useEffect, useState } from 'react';
import './styles/ProductInfo.css';
import NewForm from '../query-scripts/NewForm';
import GetAllProductInfo from '../query-scripts/GetAllProductInfo'


function ProductInfo({ product, editable, category = "PRODUCT"}) {
  const [showForms, setShowForms] = useState(false);
  const [info, setInfo] = useState({});

  useEffect(() => {
    if (category === "PRODUCTS") {
      async function fetchProductInfo() {
          setInfo(await GetAllProductInfo(product.id));
      } fetchProductInfo();
    }

    else {
      setInfo(product);
    }

  }, [product])

  return (
    <div id="product-info" className="product-info">
      <h3>{product.name}</h3>
      <img src={product.image} alt={product.name} />

      {Object.keys(info).map((key) => {
        if (key !== "image" && key !== "name" && (key != "id" || editable)) {
          let label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
          
          let value = info[key];
          if (value === "true" || value === "false") {
            value = value === "true" ? "Yes" : "No";
          }
          return <p key={key}>{((key !== "id") ? label : "ID")}: {((key !== "id") ? String(value) : String(value).replace(/\D/g, ''))}</p>;
        }
        return null;
      })}

      {editable && (<>
        <button onClick={() => {
        }}> Edit </button>
      </>
      )}

      {!editable && (<>
        <button>
        Add to cart </button> 
      </>)}

    </div>
  );
}

export default ProductInfo;