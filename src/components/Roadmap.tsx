
import { useEffect, useRef, useState } from 'react';
import { MessageSquare, Lightbulb, Code, CheckCircle, Settings } from 'lucide-react';
import { useInView } from '@/lib/animate';

interface RoadmapStepProps {
  icon: JSX.Element;
  title: string;
  description: string;
  number: string;
  isActive: boolean;
  color: string;
  onClick: () => void;
}

const RoadmapStep = ({ icon, title, description, number, isActive, color, onClick }: RoadmapStepProps) => {
  return (
    <div 
      className={`relative cursor-pointer transition-all duration-500 rounded-lg p-6
        ${isActive ? 'scale-105 shadow-lg' : 'opacity-90 hover:opacity-100'}`}
      onClick={onClick}
      style={{
        backgroundColor: isActive ? `${color}20` : 'transparent',
        borderLeft: `4px solid ${color}`
      }}
    >
      <div className="flex items-start gap-4 relative">
        <div 
          className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center z-10"
          style={{ 
            backgroundColor: color,
            boxShadow: isActive ? `0 0 20px ${color}80` : 'none'
          }}
        >
          {icon}
        </div>
        
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="text-sm font-bold opacity-40">{number}</span>
            <h5 className="text-xl font-bold">{title}</h5>
          </div>
          <p className="text-base text-flowai-black/80 max-w-md">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

const PieSegment = ({ 
  startAngle, 
  endAngle, 
  innerRadius = 50, 
  outerRadius = 100,
  color,
  isActive,
  onClick
}: { 
  startAngle: number, 
  endAngle: number, 
  innerRadius?: number, 
  outerRadius?: number,
  color: string,
  isActive: boolean,
  onClick: () => void
}) => {
  // Convert angles from degrees to radians
  const startRad = (startAngle * Math.PI) / 180;
  const endRad = (endAngle * Math.PI) / 180;
  
  // Calculate the four points of the pie segment
  const innerStartX = innerRadius * Math.cos(startRad);
  const innerStartY = innerRadius * Math.sin(startRad);
  const innerEndX = innerRadius * Math.cos(endRad);
  const innerEndY = innerRadius * Math.sin(endRad);
  
  const outerStartX = outerRadius * Math.cos(startRad);
  const outerStartY = outerRadius * Math.sin(startRad);
  const outerEndX = outerRadius * Math.cos(endRad);
  const outerEndY = outerRadius * Math.sin(endRad);
  
  // Determine if the arc is large or small (> 180 degrees)
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  
  // Create the path
  const path = [
    `M ${innerStartX} ${innerStartY}`, // Move to inner start point
    `L ${outerStartX} ${outerStartY}`, // Line to outer start point
    `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${outerEndX} ${outerEndY}`, // Arc to outer end point
    `L ${innerEndX} ${innerEndY}`, // Line to inner end point
    `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerStartX} ${innerStartY}`, // Arc back to inner start point
    "Z" // Close the path
  ].join(" ");

  const hoverRadius = isActive ? outerRadius * 1.1 : outerRadius;
  const activeOuterStartX = hoverRadius * Math.cos(startRad);
  const activeOuterStartY = hoverRadius * Math.sin(startRad);
  const activeOuterEndX = hoverRadius * Math.cos(endRad);
  const activeOuterEndY = hoverRadius * Math.sin(endRad);
  
  const activePath = [
    `M ${innerStartX} ${innerStartY}`,
    `L ${activeOuterStartX} ${activeOuterStartY}`,
    `A ${hoverRadius} ${hoverRadius} 0 ${largeArcFlag} 1 ${activeOuterEndX} ${activeOuterEndY}`,
    `L ${innerEndX} ${innerEndY}`,
    `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerStartX} ${innerStartY}`,
    "Z"
  ].join(" ");
  
  return (
    <path 
      d={isActive ? activePath : path} 
      fill={color}
      stroke="#ffffff"
      strokeWidth="1"
      className="transition-all duration-300 cursor-pointer"
      style={{
        filter: isActive ? `drop-shadow(0 0 8px ${color})` : 'none',
        opacity: isActive ? 1 : 0.8
      }}
      onClick={onClick}
    />
  );
};

const Roadmap = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: false });
  const containerRef = useRef<HTMLDivElement>(null);
  const pieChartRef = useRef<SVGSVGElement>(null);
  
  const steps = [
    {
      icon: <MessageSquare size={20} className="text-white" />,
      title: "Consultation",
      description: "We start by understanding your business needs and challenges through in-depth consultation with your team.",
      number: "01",
      color: "#8B5CF6" // Vivid Purple
    },
    {
      icon: <Lightbulb size={20} className="text-white" />,
      title: "Solution Design",
      description: "Our AI experts design a custom solution tailored to your specific requirements and integration needs.",
      number: "02",
      color: "#D946EF" // Magenta Pink
    },
    {
      icon: <Code size={20} className="text-white" />,
      title: "Development",
      description: "We build your AI solution using state-of-the-art technology and best practices in software development.",
      number: "03",
      color: "#F97316" // Bright Orange
    },
    {
      icon: <Settings size={20} className="text-white" />,
      title: "Integration",
      description: "Seamless integration with your existing systems ensures minimal disruption to your operations.",
      number: "04",
      color: "#0EA5E9" // Ocean Blue
    },
    {
      icon: <CheckCircle size={20} className="text-white" />,
      title: "Launch & Support",
      description: "We launch your solution and provide ongoing support to ensure optimal performance and adaptation.",
      number: "05",
      color: "#2DD4BF" // Teal
    }
  ];
  
  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % steps.length);
      }, 4000);
      
      return () => clearInterval(interval);
    }
  }, [isInView, steps.length]);
  
  // Calculate angles for pie chart segments
  const anglePerStep = 360 / steps.length;
  
  // Wheel scroll interaction
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const handleWheel = (e: WheelEvent) => {
      if (isInView) {
        e.preventDefault();
        
        if (e.deltaY > 0) {
          // Scrolling down, move to next step
          setActiveStep(prev => (prev + 1) % steps.length);
        } else {
          // Scrolling up, move to previous step
          setActiveStep(prev => (prev - 1 + steps.length) % steps.length);
        }
      }
    };
    
    container.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [isInView, steps.length]);

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
          className="max-w-6xl mx-auto py-10 flex flex-col md:flex-row items-center justify-center gap-12"
        >
          {/* Pie chart visualization */}
          <div className="w-[300px] h-[300px] relative">
            <svg 
              ref={pieChartRef}
              viewBox="-120 -120 240 240" 
              className="w-full h-full transform transition-transform duration-500"
              style={{ transform: `rotate(${-90 + anglePerStep/2}deg)` }}
            >
              {steps.map((step, index) => {
                const startAngle = index * anglePerStep;
                const endAngle = (index + 1) * anglePerStep;
                
                return (
                  <PieSegment
                    key={index}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    innerRadius={50}
                    outerRadius={100}
                    color={step.color}
                    isActive={activeStep === index}
                    onClick={() => setActiveStep(index)}
                  />
                );
              })}
              <circle cx="0" cy="0" r="40" fill="#f1efe7" stroke="#e8e6de" strokeWidth="2" />
              <text
                x="0"
                y="0"
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-2xl font-bold"
                fill="#000"
              >
                {activeStep + 1}/5
              </text>
            </svg>
          </div>
          
          {/* Step description */}
          <div className="md:w-1/2">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`transition-all duration-500 ${
                  activeStep === index ? 'opacity-100 h-auto' : 'opacity-0 h-0 overflow-hidden'
                }`}
              >
                <RoadmapStep
                  icon={step.icon}
                  title={step.title}
                  description={step.description}
                  number={step.number}
                  isActive={true}
                  color={step.color}
                  onClick={() => {}}
                />
              </div>
            ))}
            
            {/* Progress indicator */}
            <div className="flex justify-center space-x-2 mt-8">
              {steps.map((step, index) => (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className="w-3 h-3 rounded-full transition-all duration-300"
                  style={{ 
                    backgroundColor: activeStep === index ? step.color : '#e8e6de',
                    width: activeStep === index ? '24px' : '12px',
                    boxShadow: activeStep === index ? `0 0 10px ${step.color}80` : 'none'
                  }}
                  aria-label={`Go to step ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
