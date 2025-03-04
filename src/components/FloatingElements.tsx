
import { useEffect, useRef } from 'react';
import { BarChart3, Database, Globe, Activity, Users } from 'lucide-react';

const FloatingElements = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Define elements that will float
    const elements = [
      { icon: BarChart3, size: 24, color: 'text-sky-500/10', delay: 0 },
      { icon: Database, size: 20, color: 'text-teal-500/10', delay: 5 },
      { icon: Globe, size: 28, color: 'text-indigo-500/10', delay: 2 },
      { icon: Activity, size: 22, color: 'text-amber-500/10', delay: 7 },
      { icon: Users, size: 26, color: 'text-purple-500/10', delay: 3 },
      { icon: BarChart3, size: 30, color: 'text-pink-500/10', delay: 6 },
      { icon: Database, size: 18, color: 'text-blue-500/10', delay: 9 },
      { icon: Globe, size: 32, color: 'text-emerald-500/10', delay: 4 },
      { icon: Activity, size: 28, color: 'text-orange-500/10', delay: 1 },
      { icon: Users, size: 22, color: 'text-cyan-500/10', delay: 8 },
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
      
      // Random positioning
      const x = Math.random() * 90 + 5; // 5-95% of width
      const y = Math.random() * 90 + 5; // 5-95% of height
      
      el.style.left = `${x}%`;
      el.style.top = `${y}%`;
      
      // Set size
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

    // Add interactive effect on mousemove
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
        
        // Only affect elements within a certain radius (300px)
        if (distance < 300) {
          // Calculate repulsion strength (stronger when closer)
          const strength = 0.2 * (1 - distance / 300);
          const moveX = -distX * strength;
          const moveY = -distY * strength;
          
          // Apply repulsion
          (el as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px)`;
          (el as HTMLElement).style.transition = 'transform 1s cubic-bezier(0.34, 1.56, 0.64, 1)';
        } else {
          // Reset position with a smoother transition
          (el as HTMLElement).style.transform = '';
          (el as HTMLElement).style.transition = 'transform 1.5s ease-out';
        }
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Add mockup UI elements
    addMockupElements(container);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Add some subtle UI mockups in the background
  const addMockupElements = (container: HTMLDivElement) => {
    // Create a few subtle "dashboard" elements
    const mockups = [
      // Mini chart
      `<div class="absolute w-32 h-20 bg-white/5 backdrop-blur-sm rounded-lg p-2 opacity-10 border border-gray-200/20">
        <div class="h-12 flex items-end gap-1">
          <div class="w-1/6 bg-sky-400/30 rounded-t-sm h-3"></div>
          <div class="w-1/6 bg-sky-400/30 rounded-t-sm h-8"></div>
          <div class="w-1/6 bg-sky-400/30 rounded-t-sm h-5"></div>
          <div class="w-1/6 bg-sky-400/30 rounded-t-sm h-10"></div>
          <div class="w-1/6 bg-sky-400/30 rounded-t-sm h-6"></div>
          <div class="w-1/6 bg-sky-400/30 rounded-t-sm h-7"></div>
        </div>
        <div class="h-2 mt-1 bg-gray-200/20 rounded-sm"></div>
      </div>`,
      
      // Mini analytics card
      `<div class="absolute w-40 h-24 bg-white/5 backdrop-blur-sm rounded-lg p-2 opacity-10 border border-gray-200/20">
        <div class="h-3 w-12 bg-gray-200/30 rounded-sm mb-2"></div>
        <div class="text-xl font-bold text-sky-500/50">84%</div>
        <div class="w-full h-1.5 bg-gray-200/20 rounded-sm mt-2">
          <div class="w-[84%] h-full bg-sky-400/30 rounded-sm"></div>
        </div>
        <div class="flex justify-between mt-2">
          <div class="h-2 w-6 bg-gray-200/30 rounded-sm"></div>
          <div class="h-2 w-6 bg-gray-200/30 rounded-sm"></div>
        </div>
      </div>`,
      
      // Mini CRM card
      `<div class="absolute w-36 h-32 bg-white/5 backdrop-blur-sm rounded-lg p-2 opacity-10 border border-gray-200/20">
        <div class="flex justify-between mb-2">
          <div class="h-6 w-6 rounded-full bg-indigo-400/20"></div>
          <div class="h-2 w-10 bg-gray-200/30 rounded-sm"></div>
        </div>
        <div class="space-y-2">
          <div class="h-2 w-full bg-gray-200/30 rounded-sm"></div>
          <div class="h-2 w-20 bg-gray-200/30 rounded-sm"></div>
        </div>
        <div class="mt-3 flex flex-col space-y-1">
          <div class="flex items-center gap-1">
            <div class="w-2 h-2 rounded-full bg-green-400/30"></div>
            <div class="h-1.5 w-16 bg-gray-200/30 rounded-sm"></div>
          </div>
          <div class="flex items-center gap-1">
            <div class="w-2 h-2 rounded-full bg-amber-400/30"></div>
            <div class="h-1.5 w-10 bg-gray-200/30 rounded-sm"></div>
          </div>
        </div>
      </div>`,
      
      // Mini conversation bubble
      `<div class="absolute w-40 h-28 bg-white/5 backdrop-blur-sm rounded-lg p-2 opacity-10 border border-gray-200/20">
        <div class="h-3 w-12 bg-gray-200/30 rounded-sm mb-3"></div>
        <div class="flex gap-1 mb-2">
          <div class="h-4 w-4 rounded-full bg-purple-400/20"></div>
          <div class="h-2 w-20 bg-gray-200/30 rounded-sm"></div>
        </div>
        <div class="flex gap-1 mb-2 justify-end">
          <div class="h-2 w-16 bg-gray-200/30 rounded-sm"></div>
          <div class="h-4 w-4 rounded-full bg-sky-400/20"></div>
        </div>
        <div class="flex gap-1">
          <div class="h-4 w-4 rounded-full bg-purple-400/20"></div>
          <div class="h-2 w-14 bg-gray-200/30 rounded-sm"></div>
        </div>
      </div>`,
    ];
    
    mockups.forEach((mockup, index) => {
      const wrapper = document.createElement('div');
      wrapper.className = `absolute opacity-0 transition-all duration-700 ease-in-out interactive-floating-element`;
      wrapper.innerHTML = mockup;
      
      // Random positioning - spread across the document
      const x = Math.random() * 80 + 10; // 10-90% of width
      const y = Math.random() * 80 + 10; // 10-90% of height
      
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
      default:
        return '<circle cx="12" cy="12" r="10"></circle>';
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none overflow-hidden z-[-5]"
      aria-hidden="true"
    ></div>
  );
};

export default FloatingElements;
