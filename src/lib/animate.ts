
import { useEffect, useRef, useState } from 'react';

interface UseInViewProps {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useInView = ({
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = true,
}: UseInViewProps = {}) => {
  const ref = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isInView };
};

export const staggeredAnimation = (index: number, delay = 0.1) => {
  return {
    style: {
      opacity: 0,
      animation: 'none',
      animationDelay: `${delay * index}s`,
    },
    className: 'animate-slide-up'
  };
};

export const fadeInAnimation = (index: number, delay = 0.1) => {
  return {
    style: {
      opacity: 0,
      animation: 'none',
      animationDelay: `${delay * index}s`,
    },
    className: 'animate-fade-in'
  };
};

export const useAnimatedSection = (threshold = 0.15, staggered = true) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) {
            observer.unobserve(ref.current);
            
            // Apply animations to children if staggered
            if (staggered && ref.current) {
              const children = Array.from(ref.current.children);
              children.forEach((child, index) => {
                setTimeout(() => {
                  (child as HTMLElement).classList.add('animate-slide-in-from-bottom');
                  (child as HTMLElement).style.opacity = '1';
                }, index * 100);
              });
            }
          }
        }
      },
      { threshold }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, staggered]);
  
  return { ref, isVisible };
};

export const useFadeInAnimation = (delay = 0) => {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { 
      duration: 0.6,
      delay: delay,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  };
};

export const useSlideInAnimation = (direction: 'left' | 'right' | 'top' | 'bottom' = 'bottom', delay = 0) => {
  const directionMap = {
    left: { x: -50, y: 0 },
    right: { x: 50, y: 0 },
    top: { x: 0, y: -50 },
    bottom: { x: 0, y: 50 }
  };
  
  const { x, y } = directionMap[direction];
  
  return {
    initial: { opacity: 0, x, y },
    animate: { opacity: 1, x: 0, y: 0 },
    transition: { 
      duration: 0.8,
      delay: delay,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  };
};
