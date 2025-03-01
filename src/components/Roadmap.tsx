
import { useEffect, useRef, useState } from 'react';
import { MessageSquare, Lightbulb, Code, CheckCircle, Settings } from 'lucide-react';
import { useInView } from '@/lib/animate';

interface RoadmapStepProps {
  icon: JSX.Element;
  title: string;
  description: string;
  number: string;
  isActive: boolean;
  isComplete: boolean;
  onClick: () => void;
}

const RoadmapStep = ({ icon, title, description, number, isActive, isComplete, onClick }: RoadmapStepProps) => {
  return (
    <div 
      className={`relative cursor-pointer transition-all duration-500 ${
        isActive ? 'scale-105' : 'opacity-60 hover:opacity-80'
      }`}
      onClick={onClick}
    >
      <div className={`
        absolute left-0 w-px h-full bg-flowai-black/20 ml-6 mt-12
        ${isComplete ? 'bg-flowai-black' : ''}
      `}></div>
      
      <div className="flex items-start gap-4 relative">
        <div className={`
          flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center z-10
          ${isComplete ? 'bg-flowai-black text-flowai-white' : 'bg-flowai-beigeDark text-flowai-black border border-flowai-black/20'}
          ${isActive ? 'ring-4 ring-flowai-black/10' : ''}
        `}>
          {icon}
        </div>
        
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="text-sm font-bold opacity-40">{number}</span>
            <h5 className={`text-xl font-bold ${isActive ? 'text-flowai-black' : ''}`}>{title}</h5>
          </div>
          <p className="text-base text-flowai-black/80 max-w-md">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

const Roadmap = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: false });
  const containerRef = useRef<HTMLDivElement>(null);
  
  const steps = [
    {
      icon: <MessageSquare size={20} />,
      title: "Consultation",
      description: "We start by understanding your business needs and challenges through in-depth consultation with your team.",
      number: "01"
    },
    {
      icon: <Lightbulb size={20} />,
      title: "Solution Design",
      description: "Our AI experts design a custom solution tailored to your specific requirements and integration needs.",
      number: "02"
    },
    {
      icon: <Code size={20} />,
      title: "Development",
      description: "We build your AI solution using state-of-the-art technology and best practices in software development.",
      number: "03"
    },
    {
      icon: <Settings size={20} />,
      title: "Integration",
      description: "Seamless integration with your existing systems ensures minimal disruption to your operations.",
      number: "04"
    },
    {
      icon: <CheckCircle size={20} />,
      title: "Launch & Support",
      description: "We launch your solution and provide ongoing support to ensure optimal performance and adaptation.",
      number: "05"
    }
  ];
  
  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % steps.length);
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [isInView, steps.length]);
  
  useEffect(() => {
    if (containerRef.current) {
      const rotateX = (window.innerHeight / 2 - window.scrollY) / 30;
      containerRef.current.style.transform = `perspective(1000px) rotateX(${Math.min(Math.max(-5, rotateX), 5)}deg)`;
    }
    
    const handleScroll = () => {
      if (containerRef.current) {
        const rotateX = (window.innerHeight / 2 - window.scrollY) / 30;
        containerRef.current.style.transform = `perspective(1000px) rotateX(${Math.min(Math.max(-5, rotateX), 5)}deg)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="py-24 bg-flowai-white">
      <div className="section-container">
        <div className="text-center mb-16">
          <span className="px-3 py-1 bg-flowai-black text-flowai-white text-sm font-medium rounded-full">
            Our Process
          </span>
          <h2 
            className={`mt-4 ${isInView ? 'animate-fade-in' : 'opacity-0'}`}
            ref={ref as React.RefObject<HTMLHeadingElement>}
          >
            From Idea to Implementation
          </h2>
          <p className="max-w-2xl mx-auto mt-4">
            We follow a structured approach to deliver AI solutions that meet your business needs and exceed your expectations.
          </p>
        </div>
        
        <div 
          ref={containerRef}
          className="preserve-3d transform transition-transform duration-700 ease-out"
          style={{ perspective: '1000px' }}
        >
          <div className="max-w-4xl mx-auto py-10 space-y-12">
            {steps.map((step, index) => (
              <RoadmapStep
                key={index}
                icon={step.icon}
                title={step.title}
                description={step.description}
                number={step.number}
                isActive={activeStep === index}
                isComplete={index < activeStep}
                onClick={() => setActiveStep(index)}
              />
            ))}
          </div>
          
          <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-flowai-white to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
