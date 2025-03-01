
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

    // Apply subtle parallax effect on scroll
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      document.querySelectorAll('.parallax').forEach((element) => {
        const speed = Number(element.getAttribute('data-speed')) || 0.1;
        (element as HTMLElement).style.transform = `translateY(${scrollY * speed}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      revealElements.forEach(element => {
        observer.unobserve(element);
      });
      window.removeEventListener('scroll', handleScroll);
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
