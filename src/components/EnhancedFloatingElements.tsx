
import { useEffect, useRef } from 'react';
import { BarChart2, Database, Users, MessageSquare, PieChart, Code, Server, BarChart } from 'lucide-react';

type FloatingElement = {
  id: number;
  component: JSX.Element;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
};

const EnhancedFloatingElements = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<FloatingElement[]>([]);
  const animationRef = useRef<number | null>(null);

  // Function to create mockup UI elements
  const createMockUi = (type: string, size: number) => {
    const scale = size / 100; // Normalize size
    
    switch (type) {
      case 'bar-chart':
        return (
          <div className="flex flex-col items-center justify-center bg-white/80 rounded-md shadow-sm p-1 transform scale-[.3] origin-top-left">
            <div className="text-xs font-bold mb-1">Analytics</div>
            <div className="flex items-end space-x-1 h-12">
              {[40, 65, 30, 85, 50, 70].map((height, i) => (
                <div 
                  key={i} 
                  className="w-2 bg-gradient-to-t from-sky-500 to-teal-400 rounded-t"
                  style={{ height: `${height * scale}%` }}
                ></div>
              ))}
            </div>
          </div>
        );
      
      case 'database':
        return (
          <div className="flex flex-col bg-white/80 rounded-md shadow-sm p-1 transform scale-[.3] origin-top-left w-24">
            <div className="text-xs font-bold mb-1">Database</div>
            <div className="space-y-1">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-sky-500 to-teal-400 rounded-full"
                    style={{ width: `${Math.random() * 60 + 40}%` }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'crm':
        return (
          <div className="flex flex-col bg-white/80 rounded-md shadow-sm p-1 transform scale-[.3] origin-top-left w-32">
            <div className="text-xs font-bold mb-1">CRM Dashboard</div>
            <div className="grid grid-cols-2 gap-1">
              <div className="bg-sky-100 p-0.5 rounded text-[0.5rem]">Leads: 42</div>
              <div className="bg-teal-100 p-0.5 rounded text-[0.5rem]">Sales: 18</div>
              <div className="bg-indigo-100 p-0.5 rounded text-[0.5rem]">Tasks: 7</div>
              <div className="bg-purple-100 p-0.5 rounded text-[0.5rem]">Meetings: 3</div>
            </div>
          </div>
        );
      
      case 'pie-chart':
        return (
          <div className="relative h-16 w-16 transform scale-[.3] origin-top-left">
            <PieChart className="w-full h-full text-sky-500/60" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-xs">76%</div>
            </div>
          </div>
        );
        
      case 'code-snippet':
        return (
          <div className="bg-gray-800/80 rounded p-1 text-[0.4rem] text-green-400 font-mono transform scale-[.3] origin-top-left w-32">
            <div>{'function analyze() {'}</div>
            <div>{'  const data = getData();'}</div>
            <div>{'  return processAI(data);'}</div>
            <div>{'}'}</div>
          </div>
        );
        
      case 'server':
        return (
          <div className="flex items-center space-x-1 bg-white/80 rounded p-1 transform scale-[.3] origin-top-left">
            <Server className="h-5 w-5 text-purple-500/60" />
            <div className="space-y-0.5">
              <div className="h-1 w-10 bg-gray-200 rounded-full">
                <div className="h-full w-3/4 bg-purple-500/60 rounded-full"></div>
              </div>
              <div className="h-1 w-10 bg-gray-200 rounded-full">
                <div className="h-full w-1/2 bg-purple-500/60 rounded-full"></div>
              </div>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="bg-white/80 rounded-full h-4 w-4"></div>
        );
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Initialize floating elements with various UI components
    const elements: FloatingElement[] = [];
    const types = ['bar-chart', 'database', 'crm', 'pie-chart', 'code-snippet', 'server'];
    const icons = [
      <BarChart2 className="text-sky-500/30" />,
      <Database className="text-teal-500/30" />,
      <Users className="text-indigo-500/30" />,
      <MessageSquare className="text-purple-500/30" />,
      <Code className="text-amber-500/30" />,
      <BarChart className="text-rose-500/30" />
    ];
    
    // Create 40-45 floating elements spread throughout the page (increased from 25-30)
    const documentHeight = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight
    );
    
    for (let i = 0; i < 45; i++) {
      const useIcon = Math.random() > 0.6;
      const type = types[Math.floor(Math.random() * types.length)];
      const size = Math.random() * 40 + 20;
      
      elements.push({
        id: i,
        component: useIcon 
          ? icons[Math.floor(Math.random() * icons.length)]
          : createMockUi(type, size),
        x: Math.random() * window.innerWidth,
        y: Math.random() * documentHeight,
        size: size,
        speed: Math.random() * 1 + 0.5,
        opacity: Math.random() * 0.3 + 0.15 // Increased opacity for better visibility (0.15-0.45)
      });
    }
    
    elementsRef.current = elements;
    
    // Animation loop for subtle movement
    const animate = () => {
      elementsRef.current = elementsRef.current.map(element => {
        // Create subtle floating motion
        const newY = element.y + Math.sin(Date.now() * 0.001 * element.speed) * 0.5;
        const newX = element.x + Math.cos(Date.now() * 0.001 * element.speed) * 0.5;
        
        return {
          ...element,
          y: newY,
          x: newX
        };
      });
      
      renderElements();
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Render the elements to the DOM
    const renderElements = () => {
      if (!containerRef.current) return;
      
      containerRef.current.innerHTML = '';
      
      elementsRef.current.forEach(element => {
        const div = document.createElement('div');
        div.className = 'absolute transition-all duration-300 interactive-floating-element'; 
        div.style.left = `${element.x}px`;
        div.style.top = `${element.y}px`;
        div.style.opacity = element.opacity.toString();
        div.style.width = `${element.size}px`;
        div.style.height = `${element.size}px`;
        div.style.zIndex = '-5';
        div.style.overflow = 'visible';
        
        // Create a React portal for the JSX element
        const temp = document.createElement('div');
        temp.className = 'w-full h-full flex items-center justify-center';
        div.appendChild(temp);
        
        // Use innerHTML as a simple way to render the component
        if (typeof element.component === 'object') {
          // For Lucide icons
          if ('props' in element.component && element.component.type.toString().includes('lucide')) {
            temp.innerHTML = `<svg width="${element.size}" height="${element.size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${element.component.props.className || ''}"><use href="#${element.component.type.name.toLowerCase()}"></use></svg>`;
          } else {
            // For mockup UI elements, need to create them directly here
            const mockType = element.id % types.length;
            temp.replaceWith(document.createRange().createContextualFragment(
              `<div class="mock-ui mock-ui-${types[mockType]}" style="transform: scale(${element.size / 100})"></div>`
            ));
          }
        }
        
        containerRef.current.appendChild(div);
      });
    };
    
    // Mouse interaction logic
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const scrollY = window.scrollY;
      
      // Find elements within interaction range
      elementsRef.current = elementsRef.current.map(element => {
        const deltaX = clientX - element.x;
        const deltaY = (clientY + scrollY) - element.y;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        // Only interact with elements within 150px
        if (distance < 150) {
          // Calculate repulsion (stronger at close ranges)
          const repulsion = 100 / (distance + 10);
          const angle = Math.atan2(deltaY, deltaX);
          
          // Move element away from cursor
          return {
            ...element,
            x: element.x - Math.cos(angle) * repulsion * 2,
            y: element.y - Math.sin(angle) * repulsion * 2,
            opacity: element.opacity * 1.5 // Increase opacity on interaction
          };
        }
        
        return element;
      });
      
      renderElements();
    };
    
    // Start animation
    animate();
    window.addEventListener('mousemove', handleMouseMove);
    
    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none overflow-hidden z-[-5]"
      aria-hidden="true"
    ></div>
  );
};

export default EnhancedFloatingElements;
