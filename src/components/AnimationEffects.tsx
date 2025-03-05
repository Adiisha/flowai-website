
import { useEffect, useRef } from 'react';

const AnimationEffects = () => {
  const animationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Enhanced text animations using Intersection Observer
    const animateText = () => {
      const textElements = document.querySelectorAll('h1, h2, h3, h4, p.animate-text');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Apply a random animation from our set
            const animations = [
              'animate-fade-in',
              'animate-slide-up',
              'slide-in',
            ];
            
            const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
            entry.target.classList.add(randomAnimation);
            
            // Add a delay based on the child index if it's in a container
            if (entry.target.parentElement?.classList.contains('stagger-children')) {
              const childElements = Array.from(entry.target.parentElement.children);
              const index = childElements.indexOf(entry.target as Element);
              (entry.target as HTMLElement).style.animationDelay = `${index * 0.1}s`;
            }
            
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      
      textElements.forEach(el => {
        observer.observe(el);
      });
      
      return observer;
    };
    
    // Create subtle hover effects on interactive elements
    const enhanceInteractivity = () => {
      const interactiveItems = document.querySelectorAll('button, a, .card, .service-card');
      
      interactiveItems.forEach(item => {
        item.classList.add('transition-transform', 'duration-300');
        
        item.addEventListener('mouseenter', () => {
          item.classList.add('scale-105');
          document.dispatchEvent(new CustomEvent('element-hover', { detail: { element: item } }));
        });
        
        item.addEventListener('mouseleave', () => {
          item.classList.remove('scale-105');
        });
      });
    };
    
    // Create particles effect
    const createParticles = () => {
      const particles = Array.from({ length: 15 }, () => {
        const particle = document.createElement('div');
        
        // Randomize particle size, position and animation
        const size = Math.random() * 5 + 3;
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 5;
        
        particle.className = 'fixed rounded-full bg-teal-500/10 pointer-events-none z-[-1]';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animation = 'float 10s infinite ease-in-out';
        
        document.body.appendChild(particle);
        return particle;
      });
      
      return () => {
        particles.forEach(p => p.remove());
      };
    };
    
    // Apply scroll-triggered reveal animations to sections
    const createScrollReveal = () => {
      const sections = document.querySelectorAll('section');
      
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      
      sections.forEach(section => {
        section.classList.add('transition-all', 'duration-700', 'ease-out', 'opacity-0', 'translate-y-10');
        revealObserver.observe(section);
      });
      
      return revealObserver;
    };
    
    // Enhanced mouse move effects for subtle parallax
    const createParallaxEffect = () => {
      const moveHandler = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        // Calculate mouse position relative to center
        const moveX = (clientX - centerX) / centerX;
        const moveY = (clientY - centerY) / centerY;
        
        // Apply subtle movement to different elements
        document.querySelectorAll('.parallax-slow').forEach(el => {
          (el as HTMLElement).style.transform = `translate(${moveX * 10}px, ${moveY * 10}px)`;
        });
        
        document.querySelectorAll('.parallax-medium').forEach(el => {
          (el as HTMLElement).style.transform = `translate(${moveX * 20}px, ${moveY * 20}px)`;
        });
        
        document.querySelectorAll('.parallax-fast').forEach(el => {
          (el as HTMLElement).style.transform = `translate(${moveX * 30}px, ${moveY * 30}px)`;
        });
      };
      
      document.addEventListener('mousemove', moveHandler);
      
      return () => {
        document.removeEventListener('mousemove', moveHandler);
      };
    };
    
    // Initialize all animation effects
    const textObserver = animateText();
    enhanceInteractivity();
    const cleanupParticles = createParticles();
    const revealObserver = createScrollReveal();
    const cleanupParallax = createParallaxEffect();
    
    // Cleanup function for useEffect
    return () => {
      textObserver.disconnect();
      cleanupParticles();
      revealObserver.disconnect();
      cleanupParallax();
    };
  }, []);

  return <div ref={animationRef} className="sr-only">Animation Effects Controller</div>;
};

export default AnimationEffects;
