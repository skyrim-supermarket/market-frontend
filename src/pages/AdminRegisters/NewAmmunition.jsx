// src/App.js
import React, { useState, useEffect } from 'react';

import Logo from '../assets/gold.png';
import './NewSomething.css';
import button from "../assets/button.svg";

import setBackgroundImage from '../style-scripts/setBackgroundImage';


const NewAmmunition = () => {
  const preventDrag = (e) => e.preventDefault();
  document.title = "Insert new ammunition";


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
      image: null,
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
          <form>
            <label>
              <input type="text" placeholder="Product name" id="productName" name="productName" value={FormData.productName} onChange={handleChange} required/>
            </label><br/>
            <label>
              <input type="number" placeholder="Price" id="priceGold" name="priceGold" step="1" min="0" value={FormData.priceGold} onChange={handleChange} required/>
            </label><br/>
            <label>
              <input type="number" placeholder="Stock" id="stock" name="stock" step="1" min="0" value={FormData.stock} onChange={handleChange} required/>
            </label><br/>
            <label>
              <input type="text" placeholder="Description" id="description" name="description" value={FormData.description} onChange={handleChange} required/>
            </label><br/>
            <label>
              <input type="number" placeholder="Standard discount" id="standardDiscount" name="standardDiscount" step="1" min="0" max="100" value={FormData.standardDiscount} onChange={handleChange} required/>
            </label><br/>
            <label>
              <input type="number" placeholder="Special discount" id="specialDiscount" name="specialDiscount" step="1" min="0" max="100" value={FormData.specialDiscount} onChange={handleChange} required/>
            </label><br/>
            <label>
              <input type="text" placeholder="Magical" id="magical" name="magical" value={FormData.magical} onChange={handleChange} required/>
            </label><br/>
            <label>
              <input type="text" placeholder="Craft" id="craft" name="craft" value={FormData.craft} onChange={handleChange} required/>
            </label><br/>
            <label>
              <input type="number" placeholder="Speed" id="speed" name="speed" step="0.01" min="0" value={FormData.speed} onChange={handleChange} required/>
            </label><br/>
            <label>
              <input type="number" placeholder="Gravity" id="gravity" name="gravity" step="0.01" min="0" value={FormData.gravity} onChange={handleChange} required/>
            </label><br/>
            <label>
              <input type="text" placeholder="Category" id="category" name="category" value={FormData.category} onChange={handleChange} required/>
            </label><br/>
            <label>
              Choose an image:
              <input type="file" id="image" name="image" value={FormData.image} onChange={handleChange}/>
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
