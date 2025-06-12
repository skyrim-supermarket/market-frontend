import React from "react";
import { useNavigate, Link } from "react-router-dom";
import './styles/Selector.css';
import PageLeft from '../assets/pageLeft.svg';
import PageRight from '../assets/pageRight.svg';

function PageSelector({ n, onPageClick }) {
  const handleSelectorClick = () => {
        // get new page
        // adiciona classe "pageSelected" no coiso selecionado (pra *brilhar*)
        return true;
    };

    // aqui temos que conseguir n sendo a quantidade de items -> no maximo 42 por pagina
    var maximum = 42.0;
    var numberPages = Math.ceil(n/maximum); 

  return (
    <select

      id={`${i}`}
      className={`page-index`}
      onClick={handleSelectorClick}
    >
        
    </select>
  );
}

export default PageSelector;