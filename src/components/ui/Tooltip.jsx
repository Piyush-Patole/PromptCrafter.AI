import React, { useState, useRef, useEffect } from 'react';
import { colors } from './tokens';

export default function Tooltip({ children, content, width = 280 }) {
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState('bottom');
  const containerRef = useRef(null);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        if (rect.top < 260) {
          setPosition('bottom');
        } else {
          setPosition('top');
        }
      }
      setShow(true);
    }, 120);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShow(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {show && (
        <div style={{
          position: 'absolute',
          [position === 'top' ? 'bottom' : 'top']: '100%',
          left: '50%',
          transform: `translateX(-50%) ${position === 'top' ? 'translateY(-8px)' : 'translateY(8px)'}`,
          width: `${width}px`,
          backgroundColor: colors.surface,
          border: `1px solid ${colors.border}`,
          boxShadow: '0 12px 40px var(--color-shadow)',
          borderRadius: '8px',
          padding: '16px',
          zIndex: 50,
          animation: 'fadeIn 0.12s ease',
        }}>
          {/* Arrow */}
          <div style={{
            position: 'absolute',
            [position === 'top' ? 'bottom' : 'top']: '-5px',
            left: '50%',
            transform: 'translateX(-50%) rotate(45deg)',
            width: '10px',
            height: '10px',
            backgroundColor: colors.surface,
            borderRight: position === 'top' ? `1px solid ${colors.border}` : 'none',
            borderBottom: position === 'top' ? `1px solid ${colors.border}` : 'none',
            borderLeft: position === 'bottom' ? `1px solid ${colors.border}` : 'none',
            borderTop: position === 'bottom' ? `1px solid ${colors.border}` : 'none',
          }} />
          <div style={{ position: 'relative', zIndex: 2 }}>
            {content}
          </div>
        </div>
      )}
    </div>
  );
}
