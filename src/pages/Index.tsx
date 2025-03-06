import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import About from '@/components/About';
import Roadmap from '@/components/Roadmap';
import ContactUs from '@/components/ContactUs';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import FAQ from '@/components/FAQ';

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
    
    // Enhanced reveal animation for elements with slide up - modified to trigger repeatedly
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
          
          // Don't unobserve to make the animation repeat on every scroll
        } else {
          // Remove the animation class when element is out of view
          if (entry.target.classList.contains('staggered-container')) {
            const children = Array.from(entry.target.children);
            children.forEach((child) => {
              (child as HTMLElement).classList.remove('reveal-visible');
            });
          } else {
            entry.target.classList.remove('reveal-visible');
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

    // Add slide-up animation for sections - modified to trigger repeatedly
    const slideObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('slide-up-visible');
        } else {
          entry.target.classList.remove('slide-up-visible');
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
      
      const floatingElements = document.querySelectorAll('.floating-element, .floating-icon');
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
      <ContactUs />
      <FAQ />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;
