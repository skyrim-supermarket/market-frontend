// src/components/ProductItem.js
import React, { useEffect } from 'react';
import './styles/Sheet.css';
import gold from '../assets/gold.png';

function SheetItem({ item, onSelect, isSelected, showStock, showGold, alertSheet}) {
  const handleClick = () => {
    onSelect(item);
  };

  useEffect(() => {
    if (item == null) alertSheet()
  }, [item])

  return (
    <div
      id={showGold ? item.id : item.name}
      className={`sheet-item ${isSelected ? 'selected' : ''}`}
      onClick={handleClick}
    >
      <div className="sheet-item-name">
        <span className="sheet-item-name-text">{item.name}</span>
      </div>
        {showGold && (<>
        <div className="sheet-item-price">
            <div className="sheet-item-price-gold">
            <img src={`${gold}`} alt="Gold" />
            </div>
            <div className="sheet-item-price-value">
            <span>{item.price}</span>
            </div>
        </div>
        {showStock && (<>
          <div className="sheet-item-stock">
            <span> Stock: {item.stock} </span>
        </div>
        </>)} 
      </>)} 
     </div>
  );
}

export default SheetItem;