import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useInView } from '@/lib/animate';

const Hero = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  // Text animation elements
  const textRef = useRef<HTMLParagraphElement>(null);
  const headingRefs = useRef<(HTMLElement | null)[]>([]);

  // Handle animations when section comes into view
  useEffect(() => {
    if (isInView) {
      const headingElements = headingRefs.current.filter(Boolean);
      headingElements.forEach((el, index) => {
        if (el) {
          setTimeout(() => {
            el.classList.add('animate-slide-in-from-bottom');
            el.style.opacity = '1';
          }, index * 200);
        }
      });

      if (textRef.current) {
        setTimeout(() => {
          textRef.current?.classList.add('animate-fade-in');
          textRef.current!.style.opacity = '1';
        }, headingElements.length * 200);
      }
    }
  }, [isInView]);

  // Handle image load
  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#f8f9fa]"
    >
      <div className="absolute inset-0 -z-10 bg-white">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50"></div>
      </div>
      
      {/* Enhanced Floating elements that move with cursor */}
      <div className="absolute inset-0 pointer-events-none z-[-10]">
        <div className="absolute top-[20%] left-[15%] animate-float transform-gpu duration-300 floating-element z-[-1]">
          <div className="bg-sky-50 rounded-full w-12 h-12 flex items-center justify-center shadow-sm">
            <div className="text-sky-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
            </div>
          </div>
        </div>
        
        {/* Additional floating elements */}
        <div className="absolute top-[10%] right-[10%] animate-float animation-delay-1500 transform-gpu duration-300 floating-element z-[-1]">
          <div className="bg-amber-50 rounded-full w-16 h-16 flex items-center justify-center shadow-sm">
            <div className="text-amber-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
            </div>
          </div>
        </div>
        
        {/* More floating elements strategically placed around the content */}
        <div className="absolute bottom-[30%] left-[5%] animate-float-2 transform-gpu duration-300 floating-element z-[-1]">
          <div className="bg-teal-50 rounded-full w-14 h-14 flex items-center justify-center shadow-sm">
            <div className="text-teal-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.29 7 12 12 20.71 7"></polyline><line x1="12" y1="22" x2="12" y2="12"></line></svg>
            </div>
          </div>
        </div>
        
        <div className="absolute top-[50%] right-[20%] animate-float-3 transform-gpu duration-300 floating-element z-[-1]">
          <div className="bg-indigo-50 rounded-full w-10 h-10 flex items-center justify-center shadow-sm">
            <div className="text-indigo-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 z-10 pt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <div className="mb-4 inline-block opacity-0 transform translate-y-4" 
                ref={el => headingRefs.current[0] = el}
                style={{transitionDelay: '100ms', transition: 'all 0.6s ease-out'}}>
              <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full">
                Affordable AI Solutions for Every Business
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
              <span 
                className="block opacity-0 transform translate-y-4" 
                ref={el => headingRefs.current[1] = el}
                style={{transitionDelay: '200ms', transition: 'all 0.6s ease-out'}}>
                Transform Your
              </span>
              <span 
                className="block opacity-0 transform translate-y-4" 
                ref={el => headingRefs.current[2] = el}
                style={{transitionDelay: '300ms', transition: 'all 0.6s ease-out'}}>
                Business with
              </span>
              <span 
                className="block gradient-text opacity-0 transform translate-y-4" 
                ref={el => headingRefs.current[3] = el}
                style={{transitionDelay: '400ms', transition: 'all 0.6s ease-out'}}>
                Intelligent AI
              </span>
            </h1>
            
            <p 
              ref={textRef}
              className="text-xl mb-10 text-balance text-gray-700 opacity-0 transform translate-y-4"
              style={{transitionDelay: '500ms', transition: 'all 0.6s ease-out'}}>
              Leverage powerful AI tools designed for businesses and startups 
              seeking affordable solutions without compromising on quality or 
              capabilities.
            </p>
            
            <div className="flex flex-col sm:flex-row items-start gap-4 opacity-0 transform translate-y-4 animate-fade-in" style={{animationDelay: '600ms'}}>
              <a href="#services" className="group">
                <button className="btn-primary">
                  Explore Services
                </button>
              </a>
              <a href="#contact" className="group">
                <button className="btn-outline">
                  Get in Touch
                </button>
              </a>
            </div>
          </div>
          
          <div className={`relative transform transition-all duration-700 ${isImageLoaded ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <div className="bg-white rounded-xl shadow-xl p-6 pb-12 relative z-20 py-[19px]">
              <div className="absolute -top-10 -left-5 bg-white rounded-xl shadow-md p-4 animate-float animation-delay-700">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center text-sky-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m12 8 4 4-4 4" /><path d="m8 12h8" /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Conversational AI</p>
                    <p className="text-xs text-gray-500">Enhanced Support</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 relative mb-4">
                <div className="col-span-3 flex justify-center mt-6">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3">
                    <p className="text-center text-sm font-medium">Chatbots</p>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <div className="bg-sky-50 rounded-full w-16 h-16 flex items-center justify-center">
                    <div className="text-sky-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <div className="text-center">
                    <p className="text-sm font-medium">CRM</p>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3">
                    <p className="text-center text-sm font-medium">Analytics</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-8 -right-5 bg-white rounded-xl shadow-md p-4 max-w-[200px] animate-float animation-delay-1200">
                <p className="text-sm font-medium">Smart Solutions, Affordable Prices</p>
                <div className="mt-2 text-xs text-gray-500">
                  Designed for businesses of all sizes
                </div>
              </div>
              
              <div className="absolute -bottom-16 left-12 bg-white rounded-xl shadow-md p-4 max-w-[200px] animate-float animation-delay-2000">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 1 0 7.75" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Customer Insight</p>
                    <p className="text-xs text-gray-500">Personalized Experience</p>
                  </div>
                </div>
              </div>

              {/* New element from the image you shared */}
              <div className="absolute -top-8 right-10 bg-white rounded-xl shadow-md p-3 animate-float-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-rose-100 flex items-center justify-center text-rose-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>
                  </div>
                  <div>
                    <p className="text-xs font-medium">AI Assistants</p>
                    <p className="text-[10px] text-gray-500">24/7 Support</p>
                  </div>
                </div>
              </div>
            </div>
            
            <img 
              src="/lovable-uploads/bf7b7013-2e1f-462e-b3c6-2081c4ef69e6.png" 
              alt="AI Platform Interface" 
              className="absolute -z-10 w-[110%] h-auto max-w-none opacity-60 top-0 left-[5%]"
              style={{ mixBlendMode: 'multiply' }}
              onLoad={handleImageLoad}
            />
          </div>
        </div>
      </div>
      
      <a href="#services" className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-flowai-black hover:text-flowai-darkGray transition-colors duration-300 animate-bounce-slow">
        <span className="text-sm font-medium mb-2">Scroll to Explore</span>
        <ChevronDown className="animate-bounce" />
      </a>
    </section>
  );
};

export default Hero;
