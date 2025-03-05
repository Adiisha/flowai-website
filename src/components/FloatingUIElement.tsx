
import { useState, useEffect, useRef, ReactNode } from 'react';

interface FloatingUIElementProps {
  children: ReactNode;
  delay?: number;
  width?: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  opacity?: number;
  animationType?: 'float-1' | 'float-2' | 'float-3';
  interaction?: boolean;
  zIndex?: number;
}

const FloatingUIElement = ({
  children,
  delay = 0,
  width = '150px',
  top,
  left,
  right,
  bottom,
  opacity = 0.9,
  animationType = 'float-1',
  interaction = true,
  zIndex = -1
}: FloatingUIElementProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const elementRef = useRef<HTMLDivElement>(null);

  // Handle mouse interaction
  useEffect(() => {
    if (!interaction) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!elementRef.current) return;
      
      const rect = elementRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate distance from mouse to element center
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      
      // Only affect elements within a certain radius
      const interactionRadius = 300;
      if (distance < interactionRadius) {
        // Calculate repulsion (stronger when closer)
        const repulsionFactor = 1 - distance / interactionRadius;
        const maxRepulsion = 60; // Maximum pixels to move
        
        // Calculate repulsion with smooth falloff
        const repulsionX = -distanceX * repulsionFactor * (maxRepulsion / interactionRadius);
        const repulsionY = -distanceY * repulsionFactor * (maxRepulsion / interactionRadius);
        
        setPosition({ x: repulsionX, y: repulsionY });
        
        // Slightly increase opacity on interaction
        if (elementRef.current) {
          elementRef.current.style.opacity = `${Math.min(1, opacity * 1.2)}`;
          elementRef.current.style.transform = `translate(${repulsionX}px, ${repulsionY}px) scale(1.05)`;
        }
      } else {
        setPosition({ x: 0, y: 0 });
        
        // Reset opacity when not interacting
        if (elementRef.current) {
          elementRef.current.style.opacity = `${opacity}`;
          elementRef.current.style.transform = 'translate(0px, 0px) scale(1)';
        }
      }
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [interaction, opacity]);
  
  return (
    <div
      ref={elementRef}
      className={`absolute ${animationType} bg-white rounded-xl shadow-md p-3 flex items-center justify-center`}
      style={{
        width,
        top,
        left,
        right,
        bottom,
        opacity,
        zIndex,
        transition: 'opacity 0.3s ease, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
        animationDelay: `${delay}s`
      }}
    >
      {children}
    </div>
  );
};

export default FloatingUIElement;
