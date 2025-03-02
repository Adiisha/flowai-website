
import { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const textRef = useRef<HTMLParagraphElement>(null);
  
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#f8f9fa]">
      <div className="absolute inset-0 -z-10 bg-white">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50"></div>
      </div>
      
      {/* Floating elements that move with cursor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[15%] animate-float transform-gpu duration-300 floating-element">
          <div className="bg-sky-50 rounded-full w-12 h-12 flex items-center justify-center">
            <div className="text-sky-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
            </div>
          </div>
        </div>
        <div className="absolute top-[30%] right-[20%] animate-float animation-delay-2000 transform-gpu duration-300 floating-element">
          <div className="bg-teal-50 rounded-full w-10 h-10 flex items-center justify-center">
            <div className="text-teal-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="14.31" y1="8" x2="20.05" y2="17.94"></line><line x1="9.69" y1="8" x2="21.17" y2="8"></line><line x1="7.38" y1="12" x2="13.12" y2="2.06"></line><line x1="9.69" y1="16" x2="3.95" y2="6.06"></line><line x1="14.31" y1="16" x2="2.83" y2="16"></line><line x1="16.62" y1="12" x2="10.88" y2="21.94"></line></svg>
            </div>
          </div>
        </div>
        <div className="absolute bottom-[25%] left-[25%] animate-float animation-delay-1000 transform-gpu duration-300 floating-element">
          <div className="bg-indigo-50 rounded-full w-14 h-14 flex items-center justify-center">
            <div className="text-indigo-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z"></path></svg>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 z-10 pt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <div className="mb-4 inline-block">
              <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full">
                Affordable AI Solutions for Every Business
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
              Transform Your <br/>
              Business with <br/>
              <span className="gradient-text">Intelligent AI</span>
            </h1>
            
            <p className="text-xl mb-10 text-balance text-gray-700">
              Leverage powerful AI tools designed for businesses and startups 
              seeking affordable solutions without compromising on quality or 
              capabilities.
            </p>
            
            <div className="flex flex-col sm:flex-row items-start gap-4">
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
          
          <div className="relative">
            <div className="bg-white rounded-xl shadow-xl p-6 pb-12 relative z-20">
              <div className="absolute -top-10 -left-5 bg-white rounded-xl shadow-md p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center text-sky-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m12 8 4 4-4 4"/><path d="m8 12h8"/></svg>
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
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
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
              
              <div className="absolute -bottom-8 -right-5 bg-white rounded-xl shadow-md p-4 max-w-[200px]">
                <p className="text-sm font-medium">Smart Solutions, Affordable Prices</p>
                <div className="mt-2 text-xs text-gray-500">
                  Designed for businesses of all sizes
                </div>
              </div>
              
              <div className="absolute -bottom-16 left-12 bg-white rounded-xl shadow-md p-4 max-w-[200px]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Customer Insight</p>
                    <p className="text-xs text-gray-500">Personalized Experience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <a 
        href="#services"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-flowai-black hover:text-flowai-darkGray transition-colors duration-300"
      >
        <span className="text-sm font-medium mb-2">Scroll to Explore</span>
        <ChevronDown className="animate-bounce" />
      </a>
    </section>
  );
};

export default Hero;
