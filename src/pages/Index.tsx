
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
    // Smooth scroll animation with gentle stop
    const smoothScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (!target.hash) return;
      
      e.preventDefault();
      const targetElement = document.querySelector(target.hash);
      if (!targetElement) return;
      
      const scrollOptions: ScrollToOptions = {
        behavior: 'smooth',
        block: 'start'
      };
      
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        ...scrollOptions,
        top: targetPosition
      });
    };
    
    // Add the smooth scroll to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', smoothScroll);
    });
    
    // Reveal animation for elements when they come into view
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.revealed');
    revealElements.forEach(element => {
      observer.observe(element);
    });

    // Handle count-up animation
    const countUp = (el: Element, target: number) => {
      let count = 0;
      const increment = target / 50; // Adjust speed
      const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
          clearInterval(timer);
          count = target;
        }
        el.textContent = Math.floor(count).toString();
      }, 30);
    };

    const handleCountUpElements = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = Number(entry.target.getAttribute('data-target') || '0');
          countUp(entry.target, target);
          countObserver.unobserve(entry.target);
        }
      });
    };

    const countObserver = new IntersectionObserver(handleCountUpElements, {
      threshold: 0.5,
    });

    document.querySelectorAll('[data-count-up]').forEach(el => {
      countObserver.observe(el);
    });

    // Add floating icons animation
    const addFloatingIcons = () => {
      const iconClasses = [
        'i-lucide-zap',
        'i-lucide-cpu',
        'i-lucide-bar-chart',
        'i-lucide-brain',
        'i-lucide-code',
        'i-lucide-database',
        'i-lucide-activity',
        'i-lucide-layers',
        'i-lucide-settings'
      ];
      
      const container = document.createElement('div');
      container.className = 'fixed inset-0 pointer-events-none z-0 overflow-hidden';
      document.body.appendChild(container);
      
      for (let i = 0; i < 15; i++) {
        const icon = document.createElement('div');
        const randomIcon = iconClasses[Math.floor(Math.random() * iconClasses.length)];
        const size = Math.random() * 20 + 10;
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        icon.className = `absolute opacity-5 animate-float`;
        icon.style.width = `${size}px`;
        icon.style.height = `${size}px`;
        icon.style.left = `${x}px`;
        icon.style.top = `${y}px`;
        icon.style.animationDuration = `${duration}s`;
        icon.style.animationDelay = `${delay}s`;
        icon.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            ${randomIcon === 'i-lucide-zap' ? '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>' : ''}
            ${randomIcon === 'i-lucide-cpu' ? '<rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line>' : ''}
            ${randomIcon === 'i-lucide-bar-chart' ? '<line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line>' : ''}
            ${randomIcon === 'i-lucide-brain' ? '<circle cx="12" cy="8" r="2"></circle><circle cx="12" cy="16" r="2"></circle><line x1="12" y1="10" x2="12" y2="14"></line><path d="M8 9.5a2 2 0 1 0 0-1"></path><path d="M16 9.5a2 2 0 1 1 0-1"></path><path d="M9.5 15a2 2 0 1 0-1 0"></path><path d="M14.5 15a2 2 0 1 1 1 0"></path>' : ''}
            ${randomIcon === 'i-lucide-code' ? '<polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline>' : ''}
            ${randomIcon === 'i-lucide-database' ? '<ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>' : ''}
          </svg>
        `;
        container.appendChild(icon);
      }
    };
    
    addFloatingIcons();

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
