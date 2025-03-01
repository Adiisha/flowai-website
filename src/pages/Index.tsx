
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import About from '@/components/About';
import Roadmap from '@/components/Roadmap';
import Testimonials from '@/components/Testimonials';
import LaunchingSection from '@/components/LaunchingSection';
import Footer from '@/components/Footer';

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

    return () => {
      revealElements.forEach(element => {
        observer.unobserve(element);
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
      <Footer />
    </div>
  );
};

export default Index;
