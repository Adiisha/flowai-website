
import { useEffect, useRef, useState } from 'react';
import { CheckCircle, MessageSquare, Code, Database, BarChart, RefreshCw } from 'lucide-react';

const Roadmap = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [scrollHeight, setScrollHeight] = useState(0);
  const roadmapRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (roadmapRef.current) {
        const rect = roadmapRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const sectionVisible = rect.top < windowHeight * 0.5;
        
        // Calculate progress based on how much of the section has been scrolled
        if (sectionVisible) {
          const sectionHeight = rect.height;
          const scrolled = windowHeight * 0.5 - rect.top;
          const progress = Math.min(100, Math.max(0, (scrolled / sectionHeight) * 100 * 1.5));
          setScrollHeight(progress);
          
          // Update active step based on scroll progress
          if (progress < 20) {
            setActiveStep(1);
          } else if (progress < 40) {
            setActiveStep(2);
          } else if (progress < 60) {
            setActiveStep(3);
          } else if (progress < 80) {
            setActiveStep(4);
          } else {
            setActiveStep(5);
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (lineRef.current) {
      lineRef.current.style.height = `${scrollHeight}%`;
    }
  }, [scrollHeight]);

  const steps = [
    {
      number: 1,
      title: "Consultation",
      description: "We start with understanding your business needs, discussing challenges, and setting clear objectives for the AI solution.",
      icon: <MessageSquare className="h-6 w-6" />
    },
    {
      number: 2,
      title: "Solution Design",
      description: "Our experts create a tailored architecture and roadmap, selecting the right technologies that align with your requirements.",
      icon: <Code className="h-6 w-6" />
    },
    {
      number: 3,
      title: "Development",
      description: "We build your custom solution using agile methodology, with regular demos and feedback sessions to ensure alignment.",
      icon: <Database className="h-6 w-6" />
    },
    {
      number: 4,
      title: "Deployment",
      description: "We seamlessly integrate the solution into your existing infrastructure, with comprehensive training for your team.",
      icon: <BarChart className="h-6 w-6" />
    },
    {
      number: 5,
      title: "Continuous Improvement",
      description: "Our relationship continues after deployment. We monitor the solution's performance, gather feedback, and continuously refine the AI models to ensure they evolve with your business and maintain optimal effectiveness.",
      icon: <RefreshCw className="h-6 w-6" />
    }
  ];

  return (
    <section id="process" ref={roadmapRef} className="py-16 bg-flowai-beigePale relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="px-3 py-1 bg-flowai-beigeSubtle text-flowai-black text-sm font-medium rounded-full">
            How We Work
          </span>
          <h2 className="text-3xl font-bold mt-4 text-flowai-black">Our Process</h2>
          <p className="max-w-2xl mx-auto mt-4 text-flowai-black">
            Our streamlined approach ensures efficient delivery of high-quality AI solutions tailored to your business needs.
          </p>
        </div>
        
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Timeline with steps */}
          <div className="relative pl-12 space-y-12">
            {steps.map((step) => (
              <div 
                key={step.number} 
                className={`relative transition-all duration-500 ${
                  activeStep >= step.number ? 'opacity-100' : 'opacity-40'
                }`}
              >
                <div className={`absolute -left-12 flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                  activeStep >= step.number 
                    ? 'bg-flowai-black text-flowai-white scale-110' 
                    : 'bg-flowai-beigeSubtle text-flowai-black'
                }`}>
                  {step.number}
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-flowai-black flex items-center">
                  {step.title}
                </h3>
                <p className="text-flowai-black">{step.description}</p>
                
                {activeStep === step.number && (
                  <div className="mt-2">
                    <CheckCircle className="w-5 h-5 text-green-500 inline mr-2" />
                    <span className="text-sm text-green-600">Currently Active</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Circular progress visualization */}
          <div className="relative md:pl-8">
            <div className="aspect-square rounded-full bg-flowai-white p-4 shadow-lg max-w-[400px] mx-auto relative">
              {steps.map((step, index) => {
                const angle = (index * 72) - 90; // 72 degrees per segment (360/5), starting from top (-90)
                const isActive = activeStep >= step.number;
                
                // Calculate position on the circle
                const radius = 42; // percentage from center
                const radians = (angle * Math.PI) / 180;
                const x = 50 + radius * Math.cos(radians);
                const y = 50 + radius * Math.sin(radians);
                
                return (
                  <div 
                    key={step.number}
                    className={`absolute w-14 h-14 flex items-center justify-center rounded-full shadow-md transition-all duration-500
                        ${isActive ? 'bg-flowai-black text-flowai-white' : 'bg-flowai-beigePale text-flowai-black'}`}
                    style={{
                      left: `calc(${x}% - 28px)`,
                      top: `calc(${y}% - 28px)`,
                      transform: `scale(${isActive ? 1.1 : 0.9})`,
                    }}
                  >
                    {step.icon}
                  </div>
                );
              })}
              
              {/* Inner circle with current step number */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-flowai-black flex items-center justify-center">
                <div className="text-flowai-white text-3xl font-bold">
                  {activeStep}/5
                </div>
              </div>
              
              {/* Background segments */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                {steps.map((step, index) => {
                  const startAngle = index * 72;
                  const endAngle = (index + 1) * 72;
                  
                  // Calculate SVG arc path
                  const startRad = ((startAngle - 90) * Math.PI) / 180;
                  const endRad = ((endAngle - 90) * Math.PI) / 180;
                  
                  const x1 = 50 + 45 * Math.cos(startRad);
                  const y1 = 50 + 45 * Math.sin(startRad);
                  const x2 = 50 + 45 * Math.cos(endRad);
                  const y2 = 50 + 45 * Math.sin(endRad);
                  
                  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
                  
                  const d = `M 50 50 L ${x1} ${y1} A 45 45 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
                  
                  return (
                    <path 
                      key={step.number}
                      d={d}
                      className={`transition-all duration-500 ${
                        activeStep >= step.number 
                          ? 'fill-flowai-beigeSubtle opacity-70'
                          : 'fill-flowai-beigeSubtle opacity-25'
                      }`}
                      stroke={activeStep >= step.number ? "#000000" : "#cccccc"}
                      strokeWidth="0.5"
                    />
                  );
                })}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
