import { useEffect, useState, useRef } from 'react';
import cursorImg from './assets/cursor.png';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const cursorRef = useRef(null);
  const requestRef = useRef();

  useEffect(() => {
    const updatePosition = (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Inject style on first move to hide native cursor
      if (!document.getElementById('custom-cursor-style')) {
        const style = document.createElement('style');
        style.innerHTML = `* { cursor: none !important; }`;
        style.id = 'custom-cursor-style';
        document.head.appendChild(style);
      }

      if (requestRef.current) return;

      requestRef.current = requestAnimationFrame(() => {
        if (cursorRef.current) {
          const { width, height } = cursorRef.current.getBoundingClientRect();
          const windowWidth = window.innerWidth;
          const windowHeight = window.innerHeight;
          
          // Hotspot offset (10, 10) from CSS
          const hotspotX = 10;
          const hotspotY = 10;

          let x = mouseX - hotspotX;
          let y = mouseY - hotspotY;

          // Prevent cut-off on right edge
          if (x + width > windowWidth) {
            x = windowWidth - width;
          }
          // Prevent cut-off on left edge
          if (x < 0) {
            x = 0;
          }

          // Prevent cut-off on bottom edge
          if (y + height > windowHeight) {
            y = windowHeight - height;
          }
          // Prevent cut-off on top edge
          if (y < 0) {
            y = 0;
          }

          setPosition({ x, y });
        }
        requestRef.current = null;
      });
    };

    window.addEventListener('mousemove', updatePosition);
    


    return () => {
      window.removeEventListener('mousemove', updatePosition);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      document.body.style.cursor = '';
      const existingStyle = document.getElementById('custom-cursor-style');
      if (existingStyle) existingStyle.remove();
    };
  }, []);

  return (
    <img 
      ref={cursorRef}
      src={cursorImg} 
      alt="custom cursor" 
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        transform: `translate(${position.x}px, ${position.y}px)`,
        pointerEvents: 'none',
        zIndex: 9999,
        willChange: 'transform'
      }} 
    />
  );
}
