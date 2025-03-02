import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import About from '@/components/About';
import Roadmap from '@/components/Roadmap';
import Testimonials from '@/components/Testimonials';
import LaunchingSection from '@/components/LaunchingSection';
import ContactUs from '@/components/ContactUs';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';

const Index = () => {
  useEffect(() => {
    // Smooth scroll animation with gentle stop and slide up effect
    const smoothScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (!target.hash) return;
      
      e.preventDefault();
      const targetElement = document.querySelector(target.hash);
      if (!targetElement) return;
      
      const offsetPosition = targetElement.getBoundingClientRect().top + window.scrollY - 100;
      
      window.scrollTo({
        behavior: 'smooth',
        top: offsetPosition
      });
      
      // Add a class to highlight the section
      setTimeout(() => {
        targetElement.classList.add('section-highlight');
        setTimeout(() => {
          targetElement.classList.remove('section-highlight');
        }, 800);
      }, 800);
    };
    
    // Add the smooth scroll to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', smoothScroll);
    });
    
    // Enhanced reveal animation for elements with slide up
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add staggered animation based on child index
          if (entry.target.classList.contains('staggered-container')) {
            const children = Array.from(entry.target.children);
            children.forEach((child, index) => {
              setTimeout(() => {
                (child as HTMLElement).classList.add('reveal-visible');
              }, index * 100);
            });
          } else {
            entry.target.classList.add('reveal-visible');
          }
          
          // Don't unobserve so animation happens every time
          if (entry.target.classList.contains('count-animate')) {
            // Keep observing count elements
          } else {
            observer.unobserve(entry.target);
          }
        }
      });
    }, observerOptions);

    // Observe all elements with revealed class
    const revealElements = document.querySelectorAll('.revealed, .staggered-container, .count-animate');
    revealElements.forEach(element => {
      observer.observe(element);
    });

    // Enhanced count-up animation that resets and runs each time it comes into view
    const countUp = (el: Element, target: number) => {
      let count = 0;
      const increment = target / 40; // Adjust speed
      const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
          clearInterval(timer);
          count = target;
        }
        el.textContent = Math.floor(count).toString();
      }, 30);
      
      return timer;
    };

    const handleCountUpElements = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = Number(el.getAttribute('data-target') || '0');
          
          // Reset the count to 0 first
          el.textContent = "0";
          
          // Store the timer ID on the element for potential cleanup
          const timerId = countUp(el, target);
          el.setAttribute('data-timer-id', timerId.toString());
        } else {
          // When element exits view, clear the timer
          const timerId = Number(entry.target.getAttribute('data-timer-id') || '0');
          if (timerId) {
            clearInterval(timerId);
          }
        }
      });
    };

    const countObserver = new IntersectionObserver(handleCountUpElements, {
      threshold: 0.5,
    });

    document.querySelectorAll('[data-count-up]').forEach(el => {
      countObserver.observe(el);
    });

    // Add interactive floating icons animation with improved repulsion
    const addFloatingIcons = () => {
      const iconClasses = [
        'zap',
        'cpu',
        'bar-chart',
        'brain',
        'code',
        'database',
        'activity',
        'layers',
        'settings'
      ];
      
      const container = document.createElement('div');
      container.className = 'fixed inset-0 pointer-events-none z-0 overflow-hidden';
      document.body.appendChild(container);
      
      for (let i = 0; i < 25; i++) {
        const icon = document.createElement('div');
        const randomIconName = iconClasses[Math.floor(Math.random() * iconClasses.length)];
        const size = Math.random() * 20 + 10;
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        icon.className = `absolute opacity-5 animate-float interactive-icon`;
        icon.style.width = `${size}px`;
        icon.style.height = `${size}px`;
        icon.style.left = `${x}px`;
        icon.style.top = `${y}px`;
        icon.style.animationDuration = `${duration}s`;
        icon.style.animationDelay = `${delay}s`;
        
        // Use lucide SVG content for the icon
        icon.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-${randomIconName}">
            ${getSvgPathForIcon(randomIconName)}
          </svg>
        `;
        
        container.appendChild(icon);
      }
      
      // Enhanced mouse interaction with improved repulsion for icons
      document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        const icons = document.querySelectorAll('.interactive-icon');
        icons.forEach(icon => {
          const rect = icon.getBoundingClientRect();
          const iconX = rect.left + rect.width / 2;
          const iconY = rect.top + rect.height / 2;
          
          // Calculate distance
          const distX = mouseX - iconX;
          const distY = mouseY - iconY;
          const distance = Math.sqrt(distX * distX + distY * distY);
          
          // Only affect icons within a certain radius - enhanced repulsion
          if (distance < 150) {
            // Calculate repulsion based on inverse distance (stronger when closer)
            const repulsionFactor = 1 - distance / 150;
            const moveX = -distX * 0.08 * repulsionFactor;
            const moveY = -distY * 0.08 * repulsionFactor;
            
            (icon as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px)`;
            (icon as HTMLElement).style.opacity = '0.3';
            (icon as HTMLElement).style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.5s ease-out';
          } else {
            (icon as HTMLElement).style.transform = '';
            (icon as HTMLElement).style.opacity = '0.05';
            (icon as HTMLElement).style.transition = 'transform 1s ease-out, opacity 1s ease-out';
          }
        });
      });
    };
    
    // Get SVG path for different icons
    const getSvgPathForIcon = (iconName: string) => {
      switch(iconName) {
        case 'zap':
          return '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>';
        case 'cpu':
          return '<rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line>';
        case 'bar-chart':
          return '<line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line>';
        case 'brain':
          return '<circle cx="12" cy="8" r="2"></circle><circle cx="12" cy="16" r="2"></circle><line x1="12" y1="10" x2="12" y2="14"></line><path d="M8 9.5a2 2 0 1 0 0-1"></path><path d="M16 9.5a2 2 0 1 1 0-1"></path><path d="M9.5 15a2 2 0 1 0-1 0"></path><path d="M14.5 15a2 2 0 1 1 1 0"></path>';
        case 'code':
          return '<polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline>';
        case 'database':
          return '<ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>';
        case 'activity':
          return '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>';
        case 'layers':
          return '<polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline>';
        case 'settings':
          return '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0 .73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l-.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle>';
        default:
          return '<circle cx="12" cy="12" r="10"></circle>';
      }
    };
    
    addFloatingIcons();

    // Add slide-up animation for sections
    const slideObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('slide-up-visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
      section.classList.add('slide-up-section');
      slideObserver.observe(section);
    });

    // Enhanced cursor interaction for floating elements with improved physics
    const handleCursorInteraction = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      const floatingElements = document.querySelectorAll('.floating-element');
      floatingElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const elementX = rect.left + rect.width / 2;
        const elementY = rect.top + rect.height / 2;
        
        // Calculate distance
        const distX = mouseX - elementX;
        const distY = mouseY - elementY;
        const distance = Math.sqrt(distX * distX + distY * distY);
        
        // Create enhanced repulsion effect with spring-like behavior
        const maxDistance = 250;
        if (distance < maxDistance) {
          // Adjust repulsion strength to be stronger when closer
          const repulsionStrength = 45 * Math.pow((1 - distance / maxDistance), 1.5);
          const angle = Math.atan2(distY, distX);
          
          // Move away from cursor with spring physics
          const moveX = -Math.cos(angle) * repulsionStrength;
          const moveY = -Math.sin(angle) * repulsionStrength;
          
          (element as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px)`;
          (element as HTMLElement).style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        } else {
          // Return to original position with spring physics
          (element as HTMLElement).style.transform = '';
          (element as HTMLElement).style.transition = 'transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }
      });
    };
    
    document.addEventListener('mousemove', handleCursorInteraction);

    // Clean up event listeners
    return () => {
      revealElements.forEach(element => {
        observer.unobserve(element);
      });
      document.querySelectorAll('[data-count-up]').forEach(el => {
        countObserver.unobserve(el);
      });
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', smoothScroll);
      });
      document.querySelectorAll('section').forEach(section => {
        slideObserver.unobserve(section);
      });
      document.removeEventListener('mousemove', handleCursorInteraction);
    };
  }, []);

  return (
    <div className="relative">
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Roadmap />
      <Testimonials />
      <LaunchingSection />
      <ContactUs />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;
