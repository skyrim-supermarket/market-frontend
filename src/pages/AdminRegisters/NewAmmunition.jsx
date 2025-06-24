// src/App.js
import React, { useState, useEffect } from 'react';

import Logo from '../assets/gold.png';
import './NewSomething.css';
import button from "../assets/button.svg";

import setBackgroundImage from '../style-scripts/setBackgroundImage';


const NewAmmunition = () => {
  const preventDrag = (e) => e.preventDefault();
  document.title = "Insert new ammunition";

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
      productName: '',
      priceGold: 0,
      stock: 0,
      description: '',
      standardDiscount: 0,
      specialDiscount: 0,
      magical: '',
      craft: '',
      speed: 0,
      gravity: 0,
      category: '',
    });

  const [imageData, setImageData] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage('');
    setSuccessMessage('');

    console.log(FormData);

    const data = new FormData();
    data.append("productName", formData.productName);
    data.append("priceGold", formData.priceGold);
    data.append("stock", formData.stock);
    data.append("description", formData.description);
    data.append("standardDiscount", formData.standardDiscount);
    data.append("specialDiscount", formData.specialDiscount);
    data.append("magical", formData.magical);
    data.append("craft", formData.craft);
    data.append("speed", formData.speed);
    data.append("gravity", formData.gravity);
    data.append("category", formData.category);
    data.append("image", imageData);

    try {
      const response = await fetch("http://localhost:8080/newAmmunition", {
        method: "POST",
        body: data,
      });

      if(!response.ok) {
        const errorText = await response.text();
        setErrorMessage(errorText);
        throw new Error(errorText);
      }

      const result = await response.text();
      setSuccessMessage(result);
      setFormData({
        productName: '',
        priceGold: 0,
        stock: 0,
        description: '',
        standardDiscount: 0,
        specialDiscount: 0,
        magical: '',
        craft: '',
        speed: 0,
        gravity: 0,
        category: '',
      });
      setImageData(null);
    } catch(error) {
      setErrorMessage(error);
      throw new Error(error);
    }
  };

  useEffect(() => {
    setBackgroundImage();

    return () => {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundPosition = '';
      document.body.style.backgroundAttachment = '';
    }
  }, []);

  return (
    <div className="adminInsertionContainer" >

        <div className="adminInsertionHeader">
          <img className="logo" src={Logo} alt="Logo" />
        </div>
        <div className="adminInsertionForm">
          {errorMessage && <span style={{ color: "red" }}>{errorMessage}</span>}
          {successMessage && <span style={{ color: "green" }}>{successMessage}</span>}
          <form onSubmit={handleSubmit}>
            <label>
              <input type="text" placeholder="Product name" id="productName" name="productName" value={formData.productName} onChange={handleChange} required/>
            </label><br/>
            <label>
              <input type="number" placeholder="Price" id="priceGold" name="priceGold" step="1" min="0" value={formData.priceGold} onChange={handleChange} required/>
            </label><br/>
            <label>
              <input type="number" placeholder="Stock" id="stock" name="stock" step="1" min="0" value={formData.stock} onChange={handleChange} required/>
            </label><br/>
            <label>
              <input type="text" placeholder="Description" id="description" name="description" value={formData.description} onChange={handleChange} required/>
            </label><br/>
            <label>
              <input type="number" placeholder="Standard discount" id="standardDiscount" name="standardDiscount" step="1" min="0" max="100" value={formData.standardDiscount} onChange={handleChange} required/>
            </label><br/>
            <label>
              <input type="number" placeholder="Special discount" id="specialDiscount" name="specialDiscount" step="1" min="0" max="100" value={formData.specialDiscount} onChange={handleChange} required/>
            </label><br/>
            <label>
              <input type="text" placeholder="Magical" id="magical" name="magical" value={formData.magical} onChange={handleChange} required/>
            </label><br/>
            <label>
              <input type="text" placeholder="Craft" id="craft" name="craft" value={formData.craft} onChange={handleChange} required/>
            </label><br/>
            <label>
              <input type="number" placeholder="Speed" id="speed" name="speed" step="0.01" min="0" value={formData.speed} onChange={handleChange} required/>
            </label><br/>
            <label>
              <input type="number" placeholder="Gravity" id="gravity" name="gravity" step="0.01" min="0" value={formData.gravity} onChange={handleChange} required/>
            </label><br/>
            <label>
              <input type="text" placeholder="Category" id="category" name="category" value={formData.category} onChange={handleChange} required/>
            </label><br/>
            <label>
              Choose an image:
              <input type="file" id="image" name="image" onChange={(e) => setImageData(e.target.files[0])}/>
            </label>


            <label>
              <input type="submit" style={{ display: "none" }} />
              <svg
                id="button1"
                className="button"
                viewBox="0 0 251 44"
                xmlnssvg="http://www.w3.org/2000/svg"
                onDragStart={preventDrag}
              >
                <image href={button}/>
                <text
                  x="50%"
                  y="50%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  className="buttonText"
                >
                  Insert Ammunition
                </text>
              </svg>
            </label>
          </form>
        </div>

        <div className="adminInsertionFooter"> 
          <p>The game series <i>The Elder Scrolls </i>and <i> The Elder Scrolls V: Skyrim </i> are property of
          Bethesda Softworks LLC: All rights reserved. This website has educational and experimental purposes.</p>
        </div>
    </div>
  );
};

export default NewAmmunition;
