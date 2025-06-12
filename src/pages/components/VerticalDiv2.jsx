import React, { useEffect, useRef, useState } from 'react';
import seta from '../assets/seta.svg';
import bar from '../assets/bar.svg';

const VertDiv2 = ({ id, showArrow, arrowY = 0 }) => {
    const svgRef = useRef(null);
    const containerRef = useRef(null);
    const [lim, setLim] = useState(0);

    // cria/faz update das barras verticais
    function updateSVG() {
        const container = containerRef.current;
        const svg = svgRef.current;
        if (!container || !svg) return;

        const rect = container.getBoundingClientRect();
        const height = rect.height;
        const width = rect.width;
        svg.setAttribute('width', `${width}`);
        svg.setAttribute('height', `${height}`);
        svg.innerHTML = ''; // limpa tudo

        const newLim = Math.floor(height / 11.1);
        setLim(newLim);

        for (let i = 0; i < newLim; i++) {
            const svgImage = document.createElementNS('http://www.w3.org/2000/svg', 'image');
            svgImage.setAttribute('id', `${id}bar${i}`);
            svgImage.setAttribute('href', bar);
            svgImage.setAttribute('x', '50%');
            svgImage.setAttribute('y', i * 11);
            svgImage.setAttribute('dominant-baseline', 'middle');
            svgImage.setAttribute('text-anchor', 'middle');

            // deixa as pontas opacas
            if (i === 0 || i === newLim-1) {
                svgImage.setAttribute('opacity', '0.33');
            } else if (i === 1 || i === newLim-2) {
                svgImage.setAttribute('opacity', '0.66');
            }

            svg.appendChild(svgImage);
        }
    }

    // remove a seta (se existir)
    function removeSeta() {
        const seta = document.getElementById(`${id}seta`);
        if (seta) seta.remove();

        // refaz as barras
        const svg = svgRef.current;
        const container = containerRef.current;
        if (!svg || !container) return;

        const rect = container.getBoundingClientRect();
        const height = rect.height;
        const lim = Math.floor(height/11.1);

        for (let i = 0; i < lim; i++) {
            if (!document.getElementById(`${id}bar${i}`)) {
                const svgImage = document.createElementNS('http://www.w3.org/2000/svg', 'image');
                svgImage.setAttribute('id', `${id}bar${i}`);
                svgImage.setAttribute('href', bar);
                svgImage.setAttribute('x', '50%');
                svgImage.setAttribute('y', i * 11);
                svgImage.setAttribute('dominant-baseline', 'middle');
                svgImage.setAttribute('text-anchor', 'middle');

                if (i === 0 || i === lim - 1) {
                    svgImage.setAttribute('opacity', '0.33');
                } else if (i === 1 || i === lim - 2) {
                    svgImage.setAttribute('opacity', '0.66');
                }

                svg.appendChild(svgImage);
            }
        }
    }

    // pra fazer resize em relação a quanto a janela muda de tamanho
    useEffect(() => {
        updateSVG();
        window.addEventListener('resize', updateSVG);
        return () => window.removeEventListener('resize', updateSVG);
    }, [id]);

    // pra criar a seta na posição certa
    useEffect(() => {
        const svg = svgRef.current;
        if (!svg) return;

        removeSeta();

        if (!showArrow) {
            updateSVG();
            return;
        }

        // calcula posição da seta
        let intDiv = Math.floor(arrowY/11) - 2;
        const resto = arrowY % 11;
        if (resto >= 6) intDiv++;

        if (intDiv >= 2 && intDiv + 7 < lim) {
            // remove barras para colocar seta
            for (let i = intDiv; i <= intDiv + 5; i++) {
                const elem = document.getElementById(`${id}bar${i}`);
                if (elem) elem.remove();
            }
            // cria seta
            const svgImage = document.createElementNS('http://www.w3.org/2000/svg', 'image');
            svgImage.setAttribute('id', `${id}seta`);
            svgImage.setAttribute('href', seta);
            svgImage.setAttribute('x', '50%');
            svgImage.setAttribute('y', intDiv * 11);
            svgImage.setAttribute('dominant-baseline', 'middle');
            svgImage.setAttribute('text-anchor', 'middle');
            svg.appendChild(svgImage);
        }
    }, [showArrow, arrowY, lim, id]);

    return (
        <div
            ref={containerRef}
            id={id}
            style={{ width: '100%', height: '100%', position: 'relative' }}
        >
            <svg ref={svgRef} id={`${id}svg`} />
        </div>
        );
};

export default VertDiv2;
