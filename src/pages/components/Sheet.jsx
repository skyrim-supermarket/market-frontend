// src/components/ProductList.js
import React, { useEffect, useRef, useState } from 'react';
import SheetItem from './SheetItem';
import './styles/Sheet.css';
import PageSelector from './PageSelector';

function MarqueeOfItems({data}) {
  // função com responsabilidade de cuidar do marquee dos items
  // depende apenas da lista de produtos 
  useEffect(() => {
    const elements = document.querySelectorAll('.sheet-item-name');
    elements.forEach(element => {
      const elementChild = element.querySelector('.sheet-item-name-text');
      if (elementChild) {
        const pw = elementChild.offsetWidth;
        const cw = element.offsetWidth;
        if (pw > cw) {
          elementChild.classList.add('text-overflow');
        } else {
          elementChild.classList.remove('text-overflow');
        }
      }
    });
  }, [data]); // selectedProducts?
}

function useArrowFollowsScroll({ sheetRef, selectedItem, onSelectedItemPositionChange }) {
  // função com responsabilidade de fazer a seta da div2 seguir o scroll do mouse
  useEffect(() => {
    const container = sheetRef.current;
    if (!container || !selectedItem) {
      if (onSelectedItemPositionChange) onSelectedItemPositionChange(null);
      return;
    }

    const updatePosition = () => {
      const selectedElement = document.getElementById(selectedItem.id);
      if (!selectedElement) {
        if (onSelectedItemPositionChange) onSelectedItemPositionChange(null);
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const selectedRect = selectedElement.getBoundingClientRect();

      const centerYInViewport = selectedRect.top + selectedRect.height / 2;
      const relativeY = centerYInViewport - containerRect.top;

      const isCenterVisible = centerYInViewport >= containerRect.top && centerYInViewport <= containerRect.bottom;

      if (onSelectedItemPositionChange) {
        if (isCenterVisible) {
          onSelectedItemPositionChange(relativeY);
        } else {
          onSelectedItemPositionChange(null);
        }
      }
    };

    updatePosition();
    container.addEventListener('scroll', updatePosition);
    window.addEventListener('resize', updatePosition);

    return () => {
      container.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, [sheetRef, selectedItem, onSelectedItemPositionChange]);
}

function ResetEntireListOnIndexChange({setStartPage, setSelectedPage, currentQueryIndex}) {
  useEffect(() => {
    setStartPage(1);
    setSelectedPage(1);
  }, [currentQueryIndex]);
}

function Sheet({ n, qtdProductsPerPage, data, onItemSelect, selectedItem, onSelectedItemPositionChange, onNewQuery, currentQueryIndex, alertAdminEdit, showStock = true, isItAProduct = true }) {
  const sheetRef = useRef(null);
  const [startPage, setStartPage] = useState(1);        // 1º cara da esquerda do grupo de paginas
  const [selectedPage, setSelectedPage] = useState(1);  // pagina selecionada

  MarqueeOfItems(data);
  useArrowFollowsScroll({sheetRef, selectedItem, onSelectedItemPositionChange});
  ResetEntireListOnIndexChange({setStartPage, setSelectedPage, currentQueryIndex});

  return (
    <div className={`listAndSelector`}>
      <div
        id="sheet"
        className={`sheet ${selectedItem ? 'itemSelected' : 'itemNotSelected'}`}
        ref={sheetRef}
      >
        {data.map(item => (
          <SheetItem
            key={item.id}
            item={item}
            isSelected={selectedItem && selectedItem.id === item.id}
            onSelect={onItemSelect}
            showStock={showStock}
            showGold={isItAProduct}
            alertSheet={alertAdminEdit}
          />
        ))}
      </div>
      <PageSelector 
        n={n}
        maximum={qtdProductsPerPage}
        onPageClick={(clickedOnPage) => {
          setSelectedPage(clickedOnPage);
          onNewQuery(clickedOnPage);
        }}
        selectedPage={selectedPage}
        startPage={startPage}
        setStartPage={setStartPage}
      /> 
    </div>
  );
}

export default Sheet;