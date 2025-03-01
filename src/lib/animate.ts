
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
