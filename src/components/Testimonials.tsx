
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { useInView } from '@/lib/animate';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
}

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { ref, isInView } = useInView({ threshold: 0.1 });
  
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "CTO",
      company: "TechVision Inc.",
      quote: "Flow AI's chatbot revolutionized our customer support. Our efficiency doubled and customer satisfaction scores increased by 40% within just two months.",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Director of Operations",
      company: "GlobalServe",
      quote: "The AI-powered CRM solution has transformed how we manage customer relationships. Our sales team now closes 30% more deals with the predictive insights.",
      rating: 5
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      role: "Head of Support",
      company: "Nexus Solutions",
      quote: "Implementing Flow AI's ticketing system was a game-changer for our support department. Response times decreased by 65% and our team can focus on complex issues.",
      rating: 4
    }
  ];
  
  useEffect(() => {
    if (isInView && !isPaused) {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 5000);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isInView, isPaused, testimonials.length]);
  
  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    resetInterval();
  };
  
  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    resetInterval();
  };
  
  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
  };
  
  return (
    <section className="py-24 bg-flowai-beige">
      <div className="section-container">
        <div className="text-center mb-16">
          <span className="px-3 py-1 bg-flowai-black text-flowai-white text-sm font-medium rounded-full">
            Success Stories
          </span>
          <h2 
            ref={ref as React.RefObject<HTMLHeadingElement>}
            className={`mt-4 ${isInView ? 'animate-fade-in' : 'opacity-0'}`}
          >
            What Our Clients Say
          </h2>
        </div>
        
        <div 
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="w-full flex-shrink-0 px-6"
                >
                  <div className="bg-flowai-white rounded-2xl p-8 md:p-10 shadow-sm relative">
                    <div className="absolute top-8 right-8 text-flowai-black/10">
                      <Quote size={80} />
                    </div>
                    
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-flowai-beigeDark rounded-full flex items-center justify-center text-xl font-bold">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <h5 className="font-bold">{testimonial.name}</h5>
                        <p className="text-sm text-flowai-black/70">{testimonial.role}, {testimonial.company}</p>
                      </div>
                    </div>
                    
                    <p className="text-lg mb-6 relative z-10">"{testimonial.quote}"</p>
                    
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          className={i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={handlePrev}
            className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-6 w-12 h-12 rounded-full bg-flowai-black text-flowai-white flex items-center justify-center shadow-lg transform transition-transform hover:scale-105 focus:outline-none"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-6 w-12 h-12 rounded-full bg-flowai-black text-flowai-white flex items-center justify-center shadow-lg transform transition-transform hover:scale-105 focus:outline-none"
          >
            <ChevronRight size={24} />
          </button>
          
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveIndex(index);
                  resetInterval();
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  activeIndex === index 
                    ? 'bg-flowai-black w-6' 
                    : 'bg-flowai-black/30 hover:bg-flowai-black/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
