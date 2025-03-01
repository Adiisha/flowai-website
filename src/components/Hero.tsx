
import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { createThreeScene } from '@/lib/three-scene';

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [taglineIndex, setTaglineIndex] = useState(0);
  
  const taglines = [
    "Empower Your Business with Intelligent AI",
    "Tailored AI Solutions, Seamless Results",
    "Innovation Meets Efficiency"
  ];

  useEffect(() => {
    // Rotate through taglines
    const intervalId = setInterval(() => {
      setTaglineIndex((prevIndex) => (prevIndex + 1) % taglines.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const cleanup = createThreeScene({
      canvas: canvasRef.current,
      color: '#000000',
      wireframe: true,
      speed: 0.0005
    });
    
    return cleanup;
  }, []);

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 -z-10">
        <canvas 
          ref={canvasRef} 
          className="w-full h-full" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-flowai-beige/80 to-flowai-beige"></div>
      </div>
      
      <div className="container mx-auto px-6 z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-4 inline-block">
            <span className="px-3 py-1 bg-flowai-black text-flowai-white text-sm font-medium rounded-full animate-pulse-subtle">
              Next-Gen AI Solutions
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance min-h-[120px] md:min-h-[144px]">
            <span 
              key={taglineIndex} 
              className="block animate-fade-in"
            >
              {taglines[taglineIndex]}
            </span>
          </h1>
          
          <p className="text-xl mb-10 max-w-2xl mx-auto text-balance">
            Flow AI pioneers custom artificial intelligence solutions designed to transform your business operations, 
            driving efficiency and growth through innovative technology.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#services" className="btn-primary w-full sm:w-auto">
              Explore Services
            </a>
            <a href="#contact" className="btn-outline w-full sm:w-auto">
              Book a Free Demo
            </a>
          </div>
        </div>
      </div>
      
      <a 
        href="#services"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-flowai-black hover:text-flowai-darkGray transition-colors duration-300"
      >
        <span className="text-sm font-medium mb-2">Scroll to discover</span>
        <ChevronDown className="animate-bounce" />
      </a>
    </section>
  );
};

export default Hero;
