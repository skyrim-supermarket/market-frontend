// src/pages/MainPage/components/Sidebar.js
import React, { useState, useEffect, useRef } from 'react';
import '../styles/Sidebar.css';
import useWindowSize from '../hooks/useWindowSize'; // Caminho ajustado

function Sidebar({ types, selectedClassIndex, onScroll }) {
  const sidebarRef = useRef(null);
  const { height: windowHeight } = useWindowSize();

  const [visibleItemsCount, setVisibleItemsCount] = useState(0);

  useEffect(() => {
    let qtd;
    if (windowHeight >= 980)
      qtd = 9;
    else if (windowHeight >= 760)
      qtd = 7;
    else if (windowHeight >= 640)
      qtd = 5;
    else
      qtd = 3;
    setVisibleItemsCount(qtd);
  }, [windowHeight]);

  const lim = Math.floor(visibleItemsCount / 2);
  const displayTypes = [];

  for (let j = selectedClassIndex - lim; j <= selectedClassIndex + lim; j += 1) {
    let id = j % types.length;
    if (id < 0) id += types.length;
    displayTypes.push({ name: types[id], index: j });
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
      if (sidebarRef.current && sidebarRef.current.contains(event.target)) {
        if (event.deltaY > 0) {
          onScroll('down');
        } else if (event.deltaY < 0) {
          onScroll('up');
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [onScroll]);

  return (
    <div className="sidebar" ref={sidebarRef}>
      <div>
        {/* a */}
        <img className="logo" src="/assets/gold.png" alt="Logo" />
      </div>
      <div className="productClasses">
        <ul id="classes-ul">
          {displayTypes.map((type) => (
            <li key={type.index} className={getClassName(type.index)}>
              <a href="#!">{type.name}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;