// src/components/ProductItem.js
import React, { useEffect } from 'react';
import './styles/Sheet.css';
import gold from '../assets/gold.png';

function SheetItem({ item, onSelect, isSelected, showStock, showGold, alertSheet, isItASale = false}) {
  const handleClick = () => {
    onSelect(item);
  };

  useEffect(() => {
    if (item == null) alertSheet()
  }, [item])

  return (
    <div
      id={(showGold || isItASale) ? item.id : item.name}
      className={`sheet-item ${isItASale ? 'sheet-sale' : 'sheet-not-sale'} ${isSelected ? 'selected' : ''}`}
      onClick={handleClick}
    >
      <div className={`sheet-item-name`}>
        <span className="sheet-item-name-text">
          {showGold ? (
            <>
              {item.productName}
              {item.quantity != null && ` (x${item.quantity})`}
            </>
          ) : (
            isItASale
              ? `Order #${typeof item.id === 'string' ? item.id.slice(2) : item.id}`
              : item.username
          )}
        </span>
      </div>
      {(showGold || isItASale) && (<>
        <div className="sheet-item-price">
            <div className="sheet-item-price-gold">
            <img src={`${gold}`} alt="Gold" />
            </div>
            <div className="sheet-item-price-value">
            <span>{(isItASale)? item.totalPriceGold : (item.priceGold || item.price)}</span>
            </div>
        </div>
        {showStock && (<>
          <div className="sheet-item-stock">
            <span> Stock: {item.stock} </span>
        </div>
        </>)}
        {isItASale && (<>
          <div className='sheet-item-address'>
            <span>Address: {item.address}</span>
          </div>
        </>)} 
      </>)} 
     </div>
  );
}

export default SheetItem;