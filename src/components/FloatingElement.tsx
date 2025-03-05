
import { useState, useEffect, useRef, ReactNode } from 'react';

interface FloatingElementProps {
  children: ReactNode;
  delay?: number;
  size?: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  opacity?: number;
  animationType?: 'float-1' | 'float-2' | 'float-3';
  shadow?: boolean;
  interaction?: boolean;
  background?: string;
  zIndex?: number;
}

const FloatingElement = ({
  children,
  delay = 0,
  size = 12,
  top,
  left,
  right,
  bottom,
  opacity = 0.7,
  animationType = 'float-1',
  shadow = true,
  interaction = true,
  background = 'bg-white',
  zIndex = -1
}: FloatingElementProps) => {
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
      const interactionRadius = 250;
      if (distance < interactionRadius) {
        // Calculate repulsion (stronger when closer)
        const repulsionFactor = 1 - distance / interactionRadius;
        const maxRepulsion = 50; // Maximum pixels to move
        
        // Calculate repulsion with smooth falloff
        const repulsionX = -distanceX * repulsionFactor * (maxRepulsion / interactionRadius);
        const repulsionY = -distanceY * repulsionFactor * (maxRepulsion / interactionRadius);
        
        setPosition({ x: repulsionX, y: repulsionY });
        
        // Slightly increase opacity on interaction
        if (elementRef.current) {
          elementRef.current.style.opacity = `${Math.min(1, opacity * 1.3)}`;
        }
      } else {
        setPosition({ x: 0, y: 0 });
        
        // Reset opacity when not interacting
        if (elementRef.current) {
          elementRef.current.style.opacity = `${opacity}`;
        }
      }
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [interaction, opacity]);
  
  return (
    <div
      ref={elementRef}
      className={`absolute ${animationType} ${background} ${shadow ? 'shadow-sm' : ''} rounded-full flex items-center justify-center`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        top,
        left,
        right,
        bottom,
        opacity,
        zIndex,
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: 'opacity 0.3s ease, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
        animationDelay: `${delay}s`
      }}
    >
      {children}
    </div>
  );
};

export default FloatingElement;
