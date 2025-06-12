// src/components/VerticalDiv.js
import React, { useEffect, useRef, useCallback } from 'react';
import useWindowSize from '../hooks/useWindowSize';

import seta from '../assets/seta2.svg'

function VerticalDiv1({ id, showArrow }) {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const { width: windowWidth, height: windowHeight } = useWindowSize();

  const straightLine = useCallback(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    svg.setAttribute('width', `${width}`);
    svg.setAttribute('height', `${height}`);
    svg.innerHTML = '';

    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }

    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    const gradientTop = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    gradientTop.setAttribute("id", "gradTop");
    gradientTop.setAttribute("x1", "0%");
    gradientTop.setAttribute("y1", "0%");
    gradientTop.setAttribute("x2", "0%");
    gradientTop.setAttribute("y2", "100%");
    gradientTop.innerHTML = `
      <stop offset="0%" stop-color="white" stop-opacity="0"></stop>
      <stop offset="25%" stop-color="white" stop-opacity="1"></stop>
      <stop offset="100%" stop-color="white" stop-opacity="1"></stop>
    `;
    const gradientBottom = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    gradientBottom.setAttribute("id", "gradBottom");
    gradientBottom.setAttribute("x1", "0%");
    gradientBottom.setAttribute("y1", "0%");
    gradientBottom.setAttribute("x2", "0%");
    gradientBottom.setAttribute("y2", "100%");
    gradientBottom.innerHTML = `
      <stop offset="0%" stop-color="white" stop-opacity="1"></stop>
      <stop offset="75%" stop-color="white" stop-opacity="1"></stop>
      <stop offset="100%" stop-color="white" stop-opacity="0"></stop>
    `;
    defs.appendChild(gradientTop);
    defs.appendChild(gradientBottom);
    svg.appendChild(defs);

    const x0 = width / 2;
    const y0 = 0;
    const y1 = height * 0.585 - 14;
    const y2 = height * 0.585;
    const y3 = height * 0.585 + 14;
    const y4 = height;

    // 1ª linha
    const line1 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    line1.setAttribute("x", x0 - 0.55);
    line1.setAttribute("y", y0);
    line1.setAttribute("width", 1.1);
    line1.setAttribute("height", y1);
    line1.setAttribute("fill", "url(#gradTop)");
    line1.setAttribute('id', 'line1');
    svg.appendChild(line1);

    // 2ª linha
    const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line2.setAttribute('x1', `${x0}`);
    line2.setAttribute('x2', `${x0}`);
    line2.setAttribute('y1', `${y1}`);
    line2.setAttribute('y2', `${y2}`);
    line2.setAttribute('stroke', "white");
    line2.setAttribute('stroke-width', 1.1);
    line2.setAttribute('id', 'line2');
    svg.appendChild(line2);

    // 3ª linha
    const line3 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line3.setAttribute('x1', `${x0}`);
    line3.setAttribute('x2', `${x0}`);
    line3.setAttribute('y1', `${y2}`);
    line3.setAttribute('y2', `${y3}`);
    line3.setAttribute('stroke', "white");
    line3.setAttribute('stroke-width', 1.1);
    line3.setAttribute('id', 'line3');
    svg.appendChild(line3);

    // 4ª linha
    const line4 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    line4.setAttribute("x", x0 - 0.55);
    line4.setAttribute("y", y3);
    line4.setAttribute("width", 1.1);
    line4.setAttribute("height", y4 - y3);
    line4.setAttribute("fill", "url(#gradBottom)");
    line4.setAttribute('id', 'line4');
    svg.appendChild(line4);
  }, []);

  const appendComplexSeta = useCallback(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const x0 = width / 2;
    const y1 = height * 0.585 - 13;
    const y3 = height * 0.585 + 13;

    const line2 = svg.querySelector('#line2');
    const line3 = svg.querySelector('#line3');

    if (line2 && line3) {
      line2.setAttribute('x2', `${x0 + 15}`);
      line3.setAttribute('x1', `${x0 + 15}`);
    }

    const existingSeta = svg.querySelector('#complex_seta');
    if (existingSeta) {
      existingSeta.remove();
    }

    const img = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    img.setAttributeNS(null, 'href', `${seta}`);
    img.setAttributeNS(null, 'id', 'complex_seta');
    img.setAttributeNS(null, 'x', `${x0 - 18}`);
    img.setAttributeNS(null, 'y', `${y1}`);
    img.setAttributeNS(null, 'width', 33);
    img.setAttributeNS(null, 'height', `${y3 - y1}`);
    svg.appendChild(img);
  }, []);

  useEffect(() => {
    straightLine();
    if (showArrow) {
      appendComplexSeta();
    }
  }, [straightLine, appendComplexSeta, showArrow, windowWidth, windowHeight]);

  return (
    <div id={id} ref={containerRef}>
      <svg id={`svg-${id}`} xmlns="http://www.w3.org/2000/svg" ref={svgRef}></svg>
    </div>
  );
}

export default VerticalDiv1;