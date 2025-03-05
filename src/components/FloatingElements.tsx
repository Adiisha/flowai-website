import { useEffect, useRef } from 'react';
import { BarChart3, Database, Globe, Activity, Users, PieChart, LayoutDashboard, Network, Server, Code } from 'lucide-react';

const FloatingElements = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Define elements that will float - increase number and size for better visibility
    const elements = [
      { icon: BarChart3, size: 28, color: 'text-sky-500/30', delay: 0 },
      { icon: Database, size: 24, color: 'text-teal-500/30', delay: 5 },
      { icon: Globe, size: 32, color: 'text-indigo-500/30', delay: 2 },
      { icon: Activity, size: 26, color: 'text-amber-500/30', delay: 7 },
      { icon: Users, size: 30, color: 'text-purple-500/30', delay: 3 },
      { icon: PieChart, size: 34, color: 'text-pink-500/30', delay: 6 },
      { icon: Database, size: 22, color: 'text-blue-500/30', delay: 9 },
      { icon: LayoutDashboard, size: 36, color: 'text-emerald-500/30', delay: 4 },
      { icon: Network, size: 32, color: 'text-orange-500/30', delay: 1 },
      { icon: Server, size: 26, color: 'text-cyan-500/30', delay: 8 },
      { icon: Code, size: 30, color: 'text-red-500/30', delay: 2 },
      { icon: BarChart3, size: 24, color: 'text-lime-500/30', delay: 5 },
      { icon: Users, size: 34, color: 'text-violet-500/30', delay: 7 },
      { icon: Globe, size: 28, color: 'text-yellow-500/30', delay: 0 },
      { icon: PieChart, size: 32, color: 'text-fuchsia-500/30', delay: 3 },
      { icon: Database, size: 26, color: 'text-emerald-500/30', delay: 6 },
      { icon: Activity, size: 30, color: 'text-blue-500/30', delay: 1 },
      { icon: LayoutDashboard, size: 28, color: 'text-amber-500/30', delay: 4 },
      { icon: Server, size: 24, color: 'text-rose-500/30', delay: 8 },
      { icon: Code, size: 32, color: 'text-indigo-500/30', delay: 2 },
    ];

    // Clear any existing elements
    container.innerHTML = '';

    // Create and append floating elements
    elements.forEach((element, index) => {
      const { icon: Icon, size, color, delay } = element;
      
      // Create container for the element
      const el = document.createElement('div');
      el.className = `absolute opacity-0 transition-all duration-700 ease-in-out interactive-floating-element ${color}`;
      el.style.animationDelay = `${delay}s`;
      
      // Distribute elements more evenly throughout the page
      const x = Math.random() * 90 + 5; // 5-95% of width
      const y = Math.random() * 180 + 5; // 5-185% of height (to spread down the page)
      
      el.style.left = `${x}%`;
      el.style.top = `${y}%`;
      
      // Set size (increased for better visibility)
      el.style.width = `${size * 2}px`;
      el.style.height = `${size * 2}px`;
      
      // Add SVG icon using innerHTML
      el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide w-full h-full">${getSvgPath(Icon.displayName || '')}</svg>`;
      
      // Add animation class with delay
      setTimeout(() => {
        el.classList.add('opacity-100');
        el.classList.add('animate-float-' + ((index % 3) + 1));
      }, 100 + index * 200);
      
      // Append to container
      container.appendChild(el);
    });

    // Add interactive effect on mousemove with stronger effect
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      document.querySelectorAll('.interactive-floating-element').forEach((el) => {
        const rect = el.getBoundingClientRect();
        const elX = rect.left + rect.width / 2;
        const elY = rect.top + rect.height / 2;
        
        // Calculate distance from mouse to element center
        const distX = mouseX - elX;
        const distY = mouseY - elY;
        const distance = Math.sqrt(distX * distX + distY * distY);
        
        // Only affect elements within a certain radius (increased from 300px to 400px)
        if (distance < 400) {
          // Calculate repulsion strength (stronger when closer)
          const strength = 0.5 * (1 - distance / 400); // Increased strength multiplier
          const moveX = -distX * strength;
          const moveY = -distY * strength;
          
          // Apply repulsion with increased visibility
          (el as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px)`;
          (el as HTMLElement).style.transition = 'transform 1s cubic-bezier(0.34, 1.56, 0.64, 1)';
          (el as HTMLElement).style.opacity = '0.4'; // Increased opacity when interacting
        } else {
          // Reset position with a smoother transition
          (el as HTMLElement).style.transform = '';
          (el as HTMLElement).style.transition = 'transform 1.5s ease-out, opacity 1s ease-out';
          (el as HTMLElement).style.opacity = '0.3'; // Default opacity increased
        }
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Add mockup UI elements with increased visibility
    addMockupElements(container);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Add some subtle UI mockups in the background
  const addMockupElements = (container: HTMLDivElement) => {
    // Create a few subtle "dashboard" elements with better placement and more elements
    const mockups = [
      // Mini chart
      `<div class="absolute w-32 h-20 bg-white/10 backdrop-blur-sm rounded-lg p-2 opacity-25 border border-gray-200/20">
        <div class="h-12 flex items-end gap-1">
          <div class="w-1/6 bg-sky-400/50 rounded-t-sm h-3"></div>
          <div class="w-1/6 bg-sky-400/50 rounded-t-sm h-8"></div>
          <div class="w-1/6 bg-sky-400/50 rounded-t-sm h-5"></div>
          <div class="w-1/6 bg-sky-400/50 rounded-t-sm h-10"></div>
          <div class="w-1/6 bg-sky-400/50 rounded-t-sm h-6"></div>
          <div class="w-1/6 bg-sky-400/50 rounded-t-sm h-7"></div>
        </div>
        <div class="h-2 mt-1 bg-gray-200/20 rounded-sm"></div>
      </div>`,
      
      // Mini analytics card
      `<div class="absolute w-40 h-24 bg-white/10 backdrop-blur-sm rounded-lg p-2 opacity-25 border border-gray-200/20">
        <div class="h-3 w-12 bg-gray-200/40 rounded-sm mb-2"></div>
        <div class="text-xl font-bold text-sky-500/60">84%</div>
        <div class="w-full h-1.5 bg-gray-200/20 rounded-sm mt-2">
          <div class="w-[84%] h-full bg-sky-400/40 rounded-sm"></div>
        </div>
        <div class="flex justify-between mt-2">
          <div class="h-2 w-6 bg-gray-200/30 rounded-sm"></div>
          <div class="h-2 w-6 bg-gray-200/30 rounded-sm"></div>
        </div>
      </div>`,
      
      // Mini CRM card
      `<div class="absolute w-36 h-32 bg-white/10 backdrop-blur-sm rounded-lg p-2 opacity-25 border border-gray-200/20">
        <div class="flex justify-between mb-2">
          <div class="h-6 w-6 rounded-full bg-indigo-400/30"></div>
          <div class="h-2 w-10 bg-gray-200/40 rounded-sm"></div>
        </div>
        <div class="space-y-2">
          <div class="h-2 w-full bg-gray-200/40 rounded-sm"></div>
          <div class="h-2 w-20 bg-gray-200/40 rounded-sm"></div>
        </div>
        <div class="mt-3 flex flex-col space-y-1">
          <div class="flex items-center gap-1">
            <div class="w-2 h-2 rounded-full bg-green-400/50"></div>
            <div class="h-1.5 w-16 bg-gray-200/40 rounded-sm"></div>
          </div>
          <div class="flex items-center gap-1">
            <div class="w-2 h-2 rounded-full bg-amber-400/50"></div>
            <div class="h-1.5 w-10 bg-gray-200/40 rounded-sm"></div>
          </div>
        </div>
      </div>`,
      
      // Mini conversation bubble
      `<div class="absolute w-40 h-28 bg-white/10 backdrop-blur-sm rounded-lg p-2 opacity-25 border border-gray-200/20">
        <div class="h-3 w-12 bg-gray-200/40 rounded-sm mb-3"></div>
        <div class="flex gap-1 mb-2">
          <div class="h-4 w-4 rounded-full bg-purple-400/30"></div>
          <div class="h-2 w-20 bg-gray-200/40 rounded-sm"></div>
        </div>
        <div class="flex gap-1 mb-2 justify-end">
          <div class="h-2 w-16 bg-gray-200/40 rounded-sm"></div>
          <div class="h-4 w-4 rounded-full bg-sky-400/30"></div>
        </div>
        <div class="flex gap-1">
          <div class="h-4 w-4 rounded-full bg-purple-400/30"></div>
          <div class="h-2 w-14 bg-gray-200/40 rounded-sm"></div>
        </div>
      </div>`,
      
      // Pie chart mockup
      `<div class="absolute w-44 h-44 bg-white/10 backdrop-blur-sm rounded-lg p-2 opacity-25 border border-gray-200/20">
        <div class="flex justify-between mb-2">
          <div class="h-3 w-16 bg-gray-200/40 rounded-sm"></div>
          <div class="h-3 w-6 bg-gray-200/40 rounded-sm"></div>
        </div>
        <div class="relative w-32 h-32 mx-auto">
          <div class="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-400/50 border-r-teal-400/50 border-b-sky-400/50 border-l-amber-400/50"></div>
          <div class="absolute inset-4 rounded-full border-4 border-gray-200/20"></div>
        </div>
      </div>`,
      
      // Data table mockup
      `<div class="absolute w-48 h-36 bg-white/10 backdrop-blur-sm rounded-lg p-2 opacity-25 border border-gray-200/20">
        <div class="h-3 w-20 bg-gray-200/40 rounded-sm mb-3"></div>
        <div class="space-y-2">
          <div class="flex gap-2">
            <div class="h-2 w-8 bg-gray-200/50 rounded-sm"></div>
            <div class="h-2 w-12 bg-gray-200/50 rounded-sm"></div>
            <div class="h-2 w-10 bg-gray-200/50 rounded-sm"></div>
          </div>
          <div class="flex gap-2">
            <div class="h-2 w-8 bg-indigo-400/30 rounded-sm"></div>
            <div class="h-2 w-12 bg-indigo-400/30 rounded-sm"></div>
            <div class="h-2 w-10 bg-indigo-400/30 rounded-sm"></div>
          </div>
          <div class="flex gap-2">
            <div class="h-2 w-8 bg-gray-200/50 rounded-sm"></div>
            <div class="h-2 w-12 bg-gray-200/50 rounded-sm"></div>
            <div class="h-2 w-10 bg-gray-200/50 rounded-sm"></div>
          </div>
          <div class="flex gap-2">
            <div class="h-2 w-8 bg-indigo-400/30 rounded-sm"></div>
            <div class="h-2 w-12 bg-indigo-400/30 rounded-sm"></div>
            <div class="h-2 w-10 bg-indigo-400/30 rounded-sm"></div>
          </div>
        </div>
      </div>`,
      
      // Progress bars mockup
      `<div class="absolute w-40 h-28 bg-white/10 backdrop-blur-sm rounded-lg p-2 opacity-25 border border-gray-200/20">
        <div class="h-3 w-14 bg-gray-200/40 rounded-sm mb-3"></div>
        <div class="space-y-3">
          <div>
            <div class="flex justify-between mb-1">
              <div class="h-2 w-8 bg-gray-200/40 rounded-sm"></div>
              <div class="h-2 w-4 bg-gray-200/40 rounded-sm"></div>
            </div>
            <div class="w-full h-1.5 bg-gray-200/20 rounded-sm">
              <div class="w-[75%] h-full bg-teal-400/40 rounded-sm"></div>
            </div>
          </div>
          <div>
            <div class="flex justify-between mb-1">
              <div class="h-2 w-8 bg-gray-200/40 rounded-sm"></div>
              <div class="h-2 w-4 bg-gray-200/40 rounded-sm"></div>
            </div>
            <div class="w-full h-1.5 bg-gray-200/20 rounded-sm">
              <div class="w-[45%] h-full bg-sky-400/40 rounded-sm"></div>
            </div>
          </div>
          <div>
            <div class="flex justify-between mb-1">
              <div class="h-2 w-8 bg-gray-200/40 rounded-sm"></div>
              <div class="h-2 w-4 bg-gray-200/40 rounded-sm"></div>
            </div>
            <div class="w-full h-1.5 bg-gray-200/20 rounded-sm">
              <div class="w-[60%] h-full bg-purple-400/40 rounded-sm"></div>
            </div>
          </div>
        </div>
      </div>`,
      
      // Dashboard card
      `<div class="absolute w-48 h-32 bg-white/10 backdrop-blur-sm rounded-lg p-2 opacity-25 border border-gray-200/20">
        <div class="flex justify-between items-center mb-2">
          <div class="h-3 w-16 bg-gray-200/40 rounded-sm"></div>
          <div class="flex space-x-1">
            <div class="h-3 w-3 rounded-full bg-rose-400/30"></div>
            <div class="h-3 w-3 rounded-full bg-amber-400/30"></div>
            <div class="h-3 w-3 rounded-full bg-green-400/30"></div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div class="bg-white/5 rounded p-1">
            <div class="h-2 w-10 bg-gray-200/30 rounded-sm mb-1"></div>
            <div class="text-lg font-bold text-teal-500/70">28k</div>
          </div>
          <div class="bg-white/5 rounded p-1">
            <div class="h-2 w-10 bg-gray-200/30 rounded-sm mb-1"></div>
            <div class="text-lg font-bold text-indigo-500/70">14%</div>
          </div>
          <div class="bg-white/5 rounded p-1">
            <div class="h-2 w-10 bg-gray-200/30 rounded-sm mb-1"></div>
            <div class="text-lg font-bold text-amber-500/70">$32k</div>
          </div>
          <div class="bg-white/5 rounded p-1">
            <div class="h-2 w-10 bg-gray-200/30 rounded-sm mb-1"></div>
            <div class="text-lg font-bold text-purple-500/70">87%</div>
          </div>
        </div>
      </div>`,
      
      // Timeline mockup
      `<div class="absolute w-40 h-36 bg-white/10 backdrop-blur-sm rounded-lg p-2 opacity-25 border border-gray-200/20">
        <div class="h-3 w-14 bg-gray-200/40 rounded-sm mb-3"></div>
        <div class="space-y-3">
          <div class="flex gap-2">
            <div class="h-4 w-4 rounded-full bg-sky-400/50 flex-shrink-0"></div>
            <div>
              <div class="h-2 w-24 bg-gray-200/40 rounded-sm mb-1"></div>
              <div class="h-1.5 w-16 bg-gray-200/30 rounded-sm"></div>
            </div>
          </div>
          <div class="flex gap-2">
            <div class="h-4 w-4 rounded-full bg-purple-400/50 flex-shrink-0"></div>
            <div>
              <div class="h-2 w-20 bg-gray-200/40 rounded-sm mb-1"></div>
              <div class="h-1.5 w-24 bg-gray-200/30 rounded-sm"></div>
            </div>
          </div>
          <div class="flex gap-2">
            <div class="h-4 w-4 rounded-full bg-amber-400/50 flex-shrink-0"></div>
            <div>
              <div class="h-2 w-18 bg-gray-200/40 rounded-sm mb-1"></div>
              <div class="h-1.5 w-12 bg-gray-200/30 rounded-sm"></div>
            </div>
          </div>
        </div>
      </div>`,
      
      // AI Chat mockup
      `<div class="absolute w-44 h-36 bg-white/10 backdrop-blur-sm rounded-lg p-2 opacity-25 border border-gray-200/20">
        <div class="flex justify-between items-center mb-2">
          <div class="h-3 w-12 bg-gray-200/40 rounded-sm"></div>
          <div class="h-3 w-3 rounded-full bg-green-400/50"></div>
        </div>
        <div class="space-y-2">
          <div class="flex gap-1 mb-1">
            <div class="h-5 w-5 rounded-full bg-teal-400/30 flex-shrink-0"></div>
            <div class="bg-teal-400/10 rounded-lg p-1 text-[0.5rem] max-w-[70%]">
              <div class="h-1.5 w-16 bg-white/20 rounded-sm mb-1"></div>
              <div class="h-1.5 w-12 bg-white/20 rounded-sm"></div>
            </div>
          </div>
          <div class="flex gap-1 justify-end mb-1">
            <div class="bg-indigo-400/10 rounded-lg p-1 text-[0.5rem] max-w-[70%]">
              <div class="h-1.5 w-20 bg-white/20 rounded-sm"></div>
            </div>
            <div class="h-5 w-5 rounded-full bg-indigo-400/30 flex-shrink-0"></div>
          </div>
          <div class="flex gap-1">
            <div class="h-5 w-5 rounded-full bg-teal-400/30 flex-shrink-0"></div>
            <div class="bg-teal-400/10 rounded-lg p-1 text-[0.5rem] max-w-[70%]">
              <div class="h-1.5 w-24 bg-white/20 rounded-sm"></div>
            </div>
          </div>
        </div>
      </div>`,
    ];
    
    // Create more mockups and position them better throughout the page
    mockups.forEach((mockup, index) => {
      const wrapper = document.createElement('div');
      wrapper.className = `absolute opacity-0 transition-all duration-700 ease-in-out interactive-floating-element`;
      wrapper.innerHTML = mockup;
      
      // Strategic positioning - spread across the document with a focus on certain areas
      let x, y;
      
      // Special positioning for charts around the roadmap section (approximate position)
      if (index % 3 === 0) {
        // Position around the roadmap pie chart area
        x = Math.random() * 30 + 50; // 50-80% of width (right side)
        y = Math.random() * 30 + 125; // 125-155% of height (roadmap section)
      } else if (index % 3 === 1) {
        // Position behind hero text
        x = Math.random() * 30 + 10; // 10-40% of width (left side)
        y = Math.random() * 30 + 15; // 15-45% of height (hero section)
      } else {
        // Random positions elsewhere
        x = Math.random() * 80 + 10; // 10-90% of width
        y = Math.random() * 180 + 10; // 10-190% of height
      }
      
      wrapper.style.left = `${x}%`;
      wrapper.style.top = `${y}%`;
      
      // Add animation class with delay
      setTimeout(() => {
        wrapper.classList.add('opacity-100');
        wrapper.classList.add('animate-float-' + ((index % 3) + 1));
      }, 300 + index * 300);
      
      // Append to container
      container.appendChild(wrapper);
    });
  };

  // Helper function to get SVG paths for icons
  const getSvgPath = (iconName: string): string => {
    switch(iconName) {
      case 'BarChart3':
        return '<line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line>';
      case 'Database':
        return '<ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>';
      case 'Globe':
        return '<circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>';
      case 'Activity':
        return '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>';
      case 'Users':
        return '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>';
      case 'PieChart':
        return '<path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path>';
      case 'LayoutDashboard':
        return '<rect width="7" height="9" x="3" y="3" rx="1"></rect><rect width="7" height="5" x="14" y="3" rx="1"></rect><rect width="7" height="9" x="14" y="12" rx="1"></rect><rect width="7" height="5" x="3" y="16" rx="1"></rect>';
      case 'Network':
        return '<circle cx="12" cy="9" r="6"></circle><circle cx="4" cy="20" r="2"></circle><circle cx="12" cy="20" r="2"></circle><circle cx="20" cy="20" r="2"></circle><line x1="12" y1="15" x2="12" y2="18"></line><line x1="8" y1="9" x2="4" y2="20"></line><line x1="16" y1="9" x2="20" y2="20"></line>';
      case 'Server':
        return '<rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line>';
      case 'Code':
        return '<polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline>';
      default:
        return '<circle cx="12" cy="12" r="10"></circle>';
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]"
      aria-hidden="true"
    ></div>
  );
};

export default FloatingElements;
