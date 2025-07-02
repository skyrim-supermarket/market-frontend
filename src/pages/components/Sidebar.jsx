// src/pages/MainPage/components/Sidebar.js
import React, { useState, useEffect, useRef } from 'react';
import './styles/Sidebar.css';
import useWindowSize from '../hooks/useWindowSize'; // Caminho ajustado
import gold from '../assets/gold.png';
import { getCLS } from 'web-vitals';

function Sidebar({ types, selectedClassIndex, onScroll, onClassClick, showLogo }) {
  const sidebarRef = useRef(null);
  const isIgnoringInputRef = useRef(false);
  const { height: windowHeight } = useWindowSize();

  const [visibleItemsCount, setVisibleItemsCount] = useState(0);

  useEffect(() => {
    let qtd;
    if (windowHeight >= 980 && types.length >= 8)
      qtd = 9;
    else if (windowHeight >= 760 && types.length >= 6)
      qtd = 7;
    else if (windowHeight >= 640 && types.length >= 4)
      qtd = 5;
    else if (types.length >= 3)
      qtd = 3;
    else 
      qtd = 1;
    setVisibleItemsCount(qtd);
  }, [windowHeight, types]);

  const lim = Math.floor(visibleItemsCount / 2);
  const displayTypes = [];

  if (types.length%2 == 0 && types.length < visibleItemsCount) {
    displayTypes.push({ name: "\0", index: selectedClassIndex - lim });
    for (let j = selectedClassIndex - lim + 1; j <= selectedClassIndex + lim; j += 1) {
      let id = j % types.length;
      if (id < 0) id += types.length;
      displayTypes.push({ name: types[id], index: j });
    }
  } else {
    for (let j = selectedClassIndex - lim; j <= selectedClassIndex + lim; j += 1) {
      let id = j % types.length;
      if (id < 0) id += types.length;
      displayTypes.push({ name: types[id], index: j });
    }
  }

  

  const getClassName = (itemIndex) => {
    if (itemIndex === selectedClassIndex) return `sideBarItem centerSelected`;
    const diff = Math.abs(itemIndex - selectedClassIndex);
    if (diff === 1) return `sideBarItem center`;
    if (diff === 2) return `sideBarItem edge1`;
    if (diff === 3) return `sideBarItem edge2`;
    if (diff === 4) return `sideBarItem edge3`;
    return `sideBarItem`;
  };

  useEffect(() => {
    const handleWheel = (event) => {
      if (isIgnoringInputRef.current) {
        event.preventDefault(); 
        return;
      }

      if (sidebarRef.current && sidebarRef.current.contains(event.target)) {
        if (event.deltaY > 0) {
          onScroll('down');
        } else if (event.deltaY < 0) {
          onScroll('up');
        }

        isIgnoringInputRef.current = true;
        setTimeout(() => {
          isIgnoringInputRef.current = false;
        }, 150); // ignora o scroll por 200ms --> evita que com mouse pad fique girando que nem pião da casa própria
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [onScroll]);

    const handleClick = (classIndex) => { 
      return (event) => {
        onClassClick(classIndex);
    }};

  return (
    <div className="sidebar" ref={sidebarRef}>
      <div>
        {/* a */}
        {showLogo && (<>
          <img className="logo" src={gold} alt="Logo" />
        </>)}
      </div>
      <div className="productClasses">
        <ul id="classes-ul">
          {displayTypes.map((type) => (
            <li id={type.index} key={type.index} className={getClassName(type.index)} onClick={handleClick(type.index)}>
              <a> {type.name}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
