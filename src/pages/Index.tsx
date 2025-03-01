
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

    return () => {
      revealElements.forEach(element => {
        observer.unobserve(element);
      });
      document.querySelectorAll('[data-count-up]').forEach(el => {
        countObserver.unobserve(el);
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
      <LaunchingSection />
      <Testimonials />
      <ContactUs />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;
