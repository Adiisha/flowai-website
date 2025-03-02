import React, { useState, useEffect, useRef } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { MessageSquare, UserCheck, Code, CheckCircle } from 'lucide-react';
import { useInView } from '@/lib/animate';
const Roadmap = () => {
  const {
    ref,
    isInView
  } = useInView({
    threshold: 0.1
  });
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const lineContainerRef = useRef<HTMLDivElement>(null);
  const [lineProgress, setLineProgress] = useState(0);

  // Data for pie chart
  const data = [{
    name: 'Step 1: Discovery',
    value: 25,
    color: '#0ea5e9'
  }, {
    name: 'Step 2: Design',
    value: 25,
    color: '#14b8a6'
  }, {
    name: 'Step 3: Development',
    value: 25,
    color: '#6366f1'
  }, {
    name: 'Step 4: Delivery',
    value: 25,
    color: '#f97316'
  }];
  const COLORS = ['#0ea5e9', '#14b8a6', '#6366f1', '#f97316'];

  // Enhanced scroll animation for the connecting line
  useEffect(() => {
    const handleScroll = () => {
      if (lineContainerRef.current) {
        const rect = lineContainerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calculate how much of the element is in view
        const visibleHeight = Math.min(windowHeight, rect.bottom) - Math.max(0, rect.top);
        const percentVisible = visibleHeight / rect.height;

        // More responsive scaling based on visibility
        const scrollPercentage = Math.max(0, Math.min(1, percentVisible * 1.5));

        // Only update when visible
        if (rect.top < windowHeight && rect.bottom > 0) {
          setLineProgress(Math.max(0, Math.min(100, scrollPercentage * 150)));
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    // Initial calculation
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const CustomTooltip = ({
    active,
    payload
  }: any) => {
    if (active && payload && payload.length) {
      return <div className="bg-white p-3 shadow-lg rounded-md border border-gray-100 transition-all duration-300 animate-float">
          <p className="font-bold">{payload[0].name}</p>
          <p className="text-gray-600">Our Process</p>
        </div>;
    }
    return null;
  };

  // Our workflow/story steps
  const storySteps = [{
    title: "Step 1: Discovery",
    icon: <MessageSquare className="h-8 w-8 text-sky-500" />,
    description: "We start by understanding your business needs and goals through in-depth consultations. Our AI analyzes your requirements to suggest the most effective solutions.",
    color: '#0ea5e9'
  }, {
    title: "Step 2: Design",
    icon: <UserCheck className="h-8 w-8 text-teal-500" />,
    description: "Our team designs custom AI solutions tailored to your specific needs, creating prototypes for your feedback and approval.",
    color: '#14b8a6'
  }, {
    title: "Step 3: Development",
    icon: <Code className="h-8 w-8 text-indigo-500" />,
    description: "Our engineers develop your AI solution using cutting-edge technologies while keeping you updated throughout the process.",
    color: '#6366f1'
  }, {
    title: "Step 4: Delivery",
    icon: <CheckCircle className="h-8 w-8 text-orange-500" />,
    description: "We deploy your AI solution, provide thorough training for your team, and offer ongoing support to ensure optimal performance.",
    color: '#f97316'
  }];
  return <section id="roadmap" className="bg-white py-0">
      <div className="section-container">
        <div className="text-center mb-16">
          <span className="px-3 py-1 bg-flowai-black text-flowai-white text-sm font-medium rounded-full">
            Our Working Process
          </span>
          <h2 className="mt-4">How We Bring AI To Life</h2>
          <p className="max-w-2xl mx-auto mt-4 text-gray-700">
            From concept to implementation, we follow a structured approach to ensure your AI solution delivers maximum value.
          </p>
        </div>

        {/* Fixed the ref type issue here by creating a div with proper ref type */}
        <div className="max-w-4xl mx-auto" ref={ref as React.RefObject<HTMLDivElement>}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="h-[400px] w-full relative">
              {/* Enhanced floating elements around the pie chart - more reactive */}
              <div className="absolute -top-6 -left-6 animate-float animation-delay-700 transform-gpu duration-300 floating-element">
                <div className="bg-sky-50 rounded-full w-12 h-12 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                </div>
              </div>
              <div className="absolute top-[40%] -right-4 animate-float animation-delay-1400 transform-gpu duration-300 floating-element">
                <div className="bg-teal-50 rounded-full w-10 h-10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.29 7 12 12 20.71 7"></polyline><line x1="12" y1="22" x2="12" y2="12"></line></svg>
                </div>
              </div>
              <div className="absolute bottom-10 left-10 animate-float animation-delay-500 transform-gpu duration-300 floating-element">
                <div className="bg-indigo-50 rounded-full w-14 h-14 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3c.53 0 1.039.211 1.414.586l7 7 .002.002c.389.39.605.923.588 1.473a2.1 2.1 0 0 1-.586 1.357l-7.002 7.002c-.378.378-.888.586-1.415.586a1.99 1.99 0 0 1-1.415-.586l-7.002-7.002a1.988 1.988 0 0 1 0-2.828l7.002-7.002A1.99 1.99 0 0 1 12.001 3Z"></path></svg>
                </div>
              </div>
              
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={150} innerRadius={60} paddingAngle={5} dataKey="value" animationDuration={1500} className="cursor-pointer" onClick={(_, index) => setActiveStoryIndex(index)}>
                    {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className="hover:opacity-80 transition-opacity duration-300" stroke={activeStoryIndex === index ? "#000" : "#fff"} strokeWidth={activeStoryIndex === index ? 2 : 1} />)}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              
              <div className="text-center mt-4">
                <p className="text-sm text-gray-500">Click on sections to explore our process</p>
              </div>
            </div>

            <div className="space-y-6 relative" ref={lineContainerRef}>
              {/* Enhanced connecting line with more visible gradient */}
              <div className="absolute w-1.5 bg-gray-200 h-full left-4 top-0 rounded-full"></div>
              <div className="absolute w-1.5 bg-gradient-to-b from-sky-500 via-indigo-500 to-orange-500 left-4 top-0 transition-all duration-700 ease-out rounded-full" style={{
              height: `${lineProgress}%`
            }}></div>
              
              {storySteps.map((step, index) => <div key={index} className={`relative pl-12 py-4 transition-all duration-500 cursor-pointer rounded-lg ${activeStoryIndex === index ? 'scale-105 bg-gray-50 shadow-sm border border-gray-100' : 'opacity-70 hover:opacity-90'}`} onClick={() => setActiveStoryIndex(index)}>
                  <div className={`absolute left-0 p-2 rounded-full ${activeStoryIndex === index ? 'animate-pulse-subtle' : ''}`} style={{
                backgroundColor: step.color + '20'
              }}>
                    {step.icon}
                  </div>
                  <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                  <p className="text-gray-700">{step.description}</p>
                  
                  {activeStoryIndex === index && <div className={`mt-3 animate-fade-in flex gap-2 flex-wrap`}>
                      {index === 0 && <>
                          <span className="tech-badge">AI Analysis</span>
                          <span className="tech-badge">Requirements Gathering</span>
                        </>}
                      {index === 1 && <>
                          <span className="tech-badge">UI/UX Design</span>
                          <span className="tech-badge">Wireframing</span>
                          <span className="tech-badge">Prototyping</span>
                        </>}
                      {index === 2 && <>
                          <span className="tech-badge">Python</span>
                          <span className="tech-badge">TensorFlow</span>
                          <span className="tech-badge">React</span>
                        </>}
                      {index === 3 && <>
                          <span className="tech-badge">Support</span>
                          <span className="tech-badge">Training</span>
                          <span className="tech-badge">Maintenance</span>
                        </>}
                    </div>}
                </div>)}
            </div>
          </div>
          
          {/* Removed the "Learn more about our process" button as requested */}
        </div>
      </div>
    </section>;
};
export default Roadmap;