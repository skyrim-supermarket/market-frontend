// src/components/ProductInfo.js
import React, { useEffect, useState } from 'react';
import './styles/ProductInfo.css';
import NewForm from '../query-scripts/NewForm';

function ProductInfo({ product, editable, category = "PRODUCT", labels  = {} }) {
  const [showForms, setShowForms] = useState(false);
  useEffect(() => {
    alert(Object.keys(product))
  }, []);

  if (!product) return null;

  return (
    <div id="product-info" className="product-info">
      <h3>{product.name}</h3>
      <img src={product.image} alt={product.name} />

      {Object.keys(product).map((key) => {
        if (key !== "image" && key !== "name" && (key != "id" || editable)) {
          let label = key.slice(0, 1).toUpperCase() + key.slice(1).toLowerCase();
          if (key === "Id") label = "ID"; 

          return <p key={key}>{label}: {product[key]}</p>;
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