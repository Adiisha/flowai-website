
import { useRef, useEffect, useState } from 'react';
import { useInView } from '@/lib/animate';

const About = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const textRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState({
    clients: 0,
    experts: 0,
    satisfaction: 0
  });
  const targetCounts = {
    clients: 150,
    experts: 40,
    satisfaction: 98
  };
  
  // Handle counter animation
  useEffect(() => {
    if (isInView && counts.clients < targetCounts.clients) {
      const clientsInterval = setInterval(() => {
        setCounts(prev => {
          const newClients = Math.min(prev.clients + 1, targetCounts.clients);
          const newExperts = Math.min(prev.experts + 1, targetCounts.experts);
          const newSatisfaction = Math.min(prev.satisfaction + 1, targetCounts.satisfaction);
          
          if (newClients === targetCounts.clients && 
              newExperts === targetCounts.experts && 
              newSatisfaction === targetCounts.satisfaction) {
            clearInterval(clientsInterval);
          }
          
          return {
            clients: newClients,
            experts: newExperts,
            satisfaction: newSatisfaction
          };
        });
      }, 30);
      
      return () => clearInterval(clientsInterval);
    }
  }, [isInView, counts]);
  
  useEffect(() => {
    if (isInView && codeRef.current) {
      const codeElement = codeRef.current;
      const codeLines = [
        'import { AI } from "@flow/core";',
        '',
        'class BusinessSolution extends AI {',
        '  constructor(client) {',
        '    super();',
        '    this.client = client;',
        '    this.challenges = client.challenges;',
        '  }',
        '',
        '  async analyze() {',
        '    const insights = await this.processData(',
        '      this.client.data',
        '    );',
        '    return insights;',
        '  }',
        '',
        '  createStrategy() {',
        '    return {',
        '      solutions: this.challenges.map(challenge => ({',
        '        problem: challenge.description,',
        '        solution: this.generateSolution(challenge)',
        '      }))',
        '    };',
        '  }',
        '}',
        '',
        'export default BusinessSolution;'
      ];
      
      let i = 0;
      
      const typeCode = () => {
        if (i < codeLines.length) {
          const codeLine = document.createElement('div');
          codeLine.className = 'code-line';
          
          // Add syntax highlighting classes
          let line = codeLines[i];
          
          if (line.includes('import') || line.includes('export')) {
            line = `<span class="text-green-500">${line}</span>`;
          } else if (line.includes('class') || line.includes('extends')) {
            line = line.replace('class', '<span class="text-blue-500">class</span>')
                       .replace('extends', '<span class="text-blue-500">extends</span>')
                       .replace('BusinessSolution', '<span class="text-yellow-400">BusinessSolution</span>')
                       .replace('AI', '<span class="text-teal-400">AI</span>');
          } else if (line.includes('constructor') || line.includes('async')) {
            line = line.replace('constructor', '<span class="text-blue-500">constructor</span>')
                       .replace('async', '<span class="text-blue-500">async</span>');
          } else if (line.includes('this')) {
            line = line.replace(/this\./g, '<span class="text-teal-400">this.</span>');
          } else if (line.includes('return')) {
            line = line.replace('return', '<span class="text-blue-500">return</span>');
          } else if (line.match(/[a-zA-Z]+\(/)) {
            line = line.replace(/([a-zA-Z]+)(\()/g, '<span class="text-green-400">$1</span>$2');
          }
          
          codeLine.innerHTML = line || '&nbsp;';
          codeElement.appendChild(codeLine);
          i++;
          
          setTimeout(typeCode, line ? 100 : 50);
        }
      };
      
      // Clear previous code
      codeElement.innerHTML = '';
      typeCode();
    }
  }, [isInView]);
  
  return (
    <section id="about" className="py-24 bg-flowai-beige">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div
            ref={ref as React.RefObject<HTMLDivElement>} 
            className={`relative h-[400px] overflow-hidden rounded-2xl ${isInView ? 'animate-fade-in' : 'opacity-0'}`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1f2c] to-[#2c3e50] rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#ffffff33_0%,_transparent_70%)]"></div>
              <div 
                ref={codeRef}
                className="text-left p-8 font-mono text-sm overflow-auto h-full text-gray-300 code-container animate-typing"
              >
                {/* Code will be typed here */}
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-flowai-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg max-w-[280px]">
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
                <div className="text-3xl font-bold mb-2 text-flowai-black">{counts.clients}+</div>
                <p className="text-base">Clients Worldwide</p>
              </div>
              <div className="flex flex-col">
                <div className="text-3xl font-bold mb-2 text-flowai-black">{counts.experts}+</div>
                <p className="text-base">AI Experts</p>
              </div>
              <div className="flex flex-col">
                <div className="text-3xl font-bold mb-2 text-flowai-black">{counts.satisfaction}%</div>
                <p className="text-base">Client Satisfaction</p>
              </div>
              <div className="flex flex-col">
                <div className="text-3xl font-bold mb-2 text-flowai-black">24/7</div>
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
