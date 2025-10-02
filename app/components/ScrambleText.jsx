import React, { useRef, useEffect } from 'react';
import TextScramble from '../utils/textScramble.js';

/**
 * ScrambleText Component
 * A React wrapper that applies text scramble effect to its children
 */
const ScrambleText = ({ 
  children, 
  as: Component = 'span',
  duration = 0.8,
  delay = 0,
  triggerOnMouseEnter = true,
  triggerOnMouseLeave = false,
  className = '',
  style = {},
  ...props 
}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    if (elementRef.current && elementRef.current.textContent && elementRef.current.textContent.trim()) {
      const scrambler = TextScramble.create(elementRef.current, {
        duration,
        delay,
        triggerOnMouseEnter,
        triggerOnMouseLeave
      });

      return () => {
        // Cleanup event listeners properly
        scrambler.cleanup();
      };
    }
  }, [duration, delay, triggerOnMouseEnter, triggerOnMouseLeave, children]);

  return (
    <Component 
      ref={elementRef} 
      className={className} 
      style={style} 
      {...props}
    >
      {children}
    </Component>
  );
};

export default ScrambleText;