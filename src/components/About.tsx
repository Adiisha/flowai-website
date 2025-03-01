
import { useRef, useEffect } from 'react';
import { useInView } from '@/lib/animate';

const About = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const textRef = useRef<HTMLDivElement>(null);
  
  return (
    <section id="about" className="py-24 bg-flowai-beige">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div
            ref={ref as React.RefObject<HTMLDivElement>} 
            className={`relative h-[400px] overflow-hidden rounded-2xl ${isInView ? 'animate-fade-in' : 'opacity-0'}`}
          >
            <div className="absolute inset-0 bg-flowai-black rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#ffffff33_0%,_transparent_70%)]"></div>
              <div className="h-full w-full flex items-center justify-center">
                <div className="text-flowai-white text-9xl font-bold opacity-10 transform -rotate-12">
                  FLOW
                </div>
                <div className="absolute w-48 h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full filter blur-3xl animate-float"></div>
              </div>
            </div>
            <div className="absolute bottom-8 right-8 bg-flowai-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg max-w-[280px]">
              <h4 className="text-xl font-bold mb-2">Our Vision</h4>
              <p className="text-sm">
                Creating a world where businesses of all sizes can harness the power of AI to achieve their full potential.
              </p>
            </div>
          </div>
          
          <div 
            ref={textRef}
            className={`${isInView ? 'animate-slide-up' : 'opacity-0'}`}
          >
            <span className="px-3 py-1 bg-flowai-black text-flowai-white text-sm font-medium rounded-full">
              About Flow AI
            </span>
            <h2 className="mt-4 mb-6">Our Mission</h2>
            <p className="mb-6">
              Flow AI pioneers custom AI solutions to transform businesses, driving efficiency and growth with innovation at our core. We believe in creating technology that feels intuitive and seamless, just like a natural flow.
            </p>
            <p className="mb-8">
              Our team combines expertise in artificial intelligence, machine learning, and business optimization to deliver solutions that address real challenges and create measurable impact.
            </p>
            
            <div className="grid grid-cols-2 gap-8">
              <div className="flex flex-col">
                <div className="text-3xl font-bold mb-2">150+</div>
                <p className="text-base">Clients Worldwide</p>
              </div>
              <div className="flex flex-col">
                <div className="text-3xl font-bold mb-2">40+</div>
                <p className="text-base">AI Experts</p>
              </div>
              <div className="flex flex-col">
                <div className="text-3xl font-bold mb-2">98%</div>
                <p className="text-base">Client Satisfaction</p>
              </div>
              <div className="flex flex-col">
                <div className="text-3xl font-bold mb-2">24/7</div>
                <p className="text-base">Support Services</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
