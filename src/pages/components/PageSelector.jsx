import React, { useState } from "react";
import './styles/Selector.css';
import { ReactComponent as PageLeft } from '../assets/pageLeft.svg';  // gambiarra
import { ReactComponent as PageRight } from '../assets/pageRight.svg';

function PageSelector({ n, maximum, onPageClick, selectedPage, startPage, setStartPage }) {
  const numberPages = Math.ceil(n/maximum);
  const pagesPerGroup = 5;

  const handlePageClick = (pageNumber) => {
    onPageClick(pageNumber);      // tem q arrumar no product list
  };

  const handlePrevGroup = () => {
    setStartPage(Math.max(startPage-pagesPerGroup, 1)); // qnd o usuário clica na seta da esquerda, faz voltar nas paginas pra esquerda
  };

  const handleNextGroup = () => {
    const newStart = startPage+pagesPerGroup; // qnd o usuário clica na seta da direita, faz voltar nas paginas pra direita
    if (newStart <= numberPages) {
      setStartPage(newStart);     
    }
  };

  let visiblePages = [];
  for (let i = 0; i < pagesPerGroup; i++) {
    const page = startPage + i;
    if (page <= numberPages) {
      visiblePages.push(page);
    }
  }

  return (
    <div className="page-selector">
      {(startPage > 1) ? (
        <PageLeft                           // se a startPage for maior q 1, mostra a seta pra esquerda
          className="arrow-icon clickable"
          onClick={handlePrevGroup}
          role="button"
          aria-label="Página anterior"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handlePrevGroup()}
        />
      ) : (
        <div className="arrow-placeholder" />   // senao, cria um placeholder de msm tamanho
      )}

      {visiblePages.map((page) => (
        <button
          key={page}
          className={`page-number ${selectedPage === page ? "pageSelected" : ""}`}
          onClick={() => handlePageClick(page)} // curry de novo
        >
          {page}
        </button>
      ))}

      {(startPage+pagesPerGroup <= numberPages) ? ( 
        <PageRight                      // se a startPage+5 for nao for maior que a quantidade de paginas, mostra a seta pra direita
          className="arrow-icon clickable"
          onClick={handleNextGroup}
          role="button"
          aria-label="Próxima página"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleNextGroup()}
        />
      ) : (
        <div className="arrow-placeholder" /> // senao cria um placeholder tb
      )}
    </div>
  );
}

export default PageSelector;
