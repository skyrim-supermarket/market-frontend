// src/hooks/useScrollLogic.js
import { useEffect, useState, useRef } from 'react';

function useScrollLogic(elementRef, onScrollDirection) {
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [elementRef]);

  useEffect(() => {
    const handleWheel = (event) => {
      if (isHovering) {
        if (event.deltaY > 0) {
          onScrollDirection('down');
        } else if (event.deltaY < 0) {
          onScrollDirection('up');
        }
      }
    };

    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isHovering, onScrollDirection]);

  return { isHovering };
}

export default useScrollLogic;